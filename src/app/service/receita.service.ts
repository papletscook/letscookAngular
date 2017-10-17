import { SessionService } from './session.service';

import { Injectable } from '@angular/core';
import { GenericService } from 'app/service/generic.service';
import { UrlServiceService } from 'app/service/url.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { Receita } from 'app/viewmodel/template/receita/receita';


@Injectable()
export class ReceitaService extends GenericService implements CrudService<Receita> {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService,
        private session: SessionService) {
        super();
    }


    public list(): Promise<Receita[]> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'categoriaReceita/list', timeout: 10000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Receita[]
            })
            .catch(this.handleError);
    }

    public cadastrar(t: Receita): Promise<Receita> {
        t.criador = this.session.consultarUsuario();
        console.log(t)

        this.infoRequest = {
            rqst: 'post', command: this.urlServiceService.pathLetsCook + 'receita', timeout: 60000,
            _data: t
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Receita[]
            })
            .catch(this.handleError);
    }

    getById(t: Receita): Promise<Receita> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'receita/' + t.id, timeout: 10000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Receita[]
            })
            .catch(this.handleError);
    }


    public atualizar(t: Receita): Promise<Receita> {
        this.infoRequest = {
            rqst: 'put', command: this.urlServiceService.pathLetsCook + 'receita', timeout: 20000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Receita[]
            })
            .catch(this.handleError);
    }

}
