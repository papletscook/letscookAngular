import { IngredientesService } from './../services/ingredientes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from "clarity-angular";
import { CompleterService, CompleterData } from 'ng2-completer';


@Component({
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css'],
    providers: [IngredientesService]
})

export class PublicarReceitaComponent implements OnInit {

    protected searchStr: string;
    protected dataService: CompleterData;

    private modalEtapa: boolean = false;
    private modalPasso: boolean = false;


    constructor(
        private completerService: CompleterService,
        private ingredientesService: IngredientesService) { }

    ngOnInit() {
        this.getAllIngredientes();
    }

    public getAllIngredientes() {
        this.ingredientesService.getAllIngredientes()
            .then(data => {
                this.dataService = this.completerService.local(data, "nome", "nome");
            }, error => {

            });
    }

}