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
}