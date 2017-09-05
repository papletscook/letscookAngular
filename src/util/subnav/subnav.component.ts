import { TemplateComponent } from './../../template/template.component';
import { HolderService } from './../holder/holder.service';
import { MenuSubnav } from './../../viewmodel/menu-subnav/menu-subnav';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'subnav-component',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css']
})

export class SubnavComponent implements OnInit {

    @Input() subnavAtivo: boolean;
    @Input() menus: MenuSubnav[];

    constructor(
        private holderService: HolderService,
        private templateComponent: TemplateComponent) { }

    ngOnInit() { }

    private abreComponent(menu) {
        this.switchMenuReceitas(menu);
    }

    //Menu Receitas....
    public switchMenuReceitas(menu) {
        switch (menu.component) {
            case "minhas-receitas-component":
                this.templateComponent.createMinhasReceitasComponent();
                break;
            case "publicar-receita-component":
                this.templateComponent.createPublicarReceitaComponent();
                break;
        }
    }

    private qualEstaAtivo(menu): boolean {
        let ativo = false;
        if (menu.component == this.holderService.qualSubnavEstaAtivo) {
            ativo = true;
        }
        return ativo;
    }

}