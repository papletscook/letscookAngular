import { AvaliacaoReceita } from './avaliacao';
import { Etapa } from './etapa';
import { Usuario } from './../login/usuario';
import { IngredienteReceita } from './ingredienteReceita';
import { Categoria } from './categoria';
import { ComentarioReceita } from 'app/viewmodel/template/receita/comentario';

export class Receita {
    id?: number;
    nome: string;
    descricao: string;
    categoria: Categoria;
    status: string;
    ingts: IngredienteReceita[] = [];
    etapas: Etapa[]= [];
    minsPreparo: number;
    foto: string;
    criador: Usuario;
    avaliacoes: AvaliacaoReceita[] = [];
    comentarios: ComentarioReceita[] = [];
    
    constructor() {
        this.nome = ''
        this.descricao = ''
        this.categoria = null;
        this.categoria = null;
        this.ingts = Array<IngredienteReceita>();
    }
}
