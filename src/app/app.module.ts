import { RegistroComponent } from './template/registro/registro.component';
import { CadastrarCategoriaComponent } from './template/categoria/cadastrar-categoria/cadastrar-categoria.component';
import { TemplateService } from './template/template.service';
import { AlertService } from './service/alert.service';
import { LoginService } from './template/login/login.service';
import { DespensaComponent } from './template/despensa/despensa.component';
import { PassoComponent } from './template/menu-receita/preparar-receita/passo/passo.component';
import { VerReceitaComponent } from './template/menu-receita/ver-receita/ver-receita.component';
import { SessionService } from './service/session.service';
import { UrlServiceService } from 'app/service/url.service';
import { HolderService } from 'app/service/holder.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from "clarity-angular";
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
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { RatingModule } from "ngx-rating";
import { Ng2CompleterModule } from "ng2-completer";
import { CadastrarIngredienteComponent } from 'app/template/ingrediente/cadastrar-ingrediente/cadastrar-ingrediente.component';
import { MomentModule } from 'angular2-moment';
import { ComentarioReceitaComponent } from 'app/template/menu-receita/ver-receita/comentario-receita/comentario-receita.component';
import { ComentarioService } from 'app/template/menu-receita/ver-receita/comentario-receita/comentario.service';
import { TopavaliacaoComponent } from './template/index-page/topavaliacao/topavaliacao.component';
import { CategoriaComponent } from './template/index-page/categoria/categoria.component';
import { ListaComprasComponent } from './template/lista-compras/lista-compras.component';
import { CardReceitaComponent } from './template/card-receita/card-receita.component';
import { BuscaReceitaComponent } from './template/busca-receita/busca-receita.component';
import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';
import { CommonModule } from "@angular/common";

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
        ImageCropperComponent,
        VerReceitaComponent,
        PassoComponent,
        DespensaComponent,
        CadastrarIngredienteComponent,
        CadastrarCategoriaComponent,
        ComentarioReceitaComponent,
        TopavaliacaoComponent,
        CategoriaComponent,
        ListaComprasComponent,
        CardReceitaComponent,
        BuscaReceitaComponent,
        PageNotFoundComponent,
        RegistroComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ToastModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        RatingModule,
        Ng2CompleterModule,
        MomentModule,
        CommonModule,
        BrowserModule
    ],
    providers: [
        HolderService,
        UrlServiceService,
        SessionService,
        HolderService,
        SessionService,
        LoginService,
        AlertService,
        TemplateService,
        ComentarioService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        PublicarReceitaComponent,
        MenuReceitaComponent,
        MinhasReceitasComponent,
        IndexPageComponent,
        PainelDeControleComponent,
        PrepararReceitaComponent,
        VerReceitaComponent,
        DespensaComponent,
        CadastrarIngredienteComponent,
        CadastrarCategoriaComponent,
        TopavaliacaoComponent,
        RegistroComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule {
}
