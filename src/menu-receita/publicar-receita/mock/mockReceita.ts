import { Categoria } from './../../../viewmodel/receita/categoria';
import { Receita } from 'viewmodel/receita/receita';

export const MockReceita: Receita = {
    nome: 'Nega Maluca',
    descricao: 'Descrição',
    categoria: null,
    status: null,
    ingts: null,
    etapas: [{
        nome: 'MASSA',
        passos: [
            { nome: 'Em um liquidificador, bata os ovos, o açúcar, o óleo, o achocolatado e a farinha de trigo' },
            { nome: 'Despeje a massa em uma tigela e adicione a água quente e o fermento, misturando bem            ' },
            { nome: 'Despeje a massa em uma forma untada e asse em forno médio-alto (200° C), preaquecido, por 40 minutos' },
            { nome: 'Desenforme ainda quente' }
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
