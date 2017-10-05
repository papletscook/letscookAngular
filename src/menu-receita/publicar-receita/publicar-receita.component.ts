import { element } from 'protractor';
import { Passo } from './../../viewmodel/receita/passo';
import { Etapa } from './../../viewmodel/receita/etapa';
import { Ingrediente } from './../../viewmodel/receita/ingrediente';
import { MockReceita } from './mock/mockReceita';
import { IngredienteReceita } from './../../viewmodel/receita/ingredienteReceita';
import { Receita } from './../../viewmodel/receita/receita';
import { Categoria } from './../../viewmodel/receita/categoria';
import { IngredienteService } from './../services/ingrediente.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Wizard } from 'clarity-angular';
import { CompleterService, CompleterData } from 'ng2-completer';
import { CategoriaService } from 'menu-receita/services/categoria.service';
import { MedidaService } from 'menu-receita/services/medida.service';
import { Medida } from 'viewmodel/receita/medida';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css'],
    providers: [IngredienteService,
        CategoriaService,
        IngredienteService,
        MedidaService]
})


export class PublicarReceitaComponent implements OnInit {
    private allIngredientes: Ingrediente[];

    private etapaEdited: Etapa;
    private passoEdited: Passo;

    protected searchStr: string;
    protected dataService: CompleterData;

    private modalEtapa = false;
    private modalPasso = false;

    private categorias: Categoria[];
    private medidas: Medida[];

    private receita: Receita;

    private ingredienteCad: IngredienteReceita;
    private ingredientes: IngredienteReceita[] = [];


    @ViewChild('wizard') wizard: Wizard;
    skipStepTwo = true;
    _open = true;

    constructor(
        private completerService: CompleterService,
        private ingredientesService: IngredienteService,
        private categoriaService: CategoriaService,
        private medidaService: MedidaService) { }


    toggleStepTwo() {
        this.skipStepTwo = !this.skipStepTwo;
    }

    open() {
        this._open = !this.open;
    }


    ngOnInit() {
        this.receita = new Receita();
        this.ingredienteCad = new IngredienteReceita();
        this.carregarCampos()
        const r = MockReceita;
        this.receita = r;
    }

    excluirEtapa(etapa: Etapa): void {
        if (confirm('Deseja excluir etapa?')) {
            this.receita.etapas.splice(this.receita.etapas.indexOf(etapa), 1)
        }
    }

    excluirPasso(passo: Passo, etapa: Etapa){
        etapa.passos.splice(etapa.passos.indexOf(passo), 1)
    }

    editarEtapa(etapa: Etapa): void {
        this.etapaEdited = etapa;
        this.passoEdited = null;
    }

    editarPasso(passo: Passo): void {
        this.passoEdited = passo;
        this.etapaEdited = null;
    }

    adicionarNovoPasso(etapa: Etapa): void {
        etapa.passos.push({ nome: 'Novo Passo' });
    }

    salvarPasso(): void {
        this.passoEdited = null;
    }

    salvarEtapa(): void {
        this.etapaEdited = null;
    }

    private adicionarIngrediente() {
        this.ingredientes.push(this.ingredienteCad);
        this.receita.ingts = this.ingredientes;
        this.ingredienteCad = new IngredienteReceita();
    }

    private limparIngrediente() {
        this.ingredienteCad = new IngredienteReceita();
    }

    protected carregarCampos() {
        this.getIngredientes();
        this.getCategorias();
        this.getMedidas();
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.receita.foto = myReader.result;
        }
        myReader.readAsDataURL(file);
    }

    public getIngredientes() {
        this.ingredientesService.list()
            .then(data => {
                this.allIngredientes = data;
            }, error => {

            });
    }

    public redefinirEtapas() {
        this.receita.etapas = [];
        this.addNewEtapa();
    }

    public addNewEtapa() {
        const et: Etapa = new Etapa();
        et.nome = 'Nova Etapa'
        const passos = [];
        passos.push({ nome: 'Novo Passo' })
        et.passos = passos;
        this.receita.etapas.push(et);
    }

    public getCategorias() {
        if (!this.categorias) {
            this.categoriaService.list()
                .then(data => {
                    this.categorias = data;
                }, error => {
                })
        }
    }

    public getMedidas() {
        if (!this.categorias) {
            this.medidaService.list()
                .then(data => {
                    this.medidas = data;
                }, error => {
                })
        }
    }

}
