import { Receita } from './../../viewmodel/template/receita/receita';
import { ReceitaService } from 'app/template/menu-receita/receita.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca-receita',
  templateUrl: './busca-receita.component.html',
  styleUrls: ['./busca-receita.component.css'],
  providers: [ReceitaService]
})
export class BuscaReceitaComponent implements OnInit {

  private nome: string;

  private receitas: Receita[];

  private loading: boolean = false;


  constructor(private serv: ReceitaService) { }

  ngOnInit() {
  }

  public carregar() {
    this.serv.buscarPorNome(this.nome).then(data => {
      this.receitas = data;
    }, error => {

    });
    this.loading = false;
  }


}
