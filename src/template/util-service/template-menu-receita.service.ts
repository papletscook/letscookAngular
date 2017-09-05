import { MinhasReceitasComponent } from './../../menu-receita/minhas-receitas/minhas-receitas.component';
import { PublicarReceitaComponent } from './../../menu-receita/publicar-receita/publicar-receita.component';
import { MenuReceitaComponent } from './../../menu-receita/menu-receita.component';
import { Injectable } from '@angular/core';

@Injectable()
export class TemplateMenuReceitaService {

    private componentData = null;

    constructor() { }

    public createMenuReceitaComponent() {
        this.componentData = {
            component: MenuReceitaComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

    public createMinhasReceitasComponent() {
        this.componentData = {
            component: MinhasReceitasComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

    public createPublicarReceitaComponent() {
        this.componentData = {
            component: PublicarReceitaComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

}