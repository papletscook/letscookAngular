import { IngredienteService } from './../ingrediente.service';
import { state } from '@angular/animations';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { AlertService } from 'app/service/alert.service';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';


@Component({
    selector: 'cadastrar-ingrediente',
    templateUrl: 'cadastrar-ingrediente.component.html',
    styleUrls: ['cadastrar-ingrediente.component.css'],
    providers: [IngredienteService]
})


export class CadastrarIngredienteComponent implements OnInit {

    private loading: boolean = false;

    private ingrediente: Ingrediente = new Ingrediente();

    private ingredientes: Ingrediente[];

    public cropperSettings: CropperSettings;
    public img: any;

    private showImg: boolean = false;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(
        private ingredienteService: IngredienteService,
        private alertService: AlertService) {
        this.preparaCropper()
    }

    public ngOnInit() {
        this.listarIngredientes();
    }

    preparaCropper() {
        this.img = {}
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 350;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 350;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 350;
        this.cropperSettings.canvasHeight = 200;
    }

    public validation(): boolean {
        if (this.ingrediente.imagem
            && this.ingrediente.nome) {
            return true;
        }
        return false;
    }

    private fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
            that.ingrediente.imagem = image.src;
        };
        myReader.readAsDataURL(file);
        this.imageToBase64($event);
    }

    private imageToBase64(evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    private _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.img.image = "data:image/jpeg;base64," + btoa(binaryString);
        this.showImg = true;
    }

    private abort() {
        this.img = {}
        this.ingrediente = new Ingrediente();
    }

    private cadastrarIngrediente() {
        if (this.validation()) {
            this.loading = true;
            this.ingredienteService.cadastrar(this.ingrediente).then(data => {
                this.loading = false;
                this.alertService.info('Ingrediente ' + data.nome + ' cadastrado!');
                this.abort();
            }, error => {
                this.alertService.error('Ocorreu um erro ao cadastrar Ingrediente!');
                this.abort();
            });
        }
    }

    private listarIngredientes() {
        this.loading = true;
        this.ingredienteService.list()
            .then(data => {
                this.ingredientes = data;
                this.loading = false;
            }, error => {
                this.alertService.error("Ocorreu um erro ao buscar Ingredientes!");
                this.loading = false;
            })
    }

}
