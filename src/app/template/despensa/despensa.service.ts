import { SessionService } from './../../service/session.service';
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
        private urlServiceService: UrlServiceService,
        private session: SessionService) {
        super();
    }

    public buscarPorUsuario() {
        this.infoRequest = new InfoRequest();
        this.infoRequest.rqst = 'post';
        this.infoRequest.command = this.urlServiceService.pathLetsCook + 'despensa/buscarPorUsuario';
        this.infoRequest._data = this.session.consultarUsuario();

        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Despensa
            })
            .catch(this.handleError);
    }

    public buscarPorIngredientes(ingts: Ingrediente[]) {

        this.infoRequest = new InfoRequest();
        this.infoRequest.rqst = 'post';
        this.infoRequest.command = this.urlServiceService.pathLetsCook + 'despensa/buscarPorIngredientes';
        this.infoRequest._data = ingts;
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as ScoreReceita[]
            })
            .catch(this.handleError);
    }

    public atualizarDespensa(despensa: Despensa) {
        despensa.dono = this.session.consultarUsuario();
        this.infoRequest = new InfoRequest();
        this.infoRequest.rqst = 'put';
        this.infoRequest.command = this.urlServiceService.pathLetsCook + 'despensa';
        this.infoRequest._data = despensa;

        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as Despensa
            })
            .catch(this.handleError);
    }

}