import { DespensaComponent } from './despensa/despensa.component';
import { TemplateService } from './template.service';
import { SessionService } from './../service/session.service';

import { PainelDeControleComponent } from './painel-de-controle/painel-de-controle.component';
import { ComponentInfo } from 'app/viewmodel/template/componentInfo'; 1
import { Router } from '@angular/router';
import { Component, OnInit, Injectable } from '@angular/core';
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

    private subNavAtivo: boolean = false;

    constructor(private router: Router,
        public holderService: HolderService,
        private templateService: TemplateService,
        private session: SessionService,
        public alert: AlertService
    ) { }

    public ngOnInit(): void {

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
            this.menus = Vizitante;
        } else {
            this.menus = Cozinheiro;
        }
    }

    private abrirComponentesGenericoDaIndex(component: string) {
        switch (component) {
            case "DespensaComponent":
                this.subNavAtivo = true;
                this.changeCase(DespensaComponent);
                break;
            case "PainelDeControleComponent":
                this.subNavAtivo = true;
                this.changeCase(PainelDeControleComponent);
                break;
            case "IndexPageComponent":
                this.changeCase(IndexPageComponent);
                break;
        }
    }

}