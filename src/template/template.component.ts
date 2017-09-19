import { MenuPainelDeControle } from './../painel-de-controle/mock-painel-de-controle/subnav-manu-painel';
import { TemplateService } from './util-service/template.service';
import { TemplateMenuReceitaService } from './util-service/template-menu-receita.service';
import { MinhasReceitasComponent } from './../menu-receita/minhas-receitas/minhas-receitas.component';
import { MenuReceitas } from './../menu-receita/mock-subnav-menu/subnav-menu-receitas';
import { MenuSubnav } from './../viewmodel/menu-subnav/menu-subnav';
import { PublicarReceitaComponent } from './../menu-receita/publicar-receita/publicar-receita.component';
import { MenuReceitaComponent } from './../menu-receita/menu-receita.component';
import { HolderService } from './../util/holder/holder.service';
import { ValidLoginService } from './../util/login/valid-login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    providers: [TemplateMenuReceitaService, TemplateService]
})

export class TemplateComponent implements OnInit {

    public componentData = null;
    public receita: string;

    public infoMenuSubNav: MenuSubnav[];
    public subnavAtivo: boolean = false;

    public sidenavActive: boolean = false;

    constructor(private router: Router,
        public validLoginService: ValidLoginService,
        public holderService: HolderService,
        private templateService: TemplateService,
        private templateMenuReceitaService: TemplateMenuReceitaService) { }

    ngOnInit(): void {
        this.createIndexComponent();
    }

    public entrar() {
        this.holderService.modalIsCloseable = true;
        this.holderService.modalOpen = true;
    }

    public sair() {
        sessionStorage.clear();
        this.holderService.userLogado = false;
        window.location.reload();
        
    }

    public createIndexComponent() {
        this.componentData = this.templateService.createIndexComponent();
    }

    public createPainelDeControle() {
        this.subnavAtivo = true;
        this.infoMenuSubNav = MenuPainelDeControle;
        this.componentData = this.templateService.createPainelDeControle();
    }

    public createMinhasReceitasComponent() {
        this.subnavAtivo = true;
        this.holderService.qualSubnavEstaAtivo = "minhas-receitas-component";
        this.componentData = this.templateMenuReceitaService.createMinhasReceitasComponent();
    }

    public createPublicarReceitaComponent() {
        this.subnavAtivo = true;
        this.holderService.qualSubnavEstaAtivo = "publicar-receita-component";
        this.componentData = this.templateMenuReceitaService.createPublicarReceitaComponent();
    }

}