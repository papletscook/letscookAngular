import { Despensa } from './../viewmodel/template/despensa/despensa';
import { GenericService } from 'app/service/generic.service';
import { UrlServiceService } from 'app/service/url.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { Injectable } from '@angular/core';

@Injectable()
export class DespensaService extends GenericService {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService) {
        super();
    }

    public buscarPorUsuario() {
        let sessionObjUser = JSON.parse(sessionStorage.getItem("user"));
        this.infoRequest = {
            rqst: 'post', command: this.urlServiceService.pathLetsCook + 'despensa/buscarPorUsuario', timeout: 6000, _data: sessionObjUser
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Despensa
            })
            .catch(this.handleError);
    }

}