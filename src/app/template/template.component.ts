
import { PainelDeControleComponent } from './painel-de-controle/painel-de-controle.component';
import { ComponentInfo } from 'app/viewmodel/template/componentInfo';
import { Router } from '@angular/router';
import { Component, OnInit, Injectable } from '@angular/core';
import { TemplateService } from 'app/service/template.service';
import { ValidLoginService } from 'app/service/valid-login.service';
import { HolderService } from 'app/service/holder.service';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';
import { Vizitante, Cozinheiro } from 'app/template/subnav/subnavsMock';
import { IndexPageComponent } from 'app/template/index-page/index-page.component';

@Component({
    templateUrl: 'template.component.html',
    styleUrls: ['template.component.css'],
    providers: [TemplateService, HolderService]
})

@Injectable()
export class TemplateComponent implements OnInit {

    public useCase: any;

    public menus: MenuSubnav[];

    constructor(private router: Router,
        public validLoginService: ValidLoginService,
        public holderService: HolderService,
        private templateService: TemplateService,
    ) { }

    ngOnInit(): void {
        this.menus = Vizitante;
        this.changeCase('IndexPageComponent')
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

    public changeCase(str: string): void {
        console.log('changeCase -> ' + str)
        this.useCase = this.templateService.createComp(str)
    }

    public adminNav(b: boolean): void {
        if(!b){
            this.menus = Vizitante;            
        }else{
            this.menus = Cozinheiro;            
        }

    }

    public menuCozinheiro(){
        this.changeCase('')
        this.adminNav(true);
    }



}