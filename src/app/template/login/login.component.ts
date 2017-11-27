import { TemplateComponent } from 'app/template/template.component';
import { LoginService } from './login.service';
import { SessionService } from './../../service/session.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HolderService } from 'app/service/holder.service';
import { Usuario } from 'app/viewmodel/template/login/usuario';


@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [LoginService, SessionService]
})

export class LoginComponent implements OnInit {

    public usuario = new Usuario();

    public erroLogar: boolean = false;
    public erroMensagem: string;

    constructor(private router: Router,
        private loginService: LoginService,
        private session: SessionService,
        public holderService: HolderService,
        public templateComponent: TemplateComponent) { }

    public ngOnInit(): void {
        this.usuario.email = "admin@letscook.com";
        this.usuario.senha = "dev";
        this.session.isLogado().then((result: boolean) => {
            this.holderService.userLogado = result;
        })
    }

    public entrar() {
        this.loginService.loga(this.usuario)
            .then(data => {                
                if (data) {
                    this.holderService.userLogado = true;
                    this.loginService
                        .consultar(this.usuario)
                        .then(data => {                            
                            this.session.definirUsuario(data);
                            //location.reload();
                        })
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

    //Mock so use se nao estiver binbando backend...
    public entrarInMock() {
        if (this.loginService.validInMock(this.usuario)) {
            this.holderService.userLogado = true;
            this.session.definirUsuario(this.usuario)
            this.holderService.modalOpen = false;
        } else {
            this.erroLogar = true;
            this.erroMensagem = "Usuário ou senha incorretos, por favor verifique."
        }
    }

    private registrar() {
        this.templateComponent.abrirComponentesGenericoDaIndex("RegistroComponent");
        this.holderService.modalOpen = false;
    }

}