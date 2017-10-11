import { IngredienteReceita } from './ingredienteReceita';
import { Ingrediente } from "app/viewmodel/template/receita/ingrediente";



export class IngredientePreparo extends IngredienteReceita {

    public checked: boolean = false;

    constructor(ing: IngredienteReceita) {
        super();
        this.id = ing.id;
        this.ingrediente = ing.ingrediente;
        this.uMedida = ing.uMedida;
        this.quant = ing.quant;
    }
}
