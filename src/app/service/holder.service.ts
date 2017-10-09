import { Injectable } from '@angular/core';
import { Alert } from 'app/viewmodel/template/alert';

@Injectable()
export class HolderService {

    //Modal de login
    public modalOpen: boolean = false; //Abrir modal...
    
    //true aparece o 'X' false irá esconder o 'X'
    public modalIsCloseable: boolean = false;

    //Usuário se logado
    public userLogado: boolean = false;

    //Mostra qual subnav está ativo    
    public qualSubnavEstaAtivo: string;

    // Comportamento do Alert App Level
    public alert: Alert;

    constructor() {
        this.alert = new Alert("")
     }

}