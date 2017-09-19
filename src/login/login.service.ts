import { InfoRequest } from './../viewmodel/url-service/info-request';
import { UrlServiceService } from './../util/url-service/url.service';
import { User } from './../viewmodel/login/mock';
import { LoginUsuario } from './../viewmodel/login/login';
import { Usuario } from './../viewmodel/login/usuario';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    private infoResquest: InfoRequest;

    constructor(private urlServiceService: UrlServiceService) { }

    public loga(usuario: Usuario): Promise<Boolean> {
        let user = new LoginUsuario(usuario.email, usuario.senha);
        this.infoResquest = {
            rqst: "post",
            command: this.urlServiceService.pathLetsCook + "usuario/verificarCredencial/",
            timeout: 5000,
            _data: user
        }
        return this.urlServiceService.request(this.infoResquest)
            .then(data => {
                return data as Boolean
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