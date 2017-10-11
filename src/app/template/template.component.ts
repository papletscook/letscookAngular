import { LoginService } from './../service/login.service';
import { SessionService } from './../service/session.service';

import { PainelDeControleComponent } from './painel-de-controle/painel-de-controle.component';
import { ComponentInfo } from 'app/viewmodel/template/componentInfo';1
import { Router } from '@angular/router';
import { Component, OnInit, Injectable } from '@angular/core';
import { TemplateService } from 'app/service/template.service';
import { HolderService } from 'app/service/holder.service';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';
import { Vizitante, Cozinheiro } from 'app/template/subnav/subnavsMock';
import { IndexPageComponent } from 'app/template/index-page/index-page.component';
import { AlertService } from 'app/service/alert.service';

@Component({
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    providers: [TemplateService, AlertService, SessionService, HolderService]
})

@Injectable()
export class TemplateComponent implements OnInit {

    public useCase: any;

    public menus: MenuSubnav[];

    constructor(private router: Router,
        public holderService: HolderService,
        private templateService: TemplateService,
        private session: SessionService,
        private alert : AlertService
    ) { }

    ngOnInit(): void {
        this.menuVizitante()
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

    public desativarMenu() {
        for (let e of this.menus) {
            e.ativo = false;
        }
    }

    public changeCase(str: string): void {
        this.desativarMenu();
        this.useCase = this.templateService.createComp(str)
    }

    public subNavChangeCase(menu: MenuSubnav): void {
        this.changeCase(menu.component)
        menu.ativo = true;
    }

    public adminNav(b: boolean): void {
        if (!b) {
            this.menus = Vizitante;
        } else {
            this.menus = Cozinheiro;
        }

    }

    public menuVizitante() {
        this.adminNav(false);
        this.changeCase('IndexPageComponent')
    }

    public menuCozinheiro() {
        this.adminNav(true);
        this.changeCase('PainelDeControleComponent')

    }



}