import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Usuario } from '../viewmodel/usuario';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class LoginService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private endpoint = 'http://localhost:8080/letscookAPI/usuario/';  // URL to web api

    constructor(private http: Http) { }

    getUsuario(usuario: Usuario): Promise<Boolean> {
        const url = `${this.endpoint}` + "verificarCredencial";
        usuario.senha = Md5.hashAsciiStr(usuario.senhaView).toString();

        usuario.senhaView = null;

        return this.http.post(url, JSON.stringify(usuario), this.options)
            .toPromise()
            .then(response => {
                return response.json() as Boolean
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}