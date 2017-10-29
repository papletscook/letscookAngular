import { Receita } from './../../viewmodel/template/receita/receita';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'app/service/alert.service';
import { ReceitaService } from 'app/template/menu-receita/receita.service';

@Component({
  selector: 'app-card-receita',
  templateUrl: './card-receita.component.html',
  styleUrls: ['./card-receita.component.css']
})
export class CardReceitaComponent implements OnInit {

  @Input()
  private receita: Receita;

  constructor(
    private alert: AlertService,
    private receitaServ: ReceitaService
  ) { }

  ngOnInit() {
  }

}
