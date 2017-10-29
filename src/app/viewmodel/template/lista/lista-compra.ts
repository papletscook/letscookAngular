import { UserFull } from 'app/viewmodel/template/login/userFull';
import { ItemLista } from 'app/viewmodel/template/lista/item-lista';
export class ListaCompra {
    id: number;
    nome: string;
    itens: ItemLista[];
    usuario?: UserFull;
}