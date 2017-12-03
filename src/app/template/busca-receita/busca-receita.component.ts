import { Categoria } from './../../viewmodel/template/receita/categoria';
import { Receita } from './../../viewmodel/template/receita/receita';
import { ReceitaService } from 'app/template/menu-receita/receita.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import * as _ from "lodash";


@Component({
	selector: 'app-busca-receita',
	templateUrl: './busca-receita.component.html',
	styleUrls: ['./busca-receita.component.css'],
	providers: [ReceitaService]
})
export class BuscaReceitaComponent implements OnInit, OnChanges {

	private nome: string;

	private receitas: Receita[];

	private loading: boolean = false;

	private categoriaExist: Categoria[] = [];

	private categoriaSelect: Categoria;



	@Input()
	private search: string;

	constructor(private receitaService: ReceitaService,
		public holderService: HolderService) { }

	public ngOnInit() {
		this.receitas = this.holderService.receitas;
		this.qualcategoriaexiste();
	}

	public ngOnChanges(changes: SimpleChanges) {
		//console.log(changes);
	}

	private qualcategoriaexiste() {
		let cat: Categoria[] = [];
		this.receitas.forEach(element => {
			cat.push(element.categoria);
		});
		this.categoriaExist = _.uniq(cat)
		this.categoriaExist.sort(function (a, b) {
			return a.nome.localeCompare(b.nome);
		});
	}

	private limparFiltro() {
		this.receitas = this.holderService.receitas;
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
