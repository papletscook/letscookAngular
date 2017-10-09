import { Component, Input } from '@angular/core';
import { Receita } from 'app/viewmodel/template/receita/receita';



@Component({
    selector: 'resumo-receita-component',
    templateUrl: 'resumo-receita.component.html',
    styleUrls: ['resumo-receita.component.css']
})


export class ResumoReceitaComponent {
    @Input()
    private receita: Receita;

    
}
