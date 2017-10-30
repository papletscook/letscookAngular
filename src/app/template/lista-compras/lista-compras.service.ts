import { ListaCompra } from './../../viewmodel/template/lista/lista-compra';
import { SessionService } from './../../service/session.service';
import { Despensa } from './../../viewmodel/template/despensa/despensa';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
import { GenericService } from 'app/service/generic.service';
import { UrlServiceService } from 'app/service/url.service';
import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { Injectable } from '@angular/core';
import { ScoreReceita } from 'app/viewmodel/template/despensa/score-receita';



@Injectable()
export class ListaComprasService extends GenericService {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService,
        private session: SessionService) {
        super();
    }

    public cadastrarListaDeCompra(listaCompra: ListaCompra) {
        let sessionObj = JSON.parse(sessionStorage.getItem("user"));
        listaCompra.usuario = sessionObj;
        this.infoRequest = {
            rqst: "post",
            command: this.urlServiceService.pathLetsCook + "listaCompras/",
            timeout: 6000,
            _data: listaCompra
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as ListaCompra
            })
            .catch(this.handleError);
    }

    public buscarPorUsuario() {
        this.infoRequest = new InfoRequest();
        this.infoRequest.rqst = 'post';
        this.infoRequest.command = this.urlServiceService.pathLetsCook + 'listaCompras/buscarPorUsuario';
        this.infoRequest._data = this.session.consultarUsuario();
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as ListaCompra[]
            })
            .catch(this.handleError);
    }

    public atualizarListaDeCompra(listaCompra: ListaCompra) {
        let sessionObj = JSON.parse(sessionStorage.getItem("user"));
        listaCompra.usuario = sessionObj;
        this.infoRequest = {
            rqst: "put",
            command: this.urlServiceService.pathLetsCook + "listaCompras/",
            timeout: 6000,
            _data: listaCompra
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as ListaCompra
            })
            .catch(this.handleError);
    }

    public deletarListaDeCompras(listaCompra: ListaCompra) {
        this.infoRequest = {
            rqst: "delete",
            command: this.urlServiceService.pathLetsCook + "listaCompras/",
            timeout: 6000,
            _data: listaCompra.id
        };
        return this.urlServiceService.request(this.infoRequest)
            .catch(this.handleError);
    }

}