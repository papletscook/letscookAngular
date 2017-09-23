import { Categoria } from './../../viewmodel/receita/categoria';
import { InfoRequest } from './../../viewmodel/url-service/info-request';
import { UrlServiceService } from './../../util/url-service/url.service';
import { Injectable } from '@angular/core';
import { GenericService } from 'menu-receita/services/generic.service';

@Injectable()
export class CategoriaService extends GenericService implements Service<Categoria> {


    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService) {
        super();
    }


    public list(): Promise<Categoria[]> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'categoriaReceita/list', timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Categoria[]
            })
            .catch(this.handleError);
    }


}
