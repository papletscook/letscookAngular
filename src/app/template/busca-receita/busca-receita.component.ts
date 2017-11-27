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

	@Input()
	private search: string;

	constructor(private receitaService: ReceitaService,
		public holderService: HolderService) { }

	public ngOnInit() {
		this.receitas = this.holderService.receitas;
	}

	public ngOnChanges(changes: SimpleChanges) {

		console.log(changes);


	}

	// public carregar() {
	// 	this.receitaService.buscarPorNome(this.nome).then(data => {
	// 		this.receitas = data;
	// 	}, error => {

	// 	});
	// 	this.loading = false;
	// }


}
