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
import { Router } from '@angular/router';

@Component({
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

    private exibirReceita: boolean = false;

    cropperSettings: CropperSettings;

    img: any = {}

    private allIngredientes: Ingrediente[];

    private etapaEdited: Etapa;
    private passoEdited: Passo;
    private ingrEdited: IngredienteReceita;

    private categorias: Categoria[] = [];
    private medidas: Medida[];
    private ingredientes: IngredienteReceita[] = [];

    @Input()
    private receita: Receita;

    private ingredienteCad: IngredienteReceita;

    private alertIngrediente: boolean = false;


    @ViewChild('wizardPublicar') wizard: Wizard;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    @Input()
    _open;

    constructor(
        private receitaService: ReceitaService,
        private ingredientesService: IngredienteService,
        private categoriaService: CategoriaService,
        private session: SessionService,
        private medidaService: MedidaService,
        private alert: AlertService,
        private router: Router
    ) {
        this.preparaCropper()
        this.ingredienteCad = new IngredienteReceita()
        this.carregarCampos()
    }

    ngOnInit() {
    }

    customCompareCategoria(o1: Categoria, o2: Categoria) {
        try {
            return o1.id == o2.id;
        } catch (error) {
            return false;
        }
    }

    preparaCropper() {
        this.img = {}
        this.cropperSettings = new CropperSettings();
        var width = 350
        var height = 250
        this.cropperSettings.width = width;
        this.cropperSettings.height = height;
        this.cropperSettings.croppedWidth = width;
        this.cropperSettings.croppedHeight = height;
        this.cropperSettings.canvasWidth = width;
        this.cropperSettings.canvasHeight = height;
    }

    convertImage() {
        let img = this.img.image;
        this.receita.imagem = img;
    }



    loadImage() {
        console.log('loadImage')
        let base64 = this.receita.imagem;
        let image = new Image();
        image.src = base64;
        this.cropper.setImage(image)
    }

    proximaPagina() {
        this.loadImage()
        this.wizard.next()
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

    atualizarReceita(): void {
        if (this.validationStepFour()) {
            this.loading = true;
            if (this.img.image) {
                this.receita.imagem = this.img.image;
            }

            this.receitaService.atualizar(this.receita)
                .then(data => {
                    this.receita = data;
                    console.log(this.receita)
                    this.alert.info("Receita atualizada!")
                }, error => {
                    this.alert.error("Falha ao atualizar Receita!")
                    return;
                })

            this.loading = false;
            this.wizard.reset()
        }
    }


    publicarReceita(): void {
        if (this.validationStepFour()) {
            this.loading = true;
            if (this.img.image) {
                this.receita.imagem = this.img.image;
            }

            this.receitaService.cadastrar(this.receita)
                .then(data => {
                    console.log(data)
                    this.receita = data;
                    this.alert.info("Receita cadastrada!")
                    this.router.navigate(['/receita', data.id]);
                    this.loading = false;
                    this.wizard.reset()
                }, error => {
                    this.alert.error("Falha ao publicar Receita!")
                })

        }
    }

    autocompleListFormatter = (data: any) => {
        return data.nome;
    }

    public open() {
        this.wizard.open()
    }

    public close() {
        this.wizard.close()
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

    detailMedida(medida: string): Medida {
        for (let med of this.medidas) {
            if (med.name == medida) {
                return med;
            }
        }
        return null;
    }

    adicionarIngrediente() {

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

    carregarCampos() {
        this.getCategorias();
        this.getIngredientes();
        this.getMedidas();
        if (this.receita) {
            this.loadImage()
        }
    }


    public getIngredientes() {
        this.ingredientesService.list()
            .then(data => {
                this.allIngredientes = data;
                this.allIngredientes.sort(function (a, b) {
                    return a.nome.localeCompare(b.nome);
                });
            }, error => {
                this.alert.error("Falha ao carregar Ingredientes!")
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

    public validarCarregamento() {
        return this.categorias && this.ingredientes && this.medidas;
    }

    public getCategorias() {
        this.categoriaService.list()
            .then(data => {
                this.categorias = _.orderBy(data, ['nome'], ['asc']);
            }, error => {
            })
    }

    public getMedidas() {
        this.medidaService.list()
            .then(data => {
                this.medidas = _.orderBy(data, ['desc'], ['asc']);
            }, error => {
            })
    }

}
