import { UserFull } from './../login/userFull';
import { IngredienteDespensa } from 'app/viewmodel/template/despensa/ingrediente-despensa';
export class Despensa {
    id: number;
    dono: UserFull;
    ings: IngredienteDespensa[];
}