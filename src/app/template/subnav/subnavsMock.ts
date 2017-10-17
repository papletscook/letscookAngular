import { CadastrarIngredienteComponent } from 'app/template/ingrediente/cadastrar-ingrediente/cadastrar-ingrediente.component';
import { VerReceitaComponent } from 'app/template/menu-receita/ver-receita/ver-receita.component';
import { PainelDeControleComponent } from './../painel-de-controle/painel-de-controle.component';

import { MenuSubnav } from "app/viewmodel/template/menu-subnav/menu-subnav";
import { IndexPageComponent } from "app/template/index-page/index-page.component";
import { MinhasReceitasComponent } from "app/template/menu-receita/minhas-receitas/minhas-receitas.component";
import { PublicarReceitaComponent } from "app/template/menu-receita/publicar-receita/publicar-receita.component";
import { PrepararReceitaComponent } from "app/template/menu-receita/preparar-receita/preparar-receita.component";



export const Vizitante: MenuSubnav[] = [
    { nome: 'Página Inicial', component: 'IndexPageComponent', ativo: true }
]

export const Cozinheiro: MenuSubnav[] = [
    { nome: 'Receitas', component: PainelDeControleComponent, ativo: true },
    { nome: 'Publicar Receita', component: PublicarReceitaComponent },
    { nome: 'Ver Receita', component: VerReceitaComponent},
    { nome: 'Cadastrar Ingrediente', component: CadastrarIngredienteComponent
    
}
]
