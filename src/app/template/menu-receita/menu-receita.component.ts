import { SessionService } from './../../service/session.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import { IngredienteService } from 'app/service/ingrediente.service';

@Component({
    selector: 'menu-receita-component',
    templateUrl: 'menu-receita.component.html',
    styleUrls: ['menu-receita.component.css'],
    providers: [
        HolderService
    ]
})

export class MenuReceitaComponent implements OnInit {

    constructor(
        private session: SessionService,
        public holderService: HolderService) { }

    ngOnInit() {
        this.session.isLogado()
            .then((result: boolean) => {
                if (!result) {
                    //this.router.navigate(['./letscook/']);
                    this.holderService.modalOpen = true;
                    this.holderService.modalIsCloseable = false;
                }
            });
    }
}