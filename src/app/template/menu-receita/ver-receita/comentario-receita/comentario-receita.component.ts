import { AlertService } from 'app/service/alert.service';
import { ComentarioService } from './comentario.service';
import { Receita } from 'app/viewmodel/template/receita/receita';

import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'app/service/session.service';
import { ComentarioReceita } from 'app/viewmodel/template/receita/comentario';
import { ReceitaService } from 'app/template/menu-receita/receita.service';

@Component({
  selector: 'app-comentario-receita',
  templateUrl: './comentario-receita.component.html',
  styleUrls: ['./comentario-receita.component.css']
})
export class ComentarioReceitaComponent implements OnInit {

  @Input()
  private receita: Receita;

  private comentar: boolean = false;

  private comentario: ComentarioReceita = new ComentarioReceita();

  @Input()
  private blocked: boolean = false;

  constructor(
    private session: SessionService,
    private service: ComentarioService,
    private alert: AlertService,
    private receitaService: ReceitaService
  ) { }

  ngOnInit() {
  }

  confirmarComentario() {
    this.comentar = false;
    this.comentario.usuario = this.session.consultarUsuario();
    this.comentario.receita = new Receita();
    this.comentario.receita.id = this.receita.id;

    this.service.cadastrar(this.comentario)
      .then(data => {
        this.receitaService.getById(this.receita)
          .then(data => {
            this.receita = data;
            this.comentario = new ComentarioReceita();
          }, error => {
            this.alert.error("Falha ao Buscar Receita!")
          })
      }, error => {
        this.alert.error("Falha ao Comentar Receita!")
      })
  }

  cancelarComentario() {
    this.comentar = false;
    this.comentario = new ComentarioReceita();
  }

}
