import { Despensa } from './../../viewmodel/template/despensa/despensa';
import { DespensaService } from './../../service/despensa.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'despensa-component',
    templateUrl: 'despensa.component.html',
    styleUrls: ['despensa.component.css'],
    providers: [DespensaService]
})

export class DespensaComponent implements OnInit {

    private despensa: Despensa;

    constructor(
        private despensaService: DespensaService) { }

    public ngOnInit() {
        this.buscarPorUsuario();
    }

    public buscarPorUsuario() {
        this.despensaService.buscarPorUsuario()
            .then(data => {
                this.despensa = data;
            }, error => {
                console.log("Erro ao buscar Despensa");
            });
    }

}