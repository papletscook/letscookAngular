import { Etapa } from './etapa';
import { Usuario } from './../login/usuario';
import { IngredienteReceita } from './ingredienteReceita';
import { Categoria } from './categoria';
export class Receita {
    id?: number;
    nome: string;
    descricao: string;
    categoria: Categoria;
    status: string;
    ingts: IngredienteReceita[]= [];
    etapas: Etapa[]= [];
    minsPreparo: number;
    foto: string;
    criador: Usuario;
}
