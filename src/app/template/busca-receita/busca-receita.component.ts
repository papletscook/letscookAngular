import { Receita } from './../../viewmodel/template/receita/receita';
import { ReceitaService } from 'app/template/menu-receita/receita.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { HolderService } from 'app/service/holder.service';

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

	private categoriaExist: string[] = [];

	private categoriaSelect: string;



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
		let cat: string[] = [];
		this.receitas.forEach(element => {
			cat.push(element.categoria.nome);
		});
		this.categoriaExist = Array.from(new Set(cat.map((itemInArray) => itemInArray)));
	}

	// public carregar() {
	// 	this.receitaService.buscarPorNome(this.nome).then(data => {
	// 		this.receitas = data;
	// 	}, error => {

	// 	});
	// 	this.loading = false;
	// }

	private mostrasomentecategoriaclicada(categoria: string) {
		this.receitas = this.holderService.receitas;
		if (categoria !== this.categoriaSelect) {
			this.categoriaSelect = categoria;
			let receitasSelect: Receita[] = [];
			this.receitas.forEach(element => {
				if (element.categoria.nome === categoria) {
					receitasSelect.push(element);
				}
			});
			this.receitas = receitasSelect;
		}
	}


}
