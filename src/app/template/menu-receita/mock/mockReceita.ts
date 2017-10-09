import { Receita } from "app/viewmodel/template/receita/receita";


export const MockReceita: Receita = {
    nome: 'Nega Maluca',
    descricao: 'Descrição',
    categoria:  {id: 4, nome: "Carnes"},
    status: null,
    ingts: [],
    etapas: [{
        nome: 'Etapa 1',
        passos: [
            { nome: 'Passo 1' }
        ]
    }, {
        nome: 'COBERTURA',
        passos: [
            { nome: 'Em uma panela, leve todos os ingredientes ao fogo até levantar fervura' },
            { nome: 'Despeje ainda quente em cima do bolo' }
        ]
    }
    ],
    minsPreparo: 40,
    foto: 'string',
    criador: null
}
