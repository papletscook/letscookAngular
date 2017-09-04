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
    styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

    private componentData = null;
    public receita: string;

    private infoMenuSubNav: MenuSubnav[];
    private subnavAtivo: boolean = false;

    private sidenavActive: boolean = false;

    constructor(private router: Router,
        public validLoginService: ValidLoginService,
        public holderService: HolderService) { }

    ngOnInit(): void {
    }

    public entrar() {
        this.holderService.modalOpen = true;
    }

    public sair() {
        sessionStorage.clear();
        this.holderService.userLogado = false;
        //this.router.navigate(['./letscook/']);
    }

    public createMenuReceitaComponent() {
        this.subnavAtivo = true;
        this.infoMenuSubNav = MenuReceitas;
        this.holderService.qualSubnavEstaAtivo = "minhas-receitas-component";
        this.componentData = {
            component: MenuReceitaComponent,
            inputs: {
                nothing: null
            }
        }
    }

    public createMinhasReceitasComponent() {
        this.subnavAtivo = true;
        this.infoMenuSubNav = MenuReceitas;
        this.holderService.qualSubnavEstaAtivo = "minhas-receitas-component";
        this.componentData = {
            component: MinhasReceitasComponent,
            inputs: {
                nothing: null
            }
        }
    }

    public createPublicarReceitaComponent() {
        this.subnavAtivo = true;
        this.infoMenuSubNav = MenuReceitas;
        this.holderService.qualSubnavEstaAtivo = "publicar-receita-component";
        this.componentData = {
            component: PublicarReceitaComponent,
            inputs: {
                nothing: null
            }
        }
    }

}