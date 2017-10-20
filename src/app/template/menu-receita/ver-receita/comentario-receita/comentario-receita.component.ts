import { ComentarioService } from './comentario.service';
import { Receita } from 'app/viewmodel/template/receita/receita';

import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'app/service/session.service';
import { ComentarioReceita } from 'app/viewmodel/template/receita/comentario';

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

  constructor(
    private session: SessionService,
    private service : ComentarioService
  ) { }

  ngOnInit() {
  }

  confirmarComentario() {
    this.comentar = false;
    this.comentario.usuario = this.session.consultarUsuario();
    this.receita.comentarios.push(this.comentario)

    this.comentario = new ComentarioReceita();
  }




}
