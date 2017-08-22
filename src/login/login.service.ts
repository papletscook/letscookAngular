import { User } from './../viewmodel/login/mock';
import { LoginUsuario } from './../viewmodel/login/login';
import { Usuario } from './../viewmodel/login/usuario';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private endpoint = 'http://localhost:8080/letscookAPI/usuario/';  // URL to web api

    constructor(private http: Http) { }

    getUsuario(usuario: Usuario): Promise<Boolean> {
        const url = `${this.endpoint}` + "verificarCredencial";

        let user = new LoginUsuario(usuario.email, usuario.senha);

        return this.http.post(url, JSON.stringify(user), this.options)
            .toPromise()
            .then(response => {
                return response.json() as Boolean
            }).catch(this.handleError);
    }

    public validInMock(usuario: Usuario): Boolean {
        let valided: boolean = false;
        if (usuario.email === User.email && usuario.senha === User.senha) {
            valided = true;
        }
        return valided;

    }


    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}