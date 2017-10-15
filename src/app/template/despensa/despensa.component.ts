import { AlertService } from './../../service/alert.service';
import { element } from 'protractor';
import { IngredienteService } from 'app/service/ingrediente.service';
import { Despensa } from './../../viewmodel/template/despensa/despensa';
import { DespensaService } from './../../service/despensa.service';
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
    private ingredientes: Ingrediente[];
    private despensa: Despensa;
    private loading: boolean = true;

    protected searchStr: string;
    protected dataService: any;
    protected searchData = [
        { color: 'red', value: '#f00' },
        { color: 'green', value: '#0f0' },
        { color: 'blue', value: '#00f' },
        { color: 'cyan', value: '#0ff' },
        { color: 'magenta', value: '#f0f' },
        { color: 'yellow', value: '#ff0' },
        { color: 'black', value: '#000' }
    ];

    private ingredienteAdd: any;

    constructor(
        private despensaService: DespensaService,
        private completerService: CompleterService,
        private ingredienteService: IngredienteService,
        private alert: AlertService
    ) {
        this.ingredienteService.list().then(data => {
            this.ingredientes = data;
            this.dataService = completerService.local(data, 'nome', 'nome');
            this.loading = false;
        })
    }

    public ngOnInit() {
        this.buscarPorUsuario();
    }

    public adicionarIngrediente() {
        console.log('adicionarIngrediente')
        this.ingredientes.forEach(element => {
            if (element.nome == this.searchStr) {
                this.despensa.ings.push({ ingrediente: element })
                this.atualizarDespensa();
            }
        });
    }

    protected existeIngrediente(param: any, array: Array<any>): boolean {
        for (let element of array) {
            if (element.id == param.id) {
                return true;
            }
        }
        return false;
    }

    public buscarPorUsuario() {
        this.despensaService.buscarPorUsuario()
            .then(data => {
                this.despensa = data;
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