import { DespensaService } from './despensa.service';
import { ScoreReceita } from 'app/viewmodel/template/despensa/score-receita';
import { AlertService } from './../../service/alert.service';
import { element } from 'protractor';
import { IngredienteService } from 'app/service/ingrediente.service';
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
    private scores: ScoreReceita[];
    private ingredientes: Ingrediente[];
    private despensa: Despensa;
    private loading: boolean = true;
    private loadingBusca: boolean = false;

    protected searchStr: string;
    protected dataService: any;

    private modalAdd: boolean = false;

    private ingredienteAdd: any;

    constructor(
        private despensaService: DespensaService,
        private completerService: CompleterService,
        private ingredienteService: IngredienteService,
        private alert: AlertService
    ) {

    }

    public buscarIngredientes() {
        this.ingredienteService.list().then(data => {
            this.ingredientes = data;
            this.dataService = this.completerService.local(data, 'nome', 'nome');
        }, error => {
            this.loading = false;
        });
    }

    public ngOnInit() {
        this.buscarPorUsuario();
        this.buscarIngredientes();
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
            this.scores = _.orderBy(data, ['score'], ['desc']);
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
    }

    public atualizarDespensa() {
        this.despensaService.atualizarDespensa(this.despensa)
            .then(data => {
                this.despensa = data;
            }, error => {
                this.alert.error("Falha ao atualizar Despensa!")
            });
    }

}