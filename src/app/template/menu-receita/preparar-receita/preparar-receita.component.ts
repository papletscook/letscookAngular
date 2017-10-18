import { IngredienteService } from './../../ingrediente/cadastrar-ingrediente/ingrediente.service';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoReceita } from './../../../viewmodel/template/receita/avaliacao';
import { element } from 'protractor';
import { Etapa } from './../../../viewmodel/template/receita/etapa';
import { Passo } from './../../../viewmodel/template/receita/passo';
import { IngredientePreparo } from './../../../viewmodel/template/receita/ingrediente-preparo';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { Component, OnInit, Input, ViewChild, AfterContentChecked, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from 'app/service/categoria.service';
import { MedidaService } from 'app/service/medida.service';
import { ReceitaService } from 'app/service/receita.service';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Medida } from 'app/viewmodel/template/receita/medida';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { IngredienteReceita } from 'app/viewmodel/template/receita/ingrediente-receita';
import { Categoria } from 'app/viewmodel/template/receita/categoria';
import { Wizard } from 'clarity-angular';
import { SessionService } from 'app/service/session.service';
import { AlertService } from 'app/service/alert.service';
import * as _ from "lodash";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'preparar-receita-component',
    templateUrl: 'preparar-receita.component.html',
    styleUrls: ['preparar-receita.component.css'],
    providers: [
        ReceitaService,
        IngredienteService,
        CategoriaService,
        MedidaService,
        AvaliacaoService
    ]
})


export class PrepararReceitaComponent implements OnInit {


    private cronometro: any;

    private passoCrono: Passo;

    private timer: any = null;

    private segundos: number;

    @Input()
    private receita: Receita;

    @Input()
    private medidas: Medida[];

    @ViewChild('wizard')
    wizard: Wizard;

    @Input()
    open;

    validationStepTwo: boolean[] = [];

    private inicioPreparo: Date;
    private fimPreparo: Date;

    private duracao: any;

    private avaliacao: AvaliacaoReceita = new AvaliacaoReceita();

    constructor(
        private alert: AlertService,
        private session: SessionService,
        private avaliacaoService: AvaliacaoService) { }

    ngOnInit(): void {
        Notification.requestPermission();
    }

    doCancel(): void {
        console.log('doCancel')
        this.wizard.close();
    }

    isDonoReceita(): boolean {
        return this.receita.criador.email == this.session.consultarUsuario().email
    }

    iniciarPreparo() {
        if (this.validationStepOne()) {
            this.reiniciarReceita();
            this.avaliacao.receita = this.receita;
            this.receita.etapas[0].passos[0].checked = true;
            this.wizard.next()
            this.inicioPreparo = new Date();
        }

    }

    finalizarPreparo() {
        console.log('finalizarPreparo')
        this.fimPreparo = new Date();
        this.duracao = this.secondsToHms(Math.abs(((this.inicioPreparo.getTime() - this.fimPreparo.getTime()) / 1000)))
    }

    playCrono(passo: Passo) {
        this.passoCrono = passo;
        this.definirCrono(passo)
        this.iniciarTimer()
    }

    pauseCrono() {
        this.timer.unsubscribe();
        this.timer = null;
    }


    definirCrono(passo: Passo): void {
        let sgs = this.passoCrono.minPasso * 60;
        this.segundos = sgs;
        this.iniciarTimer()
    }

    iniciarTimer() {
        if (!this.timer) {
            this.timer = Observable.interval(1000).subscribe(res => {
                this.cronoFunc()
            });
        }

    }

    cronoFunc() {
        this.segundos -= 1;
        this.cronometro = this.secondsToHms(this.segundos)
    }

    avaliar() {
        this.avaliacaoService.cadastrar(this.avaliacao)
            .then(data => {
                this.avaliacao = data;
            }, error => {
                this.alert.error("Falha ao avaliar Receita!")
            })
    }

    concluirCase() {
        console.log("concluirCase")
        this.avaliar()
        this.wizard.reset();
        this.cancelar();
    }


    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }

    minToSec(min: number) {
        return min * 60;
    }


    handleChange(index: number) {
        this.receita.ingts[index].checked = !this.receita.ingts[index].checked;
    }


    validationStepOne(): boolean {
        let ings = this.receita.ingts;
        if (!ings) {
            return false;
        }
        for (let ing of ings) {
            if (!ing.checked) {
                return false;
            }
        }
        return true;
    }

    reiniciarReceita() {
        this.validationStepTwo.forEach(element => {
            element = false;
        });
        let etapas = this.receita.etapas;
        etapas.forEach(element => {
            element.checked = false;
            element.done = false;
            element.passos.forEach(element => {
                element.checked = false;
                element.done = false;
            });
        });
    }


    selecionarTodos() {
        let ings = this.receita.ingts;
        for (let ing of ings) {
            ing.checked = true;
        }
    }

    removerTodos() {
        let ings = this.receita.ingts;
        for (let ing of ings) {
            ing.checked = false;
        }
    }


    cancelar() {
        this.open = false;
        this.wizard.reset();
    }

    processarPasso(passo: Passo) {
        passo.done = false;
        passo.checked = true;
        if (passo.minPasso) {
            this.playCrono(passo)
        }
    }

    anteriorPasso(passo: Passo, etapa: Etapa) {
        try {
            this.processarPasso(etapa.passos[etapa.passos.indexOf(passo) - 1])
        } catch (error) {
            try {
                this.wizard.previous();
                etapa.done = true;
                this.validationStepTwo[this.receita.etapas.indexOf(etapa)] = true;
                let futuroPasso = this.receita.etapas[this.receita.etapas.indexOf(etapa) - 1].passos[0];
                this.processarPasso(futuroPasso)
            } catch (error) {

            }
        } finally {
            passo.checked = false;
            passo.done = false;
        }
    }


    proximoPasso(passo: Passo, etapa: Etapa) {
        try {
            this.processarPasso(etapa.passos[etapa.passos.indexOf(passo) + 1])
        } catch (error) {
            try {
                this.wizard.next();
                etapa.done = true;
                this.validationStepTwo[this.receita.etapas.indexOf(etapa)] = true;
                try {
                    let futuroPasso = this.receita.etapas[this.receita.etapas.indexOf(etapa) + 1].passos[0];
                    this.processarPasso(futuroPasso)
                } catch (error) {
                    this.finalizarPreparo();
                }
            } catch (error) {
            }
        } finally {
            passo.checked = false;
            passo.done = true;
        }
    }


    private detailMedida(medida: string): Medida {
        for (let med of this.medidas) {
            if (med.name == medida) {
                return med;
            }
        }
        return null;
    }

}
