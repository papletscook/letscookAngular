import { MockReceita } from './../mock/mockReceita';
import { HolderService } from './../../util/holder/holder.service';
import { Alert } from './../../util/alert';
import { ReceitaService } from './../services/receita.service';
import { element } from 'protractor';
import { Passo } from './../../viewmodel/receita/passo';
import { Etapa } from './../../viewmodel/receita/etapa';
import { Ingrediente } from './../../viewmodel/receita/ingrediente';
import { IngredienteReceita } from './../../viewmodel/receita/ingredienteReceita';
import { Receita } from './../../viewmodel/receita/receita';
import { Categoria } from './../../viewmodel/receita/categoria';
import { IngredienteService } from './../services/ingrediente.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Wizard } from 'clarity-angular';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CategoriaService } from 'menu-receita/services/categoria.service';
import { MedidaService } from 'menu-receita/services/medida.service';
import { Medida } from 'viewmodel/receita/medida';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'preparar-receita',
    templateUrl: 'preparar-receita.html',
    styleUrls: ['preparar-receita.css'],
    providers: [IngredienteService,
        CategoriaService,
        IngredienteService,
        MedidaService,
        ReceitaService,
        HolderService]
})


export class PrepararReceitaComponent implements OnInit {

    private receita: Receita;

    constructor(
        private holderService: HolderService,
        private receitaService: ReceitaService,
        private completerService: CompleterService,
        private ingredientesService: IngredienteService,
        private categoriaService: CategoriaService,
        private medidaService: MedidaService) { }

    ngOnInit() {
        this.receita = new Receita();
        const r = MockReceita;
        this.receita = r;
    }


}
