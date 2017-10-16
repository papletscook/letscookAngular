import { PainelDeControleService } from './painel-de-controle.service';
import { UserFull } from './../../viewmodel/template/login/userFull';
import { Component, OnInit } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'painel-de-controle-component',
    templateUrl: 'painel-de-controle.component.html',
    styleUrls: ['painel-de-controle.component.css'],
    providers: [PainelDeControleService]
})

export class PainelDeControleComponent implements OnInit {

    public userFull: UserFull;

    private passwordChangeOld: string;
    private passwordChangeOne: string;
    private passwordChangeTwo: string;

    private passwordChangeNPreenchido: boolean = false;

    public dataNascimento: string;

    private base64Image: string = "";

    constructor(private painelDeControleService: PainelDeControleService) {
    }

    public ngOnInit() {
        this.getUserInfos();
    }

    public getUserInfos() {
        let sessionObj = JSON.parse(sessionStorage.getItem("user"));
        this.userFull = sessionObj;
        this.dataNascimento = this.userFull.dataNasc.toString();
    }


    public modificaUsuario() {
        console.log(this.userFull);
        // Ve se password foi modificado....
        if (this.passwordChangeOld || this.passwordChangeOne || this.passwordChangeTwo) {
            this.veSePasswordConfere();
        }
        this.painelDeControleService
            .modificaUsuario(this.userFull)
            .then(data => {
                this.userFull = data;
            }, error => {
                console.log("Erro ao modificar...");
            })
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
        this.base64Image = btoa(binaryString);
        this.userFull.imagem = "data:image/jpeg;base64," + this.base64Image;
    }

    private veSePasswordConfere() {
        if (Md5.hashAsciiStr(this.passwordChangeOld).toString() === this.userFull.senha) {
            console.log("Senha antiga Ok.");
            if (this.passwordChangeOne === this.passwordChangeTwo) {
                console.log("Modificar Password.");
            } else {
                console.log("Senhas digitadas não conferem.");
                this.passwordChangeOne = "";
                this.passwordChangeTwo = "";
                this.passwordChangeNPreenchido = true;
            }
        } else {
            console.log("Senha antiga não confere.");
            this.passwordChangeOld = "";
            this.passwordChangeNPreenchido = true;
        }
    }

}