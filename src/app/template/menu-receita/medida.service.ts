import { UrlServiceService } from 'app/service/url.service';

import { GenericService } from 'app/service/generic.service';
import { Injectable } from '@angular/core';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { Medida } from 'app/viewmodel/template/receita/medida';


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
                data.sort(function (a, b) {
                    return a.desc.localeCompare(b.desc);
                });
                return data as Medida[]
            })
            .catch(this.handleError);
    }


}
