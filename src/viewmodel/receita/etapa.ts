import { Passo } from './passo';
export class Etapa {
    id?: number;
    nome: string;
    passos: Passo[] = [];
    ordem?: number;
}
