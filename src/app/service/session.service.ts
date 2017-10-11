import { LoginService } from './login.service';
import { Usuario } from './../viewmodel/template/login/usuario';
import { Injectable } from '@angular/core';
import { Alert } from 'app/viewmodel/template/alert';

@Injectable()
export class SessionService {

    private usuario: Usuario = null;

    constructor(private login: LoginService) {
    }

    public definirUsuario(user: Usuario): void {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    public isLogado(): Promise<boolean> {
        if (this.consultarUsuario()) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    public consultarUsuario(): Usuario {
        try {
            let sessionObj = JSON.parse(sessionStorage.getItem("user"));
            console.log(sessionObj)
            return sessionObj;
        } catch (error) {
            return null;
        }
    }

    public deslogar() {
        sessionStorage.clear();
    }


}