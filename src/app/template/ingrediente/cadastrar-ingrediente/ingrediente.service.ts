import { Injectable } from '@angular/core';
import { GenericService } from 'app/service/generic.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { UrlServiceService } from 'app/service/url.service';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';


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


    public cadastrar(t: Ingrediente): Promise<Ingrediente> {
        console.log(t)
        this.infoRequest = {
            rqst: 'post', command: this.urlServiceService.pathLetsCook + 'ingrediente/', timeout: 60000,
            _data: t
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Ingrediente[]
            })
            .catch(this.handleError);
    }


}
