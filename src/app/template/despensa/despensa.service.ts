import { Despensa } from './../../viewmodel/template/despensa/despensa';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { GenericService } from 'app/service/generic.service';
import { UrlServiceService } from 'app/service/url.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { Injectable } from '@angular/core';
import { ScoreReceita } from 'app/viewmodel/template/despensa/score-receita';

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

    public buscarPorIngredientes(ingts: Ingrediente[]) {
        let data = ingts;
        this.infoRequest = {
            rqst: 'post', command: this.urlServiceService.pathLetsCook + 'despensa/buscarPorIngredientes', timeout: 6000, _data: data
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as ScoreReceita[]
            })
            .catch(this.handleError);
    }

    public atualizarDespensa(despensa: Despensa) {
        this.infoRequest = {
            rqst: 'put', command: this.urlServiceService.pathLetsCook + 'despensa', timeout: 6000, _data: despensa
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Despensa
            })
            .catch(this.handleError);
    }

}