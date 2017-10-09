import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { IndexPageComponent } from 'app/template/index-page/index-page.component';
import { PainelDeControleComponent } from 'app/template/painel-de-controle/painel-de-controle.component';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';

@Injectable()
export class TemplateService {

    constructor() { }

    public createIndexComponent() {
        return {
            component: IndexPageComponent
        }
    }

    public createComp(param : string) : any {
        if(param == 'PainelDeControleComponent'){
            return {
                component: PainelDeControleComponent,
                inputs: [
                ]
            }
        }

        if(param == 'IndexPageComponent'){
            return {
                component: IndexPageComponent,
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
        return  { component: menu}
    }

}
