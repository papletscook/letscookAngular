import { CategoriaService } from 'app/service/categoria.service';
import { HolderService } from 'app/service/holder.service';
import { ReceitaService } from 'app/service/receita.service';
import { IngredienteService } from 'app/service/ingrediente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MockReceita } from './../mock/mockReceita';
import { MedidaService } from 'app/service/medida.service';

import { CompleterData, CompleterService } from 'ng2-completer';

import { Wizard } from 'clarity-angular';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { Etapa } from 'app/viewmodel/template/receita/etapa';
import { Passo } from 'app/viewmodel/template/receita/passo';
import { Categoria } from 'app/viewmodel/template/receita/categoria';
import { Medida } from 'app/viewmodel/template/receita/medida';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { IngredienteReceita } from 'app/viewmodel/template/receita/ingredienteReceita';
import { Alert } from 'app/viewmodel/template/alert';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css'],
    providers: [IngredienteService,
        CategoriaService,
        IngredienteService,
        MedidaService,
        ReceitaService,
        HolderService]
})


export class PublicarReceitaComponent implements OnInit {

    nome: string = "Publicar Receita"
    component: any = this
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
        private holderService: HolderService,
        private receitaService: ReceitaService,
        private completerService: CompleterService,
        private ingredientesService: IngredienteService,
        private categoriaService: CategoriaService,
        private medidaService: MedidaService) {

    }


    ngOnInit() {
        this.receita = new Receita();
        this.ingredienteCad = new IngredienteReceita();
        this.carregarCampos()
        const r = MockReceita;
        this.receita = r;
    }

    toggleStepTwo() {
        this.skipStepTwo = !this.skipStepTwo;
    }

    validationStepOne(): boolean {
        let r = this.receita;
        return (r.categoria != null && r.descricao != '' && r.nome != '');
    }

    validationStepTwo(): boolean {
        return this.receita.ingts.length > 0;
    }

    publicarReceita(): void {
        if (!this.receita) {
            this.receitaService.cadastrar(this.receita)
                .then(data => {
                    this.receita = data;
                }, error => {
                    this.holderService.alert = new Alert('Falha ao publicar Receita!');
                })
        }
    }


    open() {
        this._open = !this.open;
    }

    excluirEtapa(etapa: Etapa): void {
        if (confirm('Deseja excluir etapa?')) {
            this.receita.etapas.splice(this.receita.etapas.indexOf(etapa), 1)
        }
    }

    excluirPasso(passo: Passo, etapa: Etapa) {
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
