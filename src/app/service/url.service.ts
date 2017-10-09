import { InfoRequest } from 'app/viewmodel/url-service/info-request';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class UrlServiceService {

    // IPs
    private urlIp = 'http://localhost:8080/'; // PC-Rato

    // Path names
    public pathLetsCook = 'letscookAPI/';

    // Request Options *Não Mecher*
    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    public url = this.urlIp;

    constructor(private http: Http) { }

    public request(infoRequest: InfoRequest) {
        // Verifica se url é outra
        this.hOtherUrl(infoRequest.otherUrl);
        switch (infoRequest.rqst) {
            case 'get':
                return this.httpGetRequest(infoRequest);
            case 'post':
                return this.httpPostRequest(infoRequest);
        }
    }

    private httpPostRequest(infoResquest: InfoRequest) {
        const url = `${this.url}` + infoResquest.command;
        return this.http.post(url, JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(this.handleError);
    }

    private httpGetRequest(infoResquest: InfoRequest) {
        let rstlink;
        if (infoResquest._data) {
            rstlink = infoResquest.command + infoResquest._data;
        } else {
            rstlink = infoResquest.command;
        }
        const url = `${this.url}` + rstlink;
        return this.http.get(url, this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(this.handleError);
    }

    private hOtherUrl(l) {
        if (l) {
            this.url = l;
        }
    }

    public handleError(error: any): Promise<any> {
        let er: any;
        if (error.message === 'Timeout has occurred') {
            er = {
                tError: 'Timeout',
                mError: 'Tempo de busca excedido, por favor realize a busca novamente...'
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: '',
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}
