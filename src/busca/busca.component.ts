import { HolderService } from './../util/holder/holder.service';
import { ValidLoginService } from './../util/login/valid-login.service';
import { BuscaService } from './busca.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'busca-component',
    templateUrl: 'busca.component.html',
    styleUrls: ['busca.component.css'],
    providers: [BuscaService]
})

export class BuscaComponentComponent implements OnInit {

    constructor(
        private buscaService: BuscaService,
        public validLoginService: ValidLoginService,
        public holderService: HolderService) { }

    ngOnInit() {
        this.validLoginService.isLogado().then((result: boolean) => {
            if (!result) {
                this.holderService.modalOpen = true;
            } else {
                this.holderService.userLogado = true;
            }
        });
    }
    
}