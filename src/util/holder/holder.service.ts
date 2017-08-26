import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    public modalOpen: boolean = false;
    public userLogado: boolean = false;
    public qualSubnavEstaAtivo: string;

    constructor() { }

}