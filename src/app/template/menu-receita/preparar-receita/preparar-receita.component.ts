import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { CompleterService } from 'ng2-completer';
import { IngredienteService } from 'app/service/ingrediente.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'app/service/categoria.service';
import { MedidaService } from 'app/service/medida.service';
import { ReceitaService } from 'app/service/receita.service';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { Receita } from 'app/viewmodel/template/receita/receita';



@Component({
    selector: 'preparar-receita-component',
    templateUrl: 'preparar-receita.component.html',
    styleUrls: ['preparar-receita.component.css'],
    providers: [
        ReceitaService]
})


export class PrepararReceitaComponent implements OnInit, ComponentInfo{
    nome: string = "Preparar Receita"
    component: any = this

    private receita: Receita;

    constructor(
        private receitaService: ReceitaService) { }

    ngOnInit() {
        this.receita = new Receita();
    }


}
