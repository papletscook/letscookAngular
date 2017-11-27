import { ReceitaService } from './../../menu-receita/receita.service';
import { Categoria } from './../../../viewmodel/template/receita/categoria';
import { AlertService } from 'app/service/alert.service';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { CategoriaService } from 'app/template/categoria/categoria.service';
import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [CategoriaService, ReceitaService]
})

export class CategoriaComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private receitas: Receita[];
  private categoria: Categoria;
  private loading: boolean = true;

  constructor(
    private serv: CategoriaService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private receitaServ: ReceitaService) { }

  ngOnInit() {
    this.loading = true
    this.carregarCategoria()
  }

  public carregarCategoria() {
    this.sub = this.route.params.subscribe(params => {
      this.categoria = new Categoria()
      this.categoria.id = +params['id'];
      this.load()
    });
  }


  ngOnDestroy() {
    console.log('ngOnDestroy')
    this.sub.unsubscribe();

  }

  private load() {
    this.receitaServ.listarPorCategoria(this.categoria)
      .then(data => {
        this.receitas = data;
        this.loading = false;
      }, error => {
        this.alert.error("Ocorreu um erro ao buscar!");
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  private listarReceitas() {
    this.serv.list()
      .then(data => {
      }, error => {
        this.alert.error("Ocorreu um erro ao buscar!");
      });
  }
}
