import { Component, OnInit } from '@angular/core';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
    selector: 'painel-de-controle-component',
    templateUrl: 'painel-de-controle.component.html'
})

export class PainelDeControleComponent implements OnInit {

    public cropperSettings: CropperSettings;

    public img: any;

    constructor() {
        this.preparaCropper()
    }

    ngOnInit() { }

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
}