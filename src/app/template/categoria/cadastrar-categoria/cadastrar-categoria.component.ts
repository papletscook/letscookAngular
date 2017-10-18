import { Categoria } from 'app/viewmodel/template/receita/categoria';
import { AlertService } from './../../../service/alert.service';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cadastrar-categoria-component',
    templateUrl: 'cadastrar-categoria.component.html',
    styleUrls: ['cadastrar-categoria.component.css'],
    providers: [CategoriaService]
})

export class CadastrarCategoriaComponent implements OnInit {

    private loading: boolean = false;

    private categoria: Categoria = new Categoria();

    constructor(
        private categoriaService: CategoriaService,
        private alertService: AlertService) { }

    public ngOnInit() { }

    public validation(): boolean {
        if (this.categoria.nome) {
            return true;
        }
        return false;
    }

    private cadastrarCategoria() {
        if (this.validation()) {
            this.loading = true;
            this.categoriaService.cadastrar(this.categoria)
                .then(data => {
                    this.loading = false;
                    this.alertService.info("Categoria: " + data.nome + " cadastrada com sucesso.")
                    this.limpar();
                }, error => {
                    this.alertService.error("Ocorreu um erro ao cadastrar Categoria!");
                    this.limpar();
                    this.loading = false;
                });
        }
    }

    private limpar() {
        this.categoria = new Categoria();
    }
}