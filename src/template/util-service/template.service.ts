import { PainelDeControleComponent } from './../../painel-de-controle/painel-de-controle.component';
import { IndexPageComponent } from './../../index-page/index-page.component';
import { Injectable } from '@angular/core';

@Injectable()
export class TemplateService {

    private componentData = null;

    constructor() { }

    public createIndexComponent() {
        this.componentData = {
            component: IndexPageComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

    public createPainelDeControle() {
        this.componentData = {
            component: PainelDeControleComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

}
