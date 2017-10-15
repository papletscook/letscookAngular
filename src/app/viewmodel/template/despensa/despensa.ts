import { Ingrediente } from './../receita/ingrediente';
import { UserFull } from './../login/userFull';
export class Despensa {
    id: number;
    dono: UserFull;
    ings: [
        {
            id?: number;
            ingrediente: Ingrediente;
        }
    ]
}