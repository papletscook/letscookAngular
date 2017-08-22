import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../login/login.component';
import { TemplateComponent } from './../template/template.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'letscook/entrar', pathMatch: 'full'
    },
    {
        path: 'letscook/entrar', component: LoginComponent
    },
    {
        path: 'letscook', component: TemplateComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { 
    
}