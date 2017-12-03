import { UserFull } from './../login/userFull';
import { IngredienteDespensa } from 'app/viewmodel/template/despensa/ingrediente-despensa';
import { Ingrediente } from 'app/viewmodel/template/receita/ingrediente';
export class ItemLista {
    id: number;
    nome: string;
    checked?: boolean = false;
    ingrediente : Ingrediente;
}