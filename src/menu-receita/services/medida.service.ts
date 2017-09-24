import { Medida } from './../../viewmodel/receita/medida';
import { Categoria } from './../../viewmodel/receita/categoria';
import { InfoRequest } from './../../viewmodel/url-service/info-request';
import { UrlServiceService } from './../../util/url-service/url.service';
import { Injectable } from '@angular/core';
import { GenericService } from 'menu-receita/services/generic.service';

@Injectable()
export class MedidaService extends GenericService implements Service<Medida> {


    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService) {
        super();
    }


    public list(): Promise<Medida[]> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'unidadeMedida/list', timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Medida[]
            })
            .catch(this.handleError);
    }


}
