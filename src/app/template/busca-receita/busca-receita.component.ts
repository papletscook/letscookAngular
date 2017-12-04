import { Categoria } from './../../viewmodel/template/receita/categoria';
import { Receita } from './../../viewmodel/template/receita/receita';
import { ReceitaService } from 'app/template/menu-receita/receita.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { HolderService } from 'app/service/holder.service';
import _ from "lodash";


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

	private _categoriaExist: string[] = [];
	private _categoriaSelect: string;

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
		this._categoriaExist = _.uniq(_.map(cat, 'nome'));
		this._categoriaExist.sort(function (a, b) {
			return a.localeCompare(b);
		});
	}

	private limparFiltro() {
		this.receitas = this.holderService.receitas;
	}

	private filtraPorCategoria(categoria: string) {
		this.receitas = this.holderService.receitas;
		this._categoriaSelect = categoria;
		let receitasSelect: Receita[] = [];
		this.receitas.forEach(element => {
			if (element.categoria.nome === categoria) {
				receitasSelect.push(element);
			}
		});
		receitasSelect.sort(function (a, b) {
			return a.categoria.nome.localeCompare(b.categoria.nome);
		});
		this.receitas = receitasSelect;
	}


}
