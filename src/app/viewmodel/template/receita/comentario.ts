import { Receita } from 'app/viewmodel/template/receita/receita';
import { Usuario } from './../login/usuario';
export class ComentarioReceita {
    conteudo: string;
    dataComentario: Date;
    receita : Receita;
    usuario: Usuario;
}
