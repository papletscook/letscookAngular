import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from './../../viewmodel/template/receita/categoria';
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
			this.qualcategoriaexiste();
		});
	}

	private load() {
		this.receitaService
			.buscarPorNome(this.search)
			.then(data => {
				this.receitas = data;
				this.loading = false;
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
			let cat: Categoria[] = [];
			this.receitas.forEach(element => {
				cat.push(element.categoria);
			});
			this.categoriaExist = _.uniq(cat)
			this.categoriaExist.sort(function (a, b) {
				return a.nome.localeCompare(b.nome);
			});
		} catch (error) {
			console.log(error)
		}
	}

	private limparFiltro() {
		this.load()
	}

	private filtraPorCategoria(categoria: Categoria) {
		this.receitas = this.holderService.receitas;
		this.categoriaSelect = categoria;
		let receitasSelect: Receita[] = [];
		this.receitas.forEach(element => {
			if (element.categoria == categoria) {
				receitasSelect.push(element);
			}
		});
		receitasSelect.sort(function (a, b) {
			return a.categoria.nome.localeCompare(b.categoria.nome);
		});
		this.receitas = receitasSelect;
	}


}
