import { Ingredientes } from './../../viewmodel/ingredientes/ingredientes';
import { InfoRequest } from './../../viewmodel/url-service/info-request';
import { UrlServiceService } from './../../util/url-service/url.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IngredientesService {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService) { }

    public getAllIngredientes(): Promise<Ingredientes[]> {
        this.infoRequest = {
            rqst: "get", command: this.urlServiceService.pathLetsCook + "ingrediente/list", timeout: 6000
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Ingredientes[]
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }


}