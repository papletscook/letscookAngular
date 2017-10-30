import { CategoriaComponent } from 'app/template/index-page/categoria/categoria.component';
import { ComponentInfo } from './../../viewmodel/template/componentInfo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Categoria } from 'app/viewmodel/template/receita/categoria';
import { ReceitaService } from 'app/template/menu-receita/receita.service';
import { CategoriaService } from 'app/template/categoria/categoria.service';
import { AlertService } from 'app/service/alert.service';
import { SessionService } from 'app/service/session.service';
import { HolderService } from 'app/service/holder.service';
import * as _ from "lodash";


@Component({
    selector: 'index-page-component',
    templateUrl: 'index-page.component.html',
    styleUrls: ['index-page.component.css'],
    providers: [AlertService, SessionService, HolderService, ReceitaService, CategoriaService]

})

export class IndexPageComponent implements OnInit {
    private receitas: Receita[];
    private categorias: Categoria[];
    private loading: boolean = false;


    @ViewChild(CategoriaComponent)
    private categoriarComp: CategoriaComponent;

    constructor(
        private service: ReceitaService,
        private catServ: CategoriaService,
        private alert: AlertService,
        private holder: HolderService,
        private receitaService: ReceitaService
    ) { }

    public ngOnInit() {
        this.carregarReceitas();
        if (!this.categorias) {
            this.listarCategorias();
        }
    }

    private listarCategorias() {
        this.catServ.list().then(data => {
            this.categorias = _.orderBy(data, ['nome'], ['asc']);
        }, error => {
            this.alert.error("Falha consultar!")
        });
    }

    private carregarReceitas() {
        this.receitaService.buscarBemAvaliadas()
            .then(data => {
                this.receitas = data;
                this.loading = false;
            }, error => {
                this.alert.error("Ocorreu um erro ao carregar receitas!");
            });
    }
}