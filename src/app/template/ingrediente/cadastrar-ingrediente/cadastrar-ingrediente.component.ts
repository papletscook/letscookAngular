import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { AlertService } from 'app/service/alert.service';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { PublicarReceitaComponent } from 'app/template/menu-receita/publicar-receita/publicar-receita.component';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { Usuario } from './../../../viewmodel/template/login/usuario';
import { SessionService } from './../../../service/session.service';
import { PrepararReceitaComponent } from 'app/template/menu-receita/preparar-receita/preparar-receita.component';
import { ComponentInfo } from './../../../viewmodel/template/componentInfo';
import { IngredienteService } from 'app/service/ingrediente.service';
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
    providers: [
        IngredienteService, AlertService
    ]
})


export class CadastrarIngredienteComponent implements OnInit {

    private loading: boolean = false;

    private ingrediente: Ingrediente = new Ingrediente();

    cropperSettings: CropperSettings;
    img: any;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;


    constructor(private service: IngredienteService,
        private alert: AlertService) {
        this.preparaCropper()
    }

    ngOnInit() {
    }


    preparaCropper() {
        this.img = {}
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
    }

    public validation(): boolean {
        if (this.ingrediente.foto
            && this.ingrediente.nome) {
            return true;
        }
        return false;
    }



    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
            that.ingrediente.foto = image.src;
        };
        myReader.readAsDataURL(file);
    }

    abort() {
        this.ingrediente = new Ingrediente();
    }

    private cadastrarIngrediente() {
        if (this.validation()) {
            this.service.cadastrar(this.ingrediente).then(data => {
                this.ingrediente = data;
                this.loading = false;
                this.alert.info('Ingrediente ' + this.ingrediente.nome + ' cadastrado!');
                this.ingrediente = new Ingrediente();
            }, error => {
                this.alert.error('Ocorreu um erro ao cadastrar Ingrediente!');
            });
        }
    }

}
