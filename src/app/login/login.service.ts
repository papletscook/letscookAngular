import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Usuario } from '../viewmodel/usuario';
import { LoginUsuario } from '../viewmodel/login';

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

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}