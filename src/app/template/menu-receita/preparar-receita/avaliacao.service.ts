import { SessionService } from 'app/service/session.service';
import { AvaliacaoReceita } from './../../../viewmodel/template/receita/avaliacao';

import { Injectable } from '@angular/core';
import { GenericService } from 'app/service/generic.service';
import { UrlServiceService } from 'app/service/url.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';


@Injectable()
export class AvaliacaoService extends GenericService implements CrudService<AvaliacaoReceita> {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService,
        private session: SessionService) {
        super();
    }


    public list(): Promise<AvaliacaoReceita[]> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'categoriaReceita/list', timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as AvaliacaoReceita[]
            })
            .catch(this.handleError);
    }

    public cadastrar(t: AvaliacaoReceita): Promise<AvaliacaoReceita> {
        t.usuario = this.session.consultarUsuario();
        console.log(t)
        this.infoRequest = {
            rqst: 'post', command: this.urlServiceService.pathLetsCook + 'receita/avaliar', timeout: 6000,
            _data: t
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as AvaliacaoReceita[]
            })
            .catch(this.handleError);
    }

    getById(t: AvaliacaoReceita): Promise<AvaliacaoReceita> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'receita/' + t, timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as AvaliacaoReceita[]
            })
            .catch(this.handleError);
    }


    public atualizar(t: AvaliacaoReceita): Promise<AvaliacaoReceita> {
        this.infoRequest = {
            rqst: 'put', command: this.urlServiceService.pathLetsCook + 'receita', timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as AvaliacaoReceita[]
            })
            .catch(this.handleError);
    }

}
