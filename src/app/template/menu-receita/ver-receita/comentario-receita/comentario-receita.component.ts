import { ComentarioReceita } from 'app/viewmodel/template/receita/comentario';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comentario-receita',
  templateUrl: './comentario-receita.component.html',
  styleUrls: ['./comentario-receita.component.css']
})
export class ComentarioReceitaComponent implements OnInit {

  @Input()
  private comentarios: ComentarioReceita[];

  constructor() { }

  ngOnInit() {
  }

}
