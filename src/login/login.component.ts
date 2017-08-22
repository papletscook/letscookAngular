import { ValidLoginService } from './../util/login/valid-login.service';
import { Usuario } from './../viewmodel/login/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';


@Component({
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
        private validLoginService: ValidLoginService) { }

    ngOnInit(): void {
        this.usuario.email;
        this.usuario.senha;

        this.validLoginService.isLogado().then((result: boolean) => {
            if (result) {
                this.router.navigate(['./letscook/']);
            }
        })
    }

    public entrar(): void {
        this.loginService
            .getUsuario(this.usuario)
            .then(data => {
                if (data) {
                    sessionStorage.setItem('user', this.usuario.email);
                    this.router.navigate(['./letscook/']);
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
            sessionStorage.setItem("user", JSON.stringify({email: this.usuario.email}));
            this.router.navigate(['./letscook/']);
        } else {
            this.erroLogar = true;
            this.erroMensagem = "Usuário ou senha incorretos, por favor verifique."
        }
    }

}