import { SessionService } from './../../service/session.service';
import { AlertService } from './../../service/alert.service';
import { PainelDeControleService } from './painel-de-controle.service';
import { UserFull } from './../../viewmodel/template/login/userFull';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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

    private modificandoUsuario: boolean = false;
    private btnNameModificandoUsuario: string = "Atualizar";

    constructor(
        private painelDeControleService: PainelDeControleService,
        public alertService: AlertService,
        private sessionService: SessionService) {
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

        this.modificandoUsuario = true;
        this.btnNameModificandoUsuario = "Aguarde...";
        // Ve se password foi modificado....
        if (this.passwordChangeOld || this.passwordChangeOne || this.passwordChangeTwo) {
            this.veSePasswordConfere();
        }

        this.painelDeControleService
            .modificaUsuario(this.userFull)
            .then(data => {
                this.userFull = data;
                this.sessionService.definirUsuario(data);
                this.modificandoUsuario = false;
                this.btnNameModificandoUsuario = "Atualizar";
                this.alertService.info("Dados Atualizados com sucesso...");
            }, error => {
                this.alertService.error(error.message)
                this.modificandoUsuario = false;
                this.btnNameModificandoUsuario = "Atualizar";
            });
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
            if (this.passwordChangeOne === this.passwordChangeTwo) {
                this.userFull.senha = Md5.hashAsciiStr(this.passwordChangeOld).toString();
            } else {
                this.alertService.error("Senhas digitadas não conferem.");
                this.passwordChangeOne = "";
                this.passwordChangeTwo = "";
                this.passwordChangeNPreenchido = true;
            }
        } else {
            this.alertService.error("Senha antiga não confere.");
            this.passwordChangeOld = "";
            this.passwordChangeNPreenchido = true;
        }
    }

    private formatDataNasc() {
        this.userFull.dataNasc = new Date(this.dataNascimento).getTime() / 1000;
    }

}