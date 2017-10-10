import { SessionService } from './service/session.service';
import { UrlServiceService } from 'app/service/url.service';
import { HolderService } from 'app/service/holder.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputTrimDirective } from './directive/input-trim.directive';
import { AutofocusDirective } from './directive/autofocus.directive';
import { PrepararReceitaComponent } from './template/menu-receita/preparar-receita/preparar-receita.component';
import { BuscaComponentComponent } from './template/busca/busca.component';
import { PainelDeControleComponent } from './template/painel-de-controle/painel-de-controle.component';
import { IndexPageComponent } from './template/index-page/index-page.component';
import { MinhasReceitasComponent } from './template/menu-receita/minhas-receitas/minhas-receitas.component';
import { MenuReceitaComponent } from './template/menu-receita/menu-receita.component';
import { PublicarReceitaComponent } from './template/menu-receita/publicar-receita/publicar-receita.component';
import { TemplateComponent } from './template/template.component';
import { LoginComponent } from './template/login/login.component';
import { SidenavComponent } from './template/sidenav/sidenav.component';
import { SubnavComponent } from './template/subnav/subnav.component';
import { AppComponent } from './app.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicComponent } from 'app/template/dynamic-component/dynamic.component';
import { ResumoReceitaComponent } from 'app/template/menu-receita/resumo-receita/resumo-receita.component';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { LoginService } from 'app/service/login.service';


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
        BuscaComponentComponent,
        ResumoReceitaComponent,
        PrepararReceitaComponent,
        AutofocusDirective,
        InputTrimDirective,
        ImageCropperComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        Ng2CompleterModule],
    providers: [
        HolderService,
        UrlServiceService,
        SessionService,
        HolderService, 
        SessionService,
        LoginService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        PublicarReceitaComponent,
        MenuReceitaComponent,
        MinhasReceitasComponent,
        IndexPageComponent,
        PainelDeControleComponent,
        PrepararReceitaComponent
    ]
})

export class AppModule {
}
