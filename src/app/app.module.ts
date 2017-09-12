import { WizardModule } from 'ng2-archwizard';
import { BuscaComponentComponent } from './../busca/busca.component';
import { PainelDeControleComponent } from './../painel-de-controle/painel-de-controle.component';
import { IndexPageComponent } from './../index-page/index-page.component';
import { SidenavComponent } from './../util/sidenav/sidenav.component';
import { MinhasReceitasComponent } from './../menu-receita/minhas-receitas/minhas-receitas.component';
import { SubnavComponent } from './../util/subnav/subnav.component';
import { MenuReceitaComponent } from './../menu-receita/menu-receita.component';
import { PublicarReceitaComponent } from './../menu-receita/publicar-receita/publicar-receita.component';
import { DynamicComponent } from './../dynamiccomponent/dynamic.component';
import { HolderService } from './../util/holder/holder.service';
import { LoginComponent } from './../login/login.component';
import { ValidLoginService } from './../util/login/valid-login.service';
import { TemplateComponent } from './../template/template.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    declarations: [
        AppComponent,
        DynamicComponent,
        SubnavComponent,
        SidenavComponent,
        LoginComponent,
        TemplateComponent,
        PublicarReceitaComponent,
        MenuReceitaComponent,
        MinhasReceitasComponent,
        IndexPageComponent,
        PainelDeControleComponent,
        BuscaComponentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        WizardModule
    ],
    providers: [
        ValidLoginService,
        HolderService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        PublicarReceitaComponent,
        MenuReceitaComponent,
        MinhasReceitasComponent,
        IndexPageComponent,
        PainelDeControleComponent
    ]
})

export class AppModule {
}