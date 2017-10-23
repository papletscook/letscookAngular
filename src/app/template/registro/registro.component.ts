import { Usuario } from 'app/viewmodel/template/login/usuario';
import { SessionService } from './../../service/session.service';
import { HolderService } from './../../service/holder.service';
import { LoginService } from './../login/login.service';
import { UserFull } from './../../viewmodel/template/login/userFull';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'registro-component',
    templateUrl: 'registro.component.html',
    styleUrls: ['registro.component.css']
})

export class RegistroComponent implements OnInit {

    public userFull = new UserFull();

    private usuario: Usuario;

    private dataNascimento: string;
    private senha: string;
    private senhatwo: string;

    private alertOn: boolean = false;
    private typealert: string;
    private messagealert: string;

    private registrando: boolean = false;

    constructor(
        private loginService: LoginService,
        private session: SessionService,
        public holderService: HolderService) { }

    public ngOnInit() {

    }

    private criarusuario() {
        console.log(this.userFull);
        this.registrando = true;
        this.loginService.criarusuario(this.userFull)
            .then(data => {
                this.holderService.userLogado = true;
                this.usuario.email = data.email;
                this.usuario.senha = data.senha;
                this.loginService.consultar(this.usuario).then(data => {
                    this.session.definirUsuario(data)
                });
                this.registrando = false;
                window.location.reload();
            }, error => {
                this.userFull = new UserFull();
                this.senha = null;
                this.senhatwo = null;
                this.dataNascimento = null;
                this.registrando = false;
            });
    }

    private formatDataNasc() {
        this.userFull.dataNasc = new Date(this.dataNascimento).getTime() / 1000;
    }

    private compareSenha() {
        if (this.senha != null && this.senhatwo != null) {
            if (this.senha === this.senhatwo) {
                this.userFull.senha = Md5.hashAsciiStr(this.senha).toString();
                this.alertOn = false;
            } else {
                this.alertOn = true;
                this.typealert = "alert-danger";
                this.messagealert = "Senhas não coincide"
            }
        }
    }

}