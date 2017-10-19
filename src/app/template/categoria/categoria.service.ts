import { Categoria } from './../../viewmodel/template/receita/categoria';
import { Injectable } from '@angular/core';
import { GenericService } from 'app/service/generic.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { UrlServiceService } from 'app/service/url.service';


@Injectable()
export class CategoriaService extends GenericService implements Service<Categoria> {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService) {
        super();
    }

    public list(): Promise<Categoria[]> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'categoriaReceita', timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Categoria[]
            })
            .catch(this.handleError);
    }

    public cadastrar(categoria: Categoria) {
        this.infoRequest = {
            rqst: "post",
            command: this.urlServiceService.pathLetsCook + "categoriaReceita",
            timeout: 6000,
            _data: categoria
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Categoria;
            })
            .catch(this.handleError);
    }

    public deletar(categoria: Categoria) {
        this.infoRequest = {
            rqst: "delete",
            command: this.urlServiceService.pathLetsCook + "categoriaReceita/",
            timeout: 6000,
            _data: categoria.id
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Categoria[];
            })
            .catch(this.handleError);
    }


}
