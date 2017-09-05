import { HolderService } from './../util/holder/holder.service';
import { Router } from '@angular/router';
import { ValidLoginService } from './../util/login/valid-login.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'menu-receita-component',
    templateUrl: 'menu-receita.component.html',
    styleUrls: ['menu-receita.component.css']
})

export class MenuReceitaComponent implements OnInit {

    constructor(
        private validLoginService: ValidLoginService,
        private router: Router,
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