import { ComentarioReceita } from './../../../../viewmodel/template/receita/comentario';
import { UrlServiceService } from 'app/service/url.service';

import { GenericService } from 'app/service/generic.service';
import { Injectable } from '@angular/core';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { Medida } from 'app/viewmodel/template/receita/medida';
import { SessionService } from 'app/service/session.service';


@Injectable()
export class ComentarioService extends GenericService implements Service<ComentarioReceita> {


    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService,
        private session: SessionService) {
        super();
    }


    public list(): Promise<ComentarioReceita[]> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'unidadeMedida/list', timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Medida[]
            })
            .catch(this.handleError);
    }


    public cadastrar(t: ComentarioReceita): Promise<ComentarioReceita> {
        t.usuario = this.session.consultarUsuario();
        console.log(t)
        this.infoRequest = {
            rqst: 'post', 
            command: this.urlServiceService.pathLetsCook + 'receita/comentar',
            _data: t
        };
        
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as ComentarioReceita[]
            })
            .catch(this.handleError);
    }


}
