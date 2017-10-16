import { UrlServiceService } from 'app/service/url.service';
import { InfoRequest } from './../../viewmodel/url-service/info-request';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Usuario } from 'app/viewmodel/template/login/usuario';
import { LoginUsuario } from 'app/viewmodel/template/login/login';
import { User } from 'app/viewmodel/template/login/mock';

@Injectable()
export class LoginService {

    private infoRequest: InfoRequest;

    constructor(private urlServiceService: UrlServiceService) { }

    public loga(usuario: Usuario): Promise<Boolean> {
        let user = new LoginUsuario(usuario.email, usuario.senha);
        this.infoRequest = {
            rqst: "post",
            command: this.urlServiceService.pathLetsCook + "usuario/verificarCredencial/",
            timeout: 5000,
            _data: user
        }
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Boolean
            })
            .catch(this.handleError);
    }

    public consultar(usuario: Usuario): Promise<Usuario> {
        this.infoRequest = {
            rqst: 'post', command: this.urlServiceService.pathLetsCook + 'usuario/findByEmail', timeout: 6000,
            _data: { email: usuario.email }
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Usuario[]
            })
            .catch(this.handleError);
    }

    public validInMock(usuario: Usuario): Boolean {
        let valided: boolean = false;
        if (usuario.email === User.email && usuario.senha === User.senha) {
            valided = true;
        }
        return valided;

    }


    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}