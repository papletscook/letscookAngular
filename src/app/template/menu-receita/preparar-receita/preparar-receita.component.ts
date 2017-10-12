import { Etapa } from './../../../viewmodel/template/receita/etapa';
import { Passo } from './../../../viewmodel/template/receita/passo';
import { IngredientePreparo } from './../../../viewmodel/template/receita/ingrediente-preparo';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { CompleterService } from 'ng2-completer';
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



@Component({
    selector: 'preparar-receita-component',
    templateUrl: 'preparar-receita.component.html',
    styleUrls: ['preparar-receita.component.css'],
    providers: [
        ReceitaService, IngredienteService, CategoriaService, MedidaService]
})


export class PrepararReceitaComponent implements OnInit {



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
        private alert: AlertService
    ) {
    }

    ngOnInit(): void {
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
                this.validationStepTwo[this.receita.etapas.indexOf(etapa)] = true;
                this.receita.etapas[this.receita.etapas.indexOf(etapa) + 1].passos[0].checked = true;
            } catch (error) {

            }
        } finally {
            passo.checked = false;
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
