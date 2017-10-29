import { RegistroComponent } from './registro/registro.component';
import { DynamicRouterService } from './dynamic-router/dynamic-router.service';
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
    selector: 'template-component',
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
        public alert: AlertService,
        public dynamicRouterService: DynamicRouterService) { }

    public ngOnInit(): void {
        this.setToDynamicComponent(IndexPageComponent)
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

    public setToDynamicComponent(component: any) {
        // Sempre resetar para null antes de setar component
        this.dynamicRouterService.component = null;
        // Deixar timeout senão react não entende que mudou variavel na holder.
        setTimeout(() => {
            this.dynamicRouterService.component = component;
        }, 1);
    }

    private mostraSubNav(ativo: boolean, whatSubNav?: any) {
        this.subNavAtivo = ativo;
        this.menus = whatSubNav;
    }

    public abrirComponentesGenericoDaIndex(component: string) {
        switch (component) {
            case "DespensaComponent":
                this.mostraSubNav(true, Cozinheiro)
                this.setToDynamicComponent(DespensaComponent);
                break;
            case "PainelDeControleComponent":
                this.mostraSubNav(true, Cozinheiro)
                this.setToDynamicComponent(PainelDeControleComponent);
                break;
            case "IndexPageComponent":
                this.mostraSubNav(false, null)
                this.setToDynamicComponent(IndexPageComponent);
                break;
            case "RegistroComponent":
                this.adminNav(false);
                this.changeCase(RegistroComponent);
                break;
        }
    }

}