import { ReceitaService } from './../../receita.service';
import { Component, OnInit, Input, ViewChild, AfterContentChecked, OnChanges, SimpleChanges } from '@angular/core';
import { MedidaService } from 'app/service/medida.service';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Medida } from 'app/viewmodel/template/receita/medida';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { Etapa } from 'app/viewmodel/template/receita/etapa';
import { IngredienteReceita } from 'app/viewmodel/template/receita/ingrediente-receita';
import { Passo } from 'app/viewmodel/template/receita/passo';
import { Categoria } from 'app/viewmodel/template/receita/categoria';
import { Wizard } from 'clarity-angular';
import { SessionService } from 'app/service/session.service';
import { AlertService } from 'app/service/alert.service';
import * as _ from "lodash";
import { trigger, state, transition, style, animate } from '@angular/animations';



@Component({
    selector: 'passo-component',
    templateUrl: 'passo.component.html',
    styleUrls: ['passo.component.css'],
    providers: [
        ReceitaService, MedidaService],
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.2s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 0.1s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})


export class PassoComponent implements OnInit {

    @Input()
    private passo: Passo;

    constructor(private alert: AlertService) { }

    ngOnInit(): void {
    }

}
