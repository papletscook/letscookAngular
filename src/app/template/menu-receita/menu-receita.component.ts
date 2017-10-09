import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ValidLoginService } from 'app/service/valid-login.service';
import { HolderService } from 'app/service/holder.service';
import { IngredienteService } from 'app/service/ingrediente.service';

@Component({
    selector: 'menu-receita-component',
    templateUrl: 'menu-receita.component.html',
    styleUrls: ['menu-receita.component.css'],
    providers: [
        HolderService, ValidLoginService
    ]
})

export class MenuReceitaComponent implements OnInit {

    constructor(
        private validLoginService: ValidLoginService,
        public holderService: HolderService) { }

    ngOnInit() {
        this.validLoginService.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    //this.router.navigate(['./letscook/']);
                    this.holderService.modalOpen = true;
                    this.holderService.modalIsCloseable = false;
                }
            });
    }
}