
import { Component, OnInit } from '@angular/core';
import { BuscaService } from 'app/service/busca.service';
import { ValidLoginService } from 'app/service/valid-login.service';
import { HolderService } from 'app/service/holder.service';

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