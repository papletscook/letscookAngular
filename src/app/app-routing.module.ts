import { IndexPageComponent } from './template/index-page/index-page.component';
import { DespensaComponent } from './template/despensa/despensa.component';
import { VerReceitaComponent } from 'app/template/menu-receita/ver-receita/ver-receita.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from 'app/template/template.component';
import { TopavaliacaoComponent } from 'app/template/index-page/topavaliacao/topavaliacao.component';
import { CategoriaComponent } from 'app/template/index-page/categoria/categoria.component';
import { ListaComprasComponent } from 'app/template/lista-compras/lista-compras.component';
import { BuscaReceitaComponent } from 'app/template/busca-receita/busca-receita.component';
import { PageNotFoundComponent } from 'app/template/page-not-found/page-not-found.component';


const routes: Routes = [
    { path: '',   redirectTo: '/topavaliacao', pathMatch: 'full' },
    { path: 'receita/:id', component: VerReceitaComponent },
    { path: 'categoria/:id', component: CategoriaComponent },
    { path: 'topavaliacao', component: TopavaliacaoComponent },
    { path: 'despensa', component: DespensaComponent },
    { path: 'listaCompras', component: ListaComprasComponent },
    { path: 'busca', component: BuscaReceitaComponent },
    { path: '**', component: PageNotFoundComponent }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}