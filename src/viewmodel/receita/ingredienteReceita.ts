import { Medida } from './medida';
import { Ingrediente } from './ingrediente';
export class IngredienteReceita {
    id: number;
    ingrediente: Ingrediente;
    uMedida: Medida;
    quant: number;
}
