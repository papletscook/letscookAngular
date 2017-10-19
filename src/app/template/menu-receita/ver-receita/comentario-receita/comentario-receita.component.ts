
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
  private comentarios: ComentarioReceita[];

  private comentar: boolean = false;

  private comentario: ComentarioReceita = new ComentarioReceita();

  constructor() { }

  ngOnInit() {
  }

  confirmarComentario() {
    this.comentar = false;
    this.comentario = new ComentarioReceita();
  }


}
