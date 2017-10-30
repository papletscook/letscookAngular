import { RegistroComponent } from './registro/registro.component';
import { CadastrarCategoriaComponent } from './categoria/cadastrar-categoria/cadastrar-categoria.component';
import { DespensaComponent } from './../template/despensa/despensa.component';
import { PrepararReceitaComponent } from './../template/menu-receita/preparar-receita/preparar-receita.component';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { IndexPageComponent } from 'app/template/index-page/index-page.component';
import { PainelDeControleComponent } from 'app/template/painel-de-controle/painel-de-controle.component';
import { MenuSubnav } from 'app/viewmodel/template/menu-subnav/menu-subnav';
import { PublicarReceitaComponent } from 'app/template/menu-receita/publicar-receita/publicar-receita.component';
import { VerReceitaComponent } from 'app/template/menu-receita/ver-receita/ver-receita.component';
import { CadastrarIngredienteComponent } from 'app/template/ingrediente/cadastrar-ingrediente/cadastrar-ingrediente.component';

@Injectable()
export class TemplateService {

    public component: any;

    private components: any[] = [{
        nome: 'PrepararReceitaComponent',
        component: PrepararReceitaComponent,
        inputs: []
    }, {
        nome: 'PublicarReceitaComponent',
        component: PublicarReceitaComponent,
        inputs: [{ _open: true }]
    }, {
        nome: 'PainelDeControleComponent',
        component: PainelDeControleComponent,
        inputs: []
    }, {
        nome: 'IndexPageComponent',
        component: IndexPageComponent,
        inputs: []
    }, {
        nome: 'VerReceitaComponent',
        component: VerReceitaComponent,
        inputs: []
    }, {
        nome: 'DespensaComponent',
        component: DespensaComponent,
        inputs: []
    },
    {
        nome: 'CadastrarIngredienteComponent',
        component: CadastrarIngredienteComponent,
        inputs: []
    },
    {
        nome: 'CadastrarCategoriaComponent',
        component: CadastrarCategoriaComponent,
        inputs: []
    }
    ,
    {
        nome: 'RegistroComponent',
        component: RegistroComponent,
        inputs: []
    }]

    public createComp(component: any): any {
        for (let comp of this.components) {
            if (comp.component == component) {
                this.component = {
                    component: comp.component,
                    inputs: ""
                }
                return this.component;
            }
        }
    }

    public switchComp(menu: string) {
        return { component: menu }
    }

}
