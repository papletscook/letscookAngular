import { GenericService } from 'menu-receita/services/generic.service';
import { Injectable } from '@angular/core';
import { Ingrediente } from 'viewmodel/receita/ingrediente';
import { InfoRequest } from 'viewmodel/url-service/info-request';
import { UrlServiceService } from 'util/url-service/url.service';

@Injectable()
export class IngredienteService extends GenericService implements Service<Ingrediente> {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService) {
        super();
    }

    public list(): Promise<Ingrediente[]> {
        this.infoRequest = {
            rqst: 'get', command: this.urlServiceService.pathLetsCook + 'ingrediente/list', timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Ingrediente[]
            })
            .catch(this.handleError);
    }



}
