import { DespensaComponent } from './../template/despensa/despensa.component';
import { PrepararReceitaComponent } from './../template/menu-receita/preparar-receita/preparar-receita.component';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { IndexPageComponent } from 'app/template/index-page/index-page.component';
import { PainelDeControleComponent } from 'app/template/painel-de-controle/painel-de-controle.component';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';
import { PublicarReceitaComponent } from 'app/template/menu-receita/publicar-receita/publicar-receita.component';
import { VerReceitaComponent } from 'app/template/menu-receita/ver-receita/ver-receita.component';


@Injectable()
export class TemplateService {

    public component: any;

    private components: any[] = [{
        nome: 'PrepararReceitaComponent',
        component: PrepararReceitaComponent,
        inputs: [
        ]
    }, {
        nome: 'PublicarReceitaComponent',
        component: PublicarReceitaComponent,
        inputs: [
        ]
    }, {
        nome: 'PainelDeControleComponent',
        component: PainelDeControleComponent,
        inputs: [
        ]
    }, {
        nome: 'IndexPageComponent',
        component: IndexPageComponent,
        inputs: [
        ]
    }, {
        nome: 'VerReceitaComponent',
        component: VerReceitaComponent,
        inputs: [
        ]
    }]

    public createIndexComponent() {

        this.component = {
            component: IndexPageComponent,
            inputs: [
            ]
        }
        return this.component;
    }

    public createComp(param: string, inputs?: any): any {
        let input: any
        if (inputs) {
            input = inputs
        } else {
            input = {};
        }


        for (let comp of this.components) {
            if (comp.nome == param) {
                this.component = {
                    component: comp.component,
                    inputs: input
                }
                return this.component;
            }
        }
    }

    public createPainelDeControle() {
        return {
            component: PainelDeControleComponent
        }
    }

    public switchComp(menu: string) {
        return { component: menu }
    }

}
