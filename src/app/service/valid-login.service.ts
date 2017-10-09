import { Injectable } from '@angular/core';

@Injectable()
export class ValidLoginService {

    constructor() { }

    public isLogado(): Promise<boolean> {
        // Realizar correção verificação de login
        // Guardar Login e Senha do usuário e fazer comparação com a autenticação
        // Usuário pode bugar adicionando informações fake na sessionStorage
        let sessionObj = JSON.parse(sessionStorage.getItem("user"));
        if (typeof (Storage) !== "undefined" && sessionStorage.getItem('user')) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

}