import { IngredienteService } from './ingrediente.service';
import { state } from '@angular/animations';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { AlertService } from 'app/service/alert.service';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { PublicarReceitaComponent } from 'app/template/menu-receita/publicar-receita/publicar-receita.component';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Usuario } from './../../../viewmodel/template/login/usuario';
import { SessionService } from './../../../service/session.service';
import { PrepararReceitaComponent } from 'app/template/menu-receita/preparar-receita/preparar-receita.component';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { CategoriaService } from 'app/service/categoria.service';
import { MedidaService } from 'app/service/medida.service';
import { ReceitaService } from 'app/service/receita.service';
import { HolderService } from 'app/service/holder.service';
import { MockReceita } from 'app/template/menu-receita/mock/mockReceita';
import { ToastsManager } from 'ng2-toastr';
import { Medida } from 'app/viewmodel/template/receita/medida';



@Component({
    selector: 'cadastrar-ingrediente',
    templateUrl: 'cadastrar-ingrediente.component.html',
    styleUrls: ['cadastrar-ingrediente.component.css'],
    providers: [IngredienteService]
})


export class CadastrarIngredienteComponent implements OnInit {

    private loading: boolean = false;

    private ingrediente: Ingrediente = new Ingrediente();

    public cropperSettings: CropperSettings;
    public img: any;

    private showImg: boolean = false;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(private service: IngredienteService,
        private alert: AlertService) {
        this.preparaCropper()
    }

    public ngOnInit() {
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
            this.service.cadastrar(this.ingrediente).then(data => {
                console.log(data)
                this.loading = false;
                this.alert.info('Ingrediente ' + data.nome + ' cadastrado!');
                this.abort();
            }, error => {
                this.alert.error('Ocorreu um erro ao cadastrar Ingrediente!');
                this.abort();
            });
        }
    }

}
