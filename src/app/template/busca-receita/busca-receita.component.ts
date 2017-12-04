import { Categoria } from 'app/viewmodel/template/receita/categoria';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Receita } from './../../viewmodel/template/receita/receita';
import { ReceitaService } from 'app/template/menu-receita/receita.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import * as _ from "lodash";
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
	selector: 'app-busca-receita',
	templateUrl: './busca-receita.component.html',
	styleUrls: ['./busca-receita.component.css'],
	providers: [ReceitaService]
})
export class BuscaReceitaComponent implements OnInit, OnChanges, OnDestroy {

	private avaliacaoFilter: string;

	private minsPreparoFilter: number;

	private categoriaFilter: Categoria;

	private sub: Subscription;

	private nome: string;

	private receitas: Receita[] = []

	private loading: boolean = false;

	private categoriaExist: Categoria[] = [];

	private categoriaSelect: Categoria;

	@Input()
	private search: string;

	constructor(private receitaService: ReceitaService,
		public holderService: HolderService,
		private route: ActivatedRoute
	) { }

	public ngOnInit() {
		this.loading = false
		this.sub = this.route.params.subscribe(params => {
			this.search = params['search'];
			this.load()
		});
	}

	private load() {
		this.receitaService
			.buscarPorNome(this.search)
			.then(data => {
				this.receitas = data;
				this.loading = false;
				this.qualcategoriaexiste();
			}, error => {
				console.log("Erro ao realizar busca...");
				this.loading = false;
			});
	}



	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public ngOnChanges(changes: SimpleChanges) {
		//console.log(changes);
	}

	private qualcategoriaexiste() {
		try {
			this.categoriaExist = [];
			let cat: Categoria[] = [];
			for (let element of this.receitas) {
				if (!this.contains(element.categoria, cat)) {
					cat.push(element.categoria);
				}
			}

			this.categoriaExist = cat;
			this.categoriaExist.sort(function (a, b) {
				return a.nome.localeCompare(b.nome);
			});
		} catch (error) {
			console.log(error)
		}
	}

	private limparFiltro() {
		this.categoriaFilter = null
		this.avaliacaoFilter = null;
		this.minsPreparoFilter = null;
		this.load()
	}

	public contains(cat: Categoria, lst: Categoria[]): boolean {
		for (let element of lst) {
			if (cat.nome === element.nome) {
				return true;
			}
		}
		return false;
	}


	private filtraPorCategoria(categoria: Categoria) {
		this.categoriaFilter = categoria;
	}


}
