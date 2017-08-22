import { Md5 } from 'ts-md5/dist/md5';

export class LoginUsuario {
    email: string;
    senha: string;

    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = Md5.hashAsciiStr(senha).toString();
    }
}