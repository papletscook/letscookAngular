import { Receita } from 'app/viewmodel/template/receita/receita';
import { PublicarReceitaComponent } from 'app/template/menu-receita/publicar-receita/publicar-receita.component';
import { DespensaComponent } from './despensa/despensa.component';
import { TemplateService } from './template.service';
import { SessionService } from './../service/session.service';

import { PainelDeControleComponent } from './painel-de-controle/painel-de-controle.component';
import { ComponentInfo } from 'app/viewmodel/template/componentInfo'; 1
import { Router } from '@angular/router';
import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';
import { Vizitante, Cozinheiro } from 'app/template/subnav/subnavsMock';
import { IndexPageComponent } from 'app/template/index-page/index-page.component';
import { AlertService } from 'app/service/alert.service';
import { CategoriaService } from 'app/template/categoria/categoria.service';
import * as _ from "lodash";

@Component({
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    selector: 'template-component',
    providers: [TemplateService, AlertService, SessionService, HolderService, CategoriaService]
})

export class TemplateComponent implements OnInit {

    categorias: any;

    public useCase: any;

    public menus: MenuSubnav[];

    private subNavAtivo: boolean = false;

    @ViewChild('publicar', undefined)
    private publicar: PublicarReceitaComponent;

    private activePublicar: boolean;

    private receita : Receita = new Receita()


    constructor(private router: Router,
        public holderService: HolderService,
        private templateService: TemplateService,
        private session: SessionService,
        public alert: AlertService,
        private catServ: CategoriaService,
    ) { }

    public ngOnInit(): void {
        if (!this.categorias) {
            this.listarCategorias()
        }
    }

    private listarCategorias() {
        this.catServ.list().then(data => {
            this.categorias = _.orderBy(data, ['nome'], ['asc']);
        }, error => {
            this.alert.error("Falha consultar Categorias!")
        });
    }

    public entrar() {
        this.holderService.modalIsCloseable = true;
        this.holderService.modalOpen = true;
    }

    public sair() {
        this.session.deslogar();
        this.holderService.userLogado = false;
        window.location.reload();

    }

    public changeCase(component: any): void {
        this.templateService.createComp(component);
        this.holderService.qualMenuEstaAtivo = component;
    }

    public subNavChangeCase(menu: MenuSubnav): void {
        this.changeCase(menu.component)
    }

    public adminNav(b: boolean): void {
        if (!b) {
            this.subNavAtivo = false
            this.menus = null;
        } else {
            this.subNavAtivo = true;
            this.menus = Cozinheiro;
        }
    }

    private abrirComponentesGenericoDaIndex(component: string) {
        switch (component) {
            case "DespensaComponent":
                this.adminNav(true);
                this.changeCase(DespensaComponent);
                break;
            case "PainelDeControleComponent":
                this.holderService.sideNav = false
                this.adminNav(true);
                this.changeCase(PainelDeControleComponent);
                break;
            case "IndexPageComponent":
                this.adminNav(false);
                this.changeCase(IndexPageComponent);
                break;
        }
    }

}