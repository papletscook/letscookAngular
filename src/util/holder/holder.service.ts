import { Alert } from './../alert';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    //Modal de login
    public modalOpen: boolean = false; //Abrir modal...
    public modalIsCloseable: boolean = false; //true aparece o 'X' false irá esconder o 'X'

    //Usuário se logado
    public userLogado: boolean = false;

    //Mostra qual subnav está ativo    
    public qualSubnavEstaAtivo: string;

    // Comportamento do Alert App Level
    public alert: Alert;

    constructor() { }

}