export class Passo {
    id?: number;
    ordem?: number;
    checked?: boolean = false;

    constructor(public descricao: string) { }

}
