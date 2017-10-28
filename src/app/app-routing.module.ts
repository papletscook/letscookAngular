import { VerReceitaComponent } from 'app/template/menu-receita/ver-receita/ver-receita.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from 'app/template/template.component';
import { TopavaliacaoComponent } from 'app/template/index-page/topavaliacao/topavaliacao.component';


const routes: Routes = [
    { path: '', redirectTo: 'letscook', pathMatch: 'full' },
    { path: 'receita/:id', component: VerReceitaComponent},
    { path: 'topavaliacao', component: TopavaliacaoComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}