import { Receita } from './../../viewmodel/receita/receita';
import { Categoria } from './../../viewmodel/receita/categoria';
import { IngredienteService } from './../services/ingrediente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from 'clarity-angular';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CategoriaService } from 'menu-receita/services/categoria.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css'],
    providers: [IngredienteService,
        CategoriaService,
        IngredienteService]
})

export class PublicarReceitaComponent implements OnInit {

    protected searchStr: string;
    protected dataService: CompleterData;

    private modalEtapa = false;
    private modalPasso = false;

    private categorias: Categoria[];

    private receita: Receita;


    constructor(
        private completerService: CompleterService,
        private ingredientesService: IngredienteService,
        private categoriaService: CategoriaService) { }

    ngOnInit() {
        this.receita = new Receita();
        this.carregarCampos()
    }

    protected carregarCampos() {
        this.getAllIngredientes();
        this.getCategorias();
    }

    public getAllIngredientes() {
        this.ingredientesService.list()
    }

    public getCategorias() {
        if (!this.categorias) {
            this.categoriaService.list()
                .then(data => {
                    this.categorias = data;
                }, error => {
                })
        }

    }

}
