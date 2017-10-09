import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from 'app/template/template.component';


const routes: Routes = [
    { path: '', redirectTo: 'letscook', pathMatch: 'full' },
    { path: 'letscook', component: TemplateComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}