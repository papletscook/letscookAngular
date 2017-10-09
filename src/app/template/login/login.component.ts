
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';
import { ValidLoginService } from 'app/service/valid-login.service';
import { HolderService } from 'app/service/holder.service';
import { Usuario } from 'app/viewmodel/template/login/usuario';


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

    public ngOnInit(): void {
        this.usuario.email = "admin@letscook.com";
        this.usuario.senha = "dev";
        this.validLoginService.isLogado().then((result: boolean) => {
            if (result) {
                this.holderService.userLogado = true;
                // this.router.navigate(['./letscook/']);
            }
        })
    }

    public entrar() {
        this.loginService.loga(this.usuario)
            .then(data => {
                if (data) {
                    this.holderService.userLogado = true;
                    // Falta Montar cadastro do usuario
                    sessionStorage.setItem("user", JSON.stringify({ email: this.usuario.email }));
                    this.holderService.modalOpen = false;
                } else {
                    this.erroLogar = true;
                    this.usuario.senha = "";
                    this.erroMensagem = "Usuário ou senha incorretos, por favor verifique."
                }
            }, error => {
                this.erroLogar = true;
                this.erroMensagem = "Falha em nossos servidores! Tente novamente mais tarde.";
            })
    }

    //Mock so use se nao estiver binbando beckend...
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