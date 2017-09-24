import { IngredienteReceita } from './../../viewmodel/receita/ingredienteReceita';
import { Receita } from './../../viewmodel/receita/receita';
import { Categoria } from './../../viewmodel/receita/categoria';
import { IngredienteService } from './../services/ingrediente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from 'clarity-angular';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CategoriaService } from 'menu-receita/services/categoria.service';
import { MedidaService } from 'menu-receita/services/medida.service';
import { Medida } from 'viewmodel/receita/medida';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css'],
    providers: [IngredienteService,
        CategoriaService,
        IngredienteService,
        MedidaService]
})


export class PublicarReceitaComponent implements OnInit {

    protected searchStr: string;
    protected dataService: CompleterData;

    private modalEtapa = false;
    private modalPasso = false;

    private categorias: Categoria[];
    private medidas: Medida[];

    private receita: Receita;

    private ingredienteCad: IngredienteReceita;


    constructor(
        private completerService: CompleterService,
        private ingredientesService: IngredienteService,
        private categoriaService: CategoriaService,
        private medidaService: MedidaService) { }

    ngOnInit() {
        this.receita = new Receita();
        this.ingredienteCad = new IngredienteReceita();
        this.carregarCampos()
    }

    private adicionarIngrediente() {
        this.receita.ingts.push(this.ingredienteCad)
        this.ingredienteCad = new IngredienteReceita();
    }

    private limparIngrediente() {
        this.ingredienteCad = new IngredienteReceita();
    }

    protected carregarCampos() {
        this.getIngredientes();
        this.getCategorias();
        this.getMedidas();
    }

    public getIngredientes() {
        this.ingredientesService.list()
            .then(data => {
                console.log('list')
                this.dataService = this.completerService.local(data, 'nome', 'nome')
            }, error => {

            });
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

    public getMedidas() {
        if (!this.categorias) {
            this.medidaService.list()
                .then(data => {
                    this.medidas = data;
                }, error => {
                })
        }
    }

}
