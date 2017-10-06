import { element } from 'protractor';
import { Passo } from './../../viewmodel/receita/passo';
import { Etapa } from './../../viewmodel/receita/etapa';
import { Ingrediente } from './../../viewmodel/receita/ingrediente';
import { IngredienteReceita } from './../../viewmodel/receita/ingredienteReceita';
import { Receita } from './../../viewmodel/receita/receita';
import { Categoria } from './../../viewmodel/receita/categoria';
import { IngredienteService } from './../services/ingrediente.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Wizard } from 'clarity-angular';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CategoriaService } from 'menu-receita/services/categoria.service';
import { MedidaService } from 'menu-receita/services/medida.service';
import { Medida } from 'viewmodel/receita/medida';
import { MockReceita } from 'menu-receita/publicar-receita/mock/mockReceita';


@Component({
    selector: 'resumo-receita-component',
    templateUrl: 'resumo-receita.component.html',
    styleUrls: ['resumo-receita.component.css']
})


export class ResumoReceitaComponent {
    @Input()
    private receita: Receita;

    
}
