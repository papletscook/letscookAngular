import { Medida } from './medida';
import { Ingrediente } from './ingrediente';
export class IngredienteReceita {
    id?: number;
    ingrediente: Ingrediente = null;
    uMedida: string = null;
    quant?: number = 1;
}
