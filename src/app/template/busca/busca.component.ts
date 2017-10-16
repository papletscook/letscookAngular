import { BuscaService } from './busca.service';
import { SessionService } from './../../service/session.service';
import { Component, OnInit } from '@angular/core';
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
        private session: SessionService,
        private holderService: HolderService) { }

    ngOnInit() {
        this.session.isLogado().then((result: boolean) => {
            if (!result) {
                this.holderService.modalOpen = true;
            } else {
                this.holderService.userLogado = true;
            }
        });
    }

}