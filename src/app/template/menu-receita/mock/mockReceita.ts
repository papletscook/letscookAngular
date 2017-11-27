import { Receita } from "app/viewmodel/template/receita/receita";


export const MockReceita: Receita = {
    nome: 'Nega Maluca',
    descricao: 'Descrição',
    categoria: null,
    status: null,
    ingts: [],
    etapas: [{
        nome: 'Etapa 1',
        passos: [
            { descricao: 'Passo 1' }
        ]
    }, {
        nome: 'COBERTURA',
        passos: [
            { descricao: 'Em uma panela, leve todos os ingredientes ao fogo até levantar fervura' },
            { descricao: 'Despeje ainda quente em cima do bolo' }
        ]
    }
    ],
    minsPreparo: 40,
    imagem: 'string',
    criador: null,
    avaliacoes: [],
    comentarios: [],
    rating: 5
}
