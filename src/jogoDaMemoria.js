class JogoDaMemoria {
    constructor({ tela }) {
        //Se passar como parâmetro, por exemplo, um obg = { tela: 1, idade: 2, nome: Lucas }
        //vai ser pegar só a propriedade tela e ignorar todo o resto
        this.tela = tela

        //Path sempre relativo ao index.html
        this.heroisIniciais = [
            { img: './arquivos/batman.png', nome: 'batman' },
            { img: './arquivos/ciclop.png', nome: 'ciclop' },
            { img: './arquivos/deadpool.png', nome: 'deadpool' },
            { img: './arquivos/mulhermaravilha.png', nome: 'mulhermaravilha' }
        ]
    }

    //Será utilizado a palavra chave "this", portanto não será possível trabalhar com a palavra chave "static" antes da função
    //As funções estáticas da classe Tela serão chamadas por meio do this.tela
    inicializar() {
        //Vai pegar todas as funções da classe Tela
        //coloca todos os heróis na tela
        this.tela.atualizarImagens(this.heroisIniciais)

        //Força a classe Tela a usar o THIS do contexto da classe do jogoDaMemoria, isso é feito por meio da função bind()
        //O bind() tem como objetivo manter as variáveis que existem dentro do contexto dessa classe também na classe Tela
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
    }

    //Faz uma cópia do array heroisIniciais e concatena para duplicar a quantidade
    //Chama a função .map, passa o item (cada item de copias) como parâmetro e retorna um Object.assign (para concatenar o objeto) passando como parâmetro um objeto vazio, o item e uma nova propriedade id gerada de forma aleatória.
    //Chama a função sort para ordenar os itens de forma aleatória
    embaralhar() {
        const copias = this.heroisIniciais.concat(this.heroisIniciais)

        copias.map(item => {
            return Object.assign({}, item, { id: Math.random() / 0.5 })
        })

        copias.sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)    
    }

    //Chama a função embaralhar() quando for clicado no botão "Clique aqui para iniciar" no index.html
    jogar() {
        this.embaralhar()
    }    
}