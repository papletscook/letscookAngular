export class Passo {
    id?: number;
    ordem?: number;
    checked?: boolean = false;
    done?: boolean = false;
    dica?: string;
    minPasso?: number;
    
    constructor(public descricao: string) { }

}
