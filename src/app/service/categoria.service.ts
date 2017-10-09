import { Injectable } from '@angular/core';
import { GenericService } from 'app/service/generic.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { UrlServiceService } from 'app/service/url.service';
import { Categoria } from 'app/viewmodel/template/receita/categoria';


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


}
