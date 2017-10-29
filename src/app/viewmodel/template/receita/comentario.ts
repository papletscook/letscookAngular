import { Receita } from 'app/viewmodel/template/receita/receita';
import { UserFull } from 'app/viewmodel/template/login/userFull';
export class ComentarioReceita {
    conteudo: string;
    dataComentario: Date;
    receita : Receita;
    usuario: UserFull;
}
