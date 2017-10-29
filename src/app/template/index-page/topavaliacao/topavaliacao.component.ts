import { Categoria } from './../../../viewmodel/template/receita/categoria';
import { CategoriaService } from './../../categoria/categoria.service';
import { ReceitaService } from 'app/template/menu-receita/receita.service';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Component, OnInit } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import { AlertService } from 'app/service/alert.service';
import { SessionService } from 'app/service/session.service';
import * as _ from "lodash";


@Component({
  selector: 'app-topavaliacao',
  templateUrl: './topavaliacao.component.html',
  styleUrls: ['./topavaliacao.component.css'],
  providers: [AlertService, SessionService, HolderService, ReceitaService, CategoriaService]

})
export class TopavaliacaoComponent implements OnInit {

  ngOnInit() {
  }

}
