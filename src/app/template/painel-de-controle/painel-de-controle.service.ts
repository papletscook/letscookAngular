import { UserFull } from './../../viewmodel/template/login/userFull';
import { GenericService } from 'app/service/generic.service';
import { UrlServiceService } from './../../service/url.service';
import { InfoRequest } from './../../viewmodel/url-service/info-request';
import { Injectable } from '@angular/core';

@Injectable()
export class PainelDeControleService extends GenericService {

    private infoRequest: InfoRequest;

    constructor(
        private urlServiceService: UrlServiceService) {
        super();
    }

    public modificaUsuario(userFull: UserFull): Promise<UserFull> {
        this.infoRequest = {
            rqst: "put",
            command: this.urlServiceService.pathLetsCook + "usuario",
            timeout: 6000,
            _data: userFull
        };
        return this.urlServiceService.request(this.infoRequest)
            .then(data => {
                return data as UserFull
            })
            .catch(this.handleError);
    }
}