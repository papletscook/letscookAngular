import { AvaliacaoReceita } from './avaliacao';
import { Etapa } from './etapa';
import { Usuario } from './../login/usuario';
import { Categoria } from './categoria';
import { ComentarioReceita } from 'app/viewmodel/template/receita/comentario';
import { IngredienteReceita } from 'app/viewmodel/template/receita/ingrediente-receita';

export class Receita {
    id?: number;
    nome: string;
    descricao: string;
    categoria: Categoria;
    status: string;
    ingts: IngredienteReceita[] = [];
    etapas: Etapa[] = [];
    minsPreparo: number;
    imagem: string;
    criador: Usuario;
    avaliacoes: AvaliacaoReceita[] = [];
    comentarios: ComentarioReceita[] = [];
    rating: number;

    constructor() {
        this.nome = ''
        this.descricao = ''
        this.ingts = Array<IngredienteReceita>();
        let avas = this.avaliacoes;
        let sum = 0;
        for (let ava of avas) {
            sum += ava.valor;
        }
    }

}
