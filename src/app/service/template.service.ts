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

    constructor() { }

    public createIndexComponent() {
        return {
            component: IndexPageComponent
        }
    }

    public createComp(param: string): any {
        if (param == 'PrepararReceitaComponent') {
            return {
                component: PrepararReceitaComponent,
                inputs: [
                ]
            }
        }

        if (param == 'PublicarReceitaComponent') {
            return {
                component: PublicarReceitaComponent,
                inputs: [
                ]
            }
        }


        if (param == 'PainelDeControleComponent') {
            return {
                component: PainelDeControleComponent,
                inputs: [
                ]
            }
        }

        if (param == 'IndexPageComponent') {
            return {
                component: IndexPageComponent,
                inputs: [
                ]
            }
        }

        if (param == 'VerReceitaComponent') {
            return {
                component: VerReceitaComponent,
                inputs: [
                ]
            }
        }

        if (param == 'DespensaComponent') {
            return {
                component: DespensaComponent,
                inputs: [
                ]
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
