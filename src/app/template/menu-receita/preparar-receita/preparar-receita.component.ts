import { countdownData, countdownOptions } from 'ng2-countdown/index';
import { Etapa } from './../../../viewmodel/template/receita/etapa';
import { Passo } from './../../../viewmodel/template/receita/passo';
import { IngredientePreparo } from './../../../viewmodel/template/receita/ingrediente-preparo';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { IngredienteService } from 'app/service/ingrediente.service';
import { Component, OnInit, Input, ViewChild, AfterContentChecked, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from 'app/service/categoria.service';
import { MedidaService } from 'app/service/medida.service';
import { ReceitaService } from 'app/service/receita.service';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Medida } from 'app/viewmodel/template/receita/medida';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { IngredienteReceita } from 'app/viewmodel/template/receita/ingredienteReceita';
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
        MedidaService
    ]
})


export class PrepararReceitaComponent implements OnInit {


    private cronometro: any;

    private timer: any = null;

    private segundos: number;

    @Input()
    private receita: Receita;

    @Input()
    private medidas: Medida[];

    @ViewChild('wizard')
    wizard: Wizard;

    @Input()
    open = false;

    validationStepTwo: boolean[] = [false, false]

    constructor(
        private alert: AlertService) { }

    ngOnInit(): void {
        this.wizard.reset();
    }

    playCrono(mins: number) {
        if (this.timer) {
            this.timer = false;
        } else {
            this.iniciarCrono(mins);
        }

    }


    iniciarCrono(mins: number) {
        this.timer = Observable.timer(2000, 1000);
        this.segundos = mins * 60;
        this.timer.subscribe(t => this.cronoFunc());
    }

    cronoFunc() {
        console.log(this.segundos)
        this.segundos -= 1;
        console.log(this.segundos)
        this.cronometro = this.secondsToHms(this.segundos)
        console.log(this.cronometro)
    }


    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
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
    }



    proximoPasso(passo: Passo, etapa: Etapa) {
        try {
            etapa.passos[etapa.passos.indexOf(passo) + 1].checked = true;
        } catch (error) {
            try {
                this.wizard.next();
                etapa.done = true;
                this.validationStepTwo[this.receita.etapas.indexOf(etapa)] = true;
                this.receita.etapas[this.receita.etapas.indexOf(etapa) + 1].passos[0].checked = true;
            } catch (error) {

            }
        } finally {
            if (passo.minPasso) {
                this.playCrono(passo.minPasso)
            }
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
