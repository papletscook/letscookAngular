import { HolderService } from './../util/holder/holder.service';
import { ValidLoginService } from './../util/login/valid-login.service';
import { Usuario } from './../viewmodel/login/usuario';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [LoginService]
})

export class LoginComponent implements OnInit {

    public usuario = new Usuario();

    public erroLogar: boolean = false;
    public erroMensagem: string;

    constructor(private router: Router,
        private loginService: LoginService,
        private validLoginService: ValidLoginService,
        public holderService: HolderService) { }

    ngOnInit(): void {
        this.usuario.email = "nome@mail.com";
        this.usuario.senha = "123";
        this.validLoginService.isLogado().then((result: boolean) => {
            if (result) {
                this.holderService.userLogado = true;
                // this.router.navigate(['./letscook/']);
            }
        })
    }

    public entrar() {
        this.loginService
            .getUsuario(this.usuario)
            .then(data => {
                if (data) {
                    this.holderService.userLogado = true;
                    sessionStorage.setItem('user', this.usuario.email);
                    //this.router.navigate(['./letscook/']);
                } else {
                    this.erroLogar = true;
                    this.erroMensagem = "Usuário ou senha incorretos, por favor verifique."
                }
            }, error => {
                this.erroLogar = true;
                this.erroMensagem = error.json().message;
            });
    }

    public entrarInMock() {
        if (this.loginService.validInMock(this.usuario)) {
            this.holderService.userLogado = true;
            sessionStorage.setItem("user", JSON.stringify({ email: this.usuario.email }));
            this.holderService.modalOpen = false;
            //Fazer nagivate para a pagina que o usuario clicou....
            //this.router.navigate(['./letscook/']);
        } else {
            this.erroLogar = true;
            this.erroMensagem = "Usuário ou senha incorretos, por favor verifique."
        }
    }



}