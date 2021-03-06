import { Categoria } from './../../viewmodel/template/receita/categoria';
import { Router } from '@angular/router';
import { HolderService } from './../../service/holder.service';
import { IngredienteService } from './../ingrediente/ingrediente.service';
import { DespensaService } from './despensa.service';
import { ScoreReceita } from 'app/viewmodel/template/despensa/score-receita';
import { AlertService } from './../../service/alert.service';
import { element } from 'protractor';
import { Despensa } from './../../viewmodel/template/despensa/despensa';
import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import * as _ from "lodash";


@Component({
    selector: 'despensa-component',
    templateUrl: 'despensa.component.html',
    styleUrls: ['despensa.component.css'],
    providers: [DespensaService, IngredienteService, AlertService]
})

export class DespensaComponent implements OnInit {

    private avaliacaoFilter: string;

    private minsPreparoFilter: number;

    private categoriaFilter: Categoria;

    private categoriaExist: Categoria[] = [];


    private scores: ScoreReceita[];
    private ingredientes: Ingrediente[];
    private despensa: Despensa;
    private loading: boolean = true;
    private loadingBusca: boolean = false;
    private myFilterValue: string = "";


    protected searchStr: string;
    protected dataService: any;

    private modalAdd: boolean = false;

    private ingredienteAdd: any;

    constructor(
        private despensaService: DespensaService,
        private holderService: HolderService,
        private completerService: CompleterService,
        private ingredienteService: IngredienteService,
        private alert: AlertService,
        private router: Router
    ) { }

    public ngOnInit() {
        if (!this.holderService.userLogado) {
            this.router.navigate(['/']);
        }
        this.load();
    }

    public load() {
        this.buscarPorUsuario();
        this.buscarIngredientes();
    }


    public buscarIngredientes() {
        this.ingredienteService.list().then(data => {
            this.ingredientes = _.orderBy(data, ['nome'], ['asc']);;
            this.dataService = this.completerService.local(data, 'nome', 'nome');
        }, error => {
            this.loading = false;
        });
    }

    autocompleListFormatter = (data: any) => {
        return data.nome;
    }

    public adicionarIngrediente() {
        console.log('adicionarIngrediente')
        this.modalAdd = false;
        this.ingredientes.forEach(element => {
            if (element.nome == this.searchStr) {
                if (!this.existeIngredienteDespensa(element)) {
                    this.despensa.ings.push({ ingrediente: element })
                    this.atualizarDespensa();
                    this.buscarReceitasCompatives();
                    this.searchStr = null;
                }
            }
        });
    }

    public abrirModalAddIngrediente() {
        this.modalAdd = true;
    }

    public limparDespensa() {
        this.despensa.ings = [];
        this.atualizarDespensa();
        this.scores = [];
    }

    protected existeIngredienteDespensa(param: any): boolean {
        for (let element of this.despensa.ings) {
            if (element.ingrediente.id == param.id) {
                return true;
            }
        }
        return false;
    }

    public buscarReceitasCompatives() {
        let ingredientes: Ingrediente[] = [];
        for (let ing of this.despensa.ings) {
            ingredientes.push(ing.ingrediente)
        }
        this.despensaService.buscarPorIngredientes(ingredientes).then(data => {
            this.scores = _.orderBy(data, ['compt'], ['desc']);
            this.qualcategoriaexiste();            
            this.loading = false;
        }, error => {
            this.alert.error("Falha ao buscar Despensa!")
        });
    }


    public buscarPorUsuario() {
        this.despensaService.buscarPorUsuario()
            .then(data => {
                this.despensa = data;
                this.buscarReceitasCompatives()
            }, error => {
                this.alert.error("Falha ao buscar Despensa!")
            });
    }

    public removeItemDespensa(ings: any) {
        const index: number = this.despensa.ings.indexOf(ings);
        if (index !== -1) {
            this.despensa.ings.splice(index, 1);
        }
        this.atualizarDespensa();
        this.buscarReceitasCompatives();
    }

    public atualizarDespensa() {
        this.despensaService.atualizarDespensa(this.despensa)
            .then(data => {
                this.despensa = data;
            }, error => {
                this.alert.error("Falha ao atualizar Despensa!")
            });
    }


    private qualcategoriaexiste() {
        try {
            this.categoriaExist = [];
            let cat: Categoria[] = [];
            for (let element of this.scores) {
                if (!this.contains(element.receita.categoria, cat)) {
                    cat.push(element.receita.categoria);
                }
            }

            this.categoriaExist = cat;
            this.categoriaExist.sort(function (a, b) {
                return a.nome.localeCompare(b.nome);
            });
        } catch (error) {
            console.log(error)
        }
    }



    public contains(cat: Categoria, lst: Categoria[]): boolean {
        for (let element of lst) {
            if (cat.nome === element.nome) {
                return true;
            }
        }
        return false;
    }

    private limparFiltro() {
        this.categoriaFilter = null
        this.avaliacaoFilter = null;
        this.minsPreparoFilter = null;
        this.load()
    }

    private filtraPorCategoria(categoria: Categoria) {
        this.categoriaFilter = categoria;
    }

}