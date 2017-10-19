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

    private categorias: Categoria[];

    private modalOpenCloseStatus: boolean = false;
    private categoriaMod: Categoria;
    private btnModCategoriaDisable: boolean = false;

    constructor(
        private categoriaService: CategoriaService,
        private alertService: AlertService) { }

    public ngOnInit() {
        this.listarCategoria();
    }

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
                    this.listarCategoria();
                }, error => {
                    this.alertService.error("Ocorreu um erro ao cadastrar Categoria!");
                    this.limpar();
                    this.loading = false;
                });
        }
    }

    private listarCategoria() {
        this.loading = true;
        this.categoriaService.list()
            .then(data => {
                this.categorias = data;
                this.loading = false;
            }, error => {
                this.alertService.error("Ocorreu um erro ao buscar Categorias!");
                this.loading = false;
            });
    }

    private deletarCategoria(categoria: Categoria) {
        this.loading = true;
        this.categoriaService.deletar(categoria)
            .then(data => {
                this.alertService.info("Categoria: " + categoria.nome + " deletada com sucesso.");
                //this.listarCategoria();
                this.categorias = data;
                this.loading = false;
            }, error => {
                this.alertService.error("Ocorreu um erro ao deletar Categoria!");
                this.loading = false;
            });
    }

    private limpar() {
        this.categoria = new Categoria();
    }

    private modificaCategoria(categoria: Categoria) {
        this.categoriaMod = categoria;
        this.modalOpenCloseStatus = true;
    }

    private atualizaCategoria() {
        this.btnModCategoriaDisable = true;
        this.categoriaService.atualizar(this.categoriaMod)
            .then(data => {
                this.alertService.info("Ingrediente " + data.nome + " atualizado com sucesso.");
                this.modalOpenCloseStatus = false;
                this.btnModCategoriaDisable = false;
            }, error => {
                this.alertService.error("Ocorreu um erro ao Atualizar Categoria!");
                this.modalOpenCloseStatus = false;
                this.btnModCategoriaDisable = false;
            })
    }

}