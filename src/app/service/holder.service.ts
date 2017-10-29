import { MenuSubnav } from './../viewmodel/template/menu-subnav/menu-subnav';
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
    public qualMenuEstaAtivo: any;

    // Comportamento do Alert App Level
    public alert: Alert;

    public sideNav: boolean = false;
    public subNav: boolean = false;

    constructor() {
        this.alert = new Alert("")
    }

}