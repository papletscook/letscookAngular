import { MedidaService } from './../medida.service';
import { ReceitaService } from './../receita.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { IngredienteService } from './../../ingrediente/ingrediente.service';
import { TemplateComponent } from 'app/template/template.component';
import { Receita } from './../../../viewmodel/template/receita/receita';
import { SessionService } from './../../../service/session.service';
import { HolderService } from 'app/service/holder.service';
import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MockReceita } from './../mock/mockReceita';
import { Wizard } from 'clarity-angular';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { Etapa } from 'app/viewmodel/template/receita/etapa';
import { Passo } from 'app/viewmodel/template/receita/passo';
import { Categoria } from 'app/viewmodel/template/receita/categoria';
import { Medida } from 'app/viewmodel/template/receita/medida';
import { IngredienteReceita } from 'app/viewmodel/template/receita/ingrediente-receita';
import { Alert } from 'app/viewmodel/template/alert';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { AlertService } from 'app/service/alert.service';
import * as _ from "lodash";

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css'],
    providers: [
        IngredienteService,
        CategoriaService,
        MedidaService,
        ReceitaService
    ],
})


export class PublicarReceitaComponent implements OnInit {

    private loading: boolean = false;

    cropperSettings: CropperSettings;

    img: any;

    private allIngredientes: Ingrediente[];

    private etapaEdited: Etapa;
    private passoEdited: Passo;
    private ingrEdited: IngredienteReceita;

    private categorias: Categoria[];
    private medidas: Medida[];
    private ingredientes: IngredienteReceita[] = [];

    @Input()
    private receita: Receita;

    private ingredienteCad: IngredienteReceita;

    private alertIngrediente: boolean = false;


    @ViewChild('wizard') wizard: Wizard;
    _open = true;

    constructor(
        private receitaService: ReceitaService,
        private ingredientesService: IngredienteService,
        private categoriaService: CategoriaService,
        private session: SessionService,
        private medidaService: MedidaService,
        private alert: AlertService
    ) {
        this.preparaCropper()
    }


    byId(item1: Categoria, item2: Categoria) {
        return item1.id === item2.id;
    }

    preparaCropper() {
        this.img = {}
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 350;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 350;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 350;
        this.cropperSettings.canvasHeight = 200;
    }

    convertImage() {
        let img = this.img.image;
        this.receita.imagem = img;
    }



    ngOnInit() {
        this.receita = new Receita();
        this.ingredienteCad = new IngredienteReceita();
        this.carregarCampos()
        // const r = new Receita();
        // // const r = MockReceita;
        // this.receita = r;
    }

    contaPalavras(str: string): number {
        try {
            if (str.length < 1) {
                throw "";
            }
            return str.length;
        } catch (error) {
            return 10;
        }
    }



    validationStepOne(): boolean {
        let r = this.receita;
        return (r.categoria != null && r.descricao != '' && r.nome != '');
    }

    validationStepTwo(): boolean {
        return this.receita.ingts.length > 0;
    }

    validationStepThree(): boolean {
        return this.receita.etapas.length > 0;
    }

    validationStepFour(): boolean {
        return this.img.image
    }


    publicarReceita(): void {
        if (this.validationStepFour()) {
            this.loading = true;
            if (this.img.image) {
                this.receita.imagem = this.img.image;
            }
            if (!this.receita.id) {
                console.log('cadastrar')
                this.receitaService.cadastrar(this.receita)
                    .then(data => {
                        this.receita = data;
                        // this.template.changeCase('VerReceitaComponent', { receita: this.receita })
                    }, error => {
                        this.alert.error("Falha ao publicar Receita!")
                    })
            } else {
                console.log('atualizar')
                this.receitaService.atualizar(this.receita)
                    .then(data => {
                        this.receita = data;
                    }, error => {
                        this.alert.error("Falha ao atualizar Receita!")
                    })
            }
            this.loading = false;
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

    excluirIngrediente(ingr: IngredienteReceita): void {
        this.receita.ingts.splice(this.receita.ingts.indexOf(ingr), 1)
    }

    excluirPasso(passo: Passo, etapa: Etapa) {
        etapa.passos.splice(etapa.passos.indexOf(passo), 1)
    }

    editarEtapa(etapa: Etapa): void {
        this.etapaEdited = etapa;
        this.passoEdited = null;
    }

    editarIngrediente(ingr: IngredienteReceita): void {
        this.ingrEdited = ingr;
    }

    salvarIngrediente(): void {
        if (this.ingrEdited.quant == 0) {
            this.excluirIngrediente(this.ingrEdited)
        }
        this.ingrEdited = null;
    }


    editarPasso(passo: Passo): void {
        this.passoEdited = passo;
        this.etapaEdited = null;
    }

    adicionarNovoPasso(etapa: Etapa): void {
        etapa.passos.push({ descricao: 'Novo Passo' });
    }

    salvarPasso(): void {
        this.passoEdited = null;
    }

    salvarEtapa(): void {
        this.etapaEdited = null;
    }

    private detailMedida(medida: string): Medida {
        for (let med of this.medidas) {
            if (med.name == medida) {
                return med;
            }
        }
        return null;
    }

    private adicionarIngrediente() {

        if (this.ingredienteCad.ingrediente &&
            this.ingredienteCad.uMedida &&
            this.ingredienteCad.quant) {

            let result = this.existeIngrediente(this.ingredienteCad, this.receita.ingts);
            console.log(result)
            if (!result) {
                this.receita.ingts.push(this.ingredienteCad);
                this.ingredienteCad = new IngredienteReceita();
                this.alertIngrediente = false;
            } else {
                this.alertIngrediente = true;
                return;
            }

        }
    }

    protected existeIngrediente(param: any, array: Array<any>): boolean {
        console.log(param)
        console.log(array)

        for (let element of array) {
            if (element.ingrediente.id == param.ingrediente.id) {
                console.log('e1 ' + element.ingrediente.id)
                console.log('p1 ' + param.ingrediente.id)
                return true;
            }
        }
        return false;
    }

    private limparIngrediente() {
        this.ingredienteCad = new IngredienteReceita();
    }

    protected carregarCampos() {
        this.getCategorias();
        this.getIngredientes();
        this.getMedidas();
    }

    changeListener($event): void {
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.receita.imagem = myReader.result;
        }
        myReader.readAsDataURL(file);
    }

    public getIngredientes() {
        this.ingredientesService.list()
            .then(data => {
                this.allIngredientes = _.orderBy(data, ['nome'], ['asc']);
            }, error => {

            });
    }

    public redefinirEtapas() {
        if (confirm('Deseja redefinir as Etapas?')) {
            this.receita.etapas = [];
            this.addNewEtapa();
        }

    }

    public addNewEtapa() {
        const et: Etapa = new Etapa();
        et.nome = 'Nova Etapa'
        const passos = [];
        passos.push({ descricao: 'Novo Passo' })
        et.passos = passos;
        this.receita.etapas.push(et);
    }

    public getCategorias() {
        if (!this.categorias) {
            this.categoriaService.list()
                .then(data => {
                    this.categorias = _.orderBy(data, ['nome'], ['asc']);
                }, error => {
                })
        }
    }

    public getMedidas() {
        if (!this.categorias) {
            this.medidaService.list()
                .then(data => {
                    this.medidas = _.orderBy(data, ['desc'], ['asc']);
                }, error => {
                })
        }
    }

}
