class JogoDaMemoria {
    constructor({ tela, util }) {
        //Se passar como parâmetro, por exemplo, um obg = { tela: 1, idade: 2, nome: Lucas }
        //vai ser pegar só a propriedade tela e ignorar todo o resto
        this.tela = tela        
        this.util = util

        //Path sempre relativo ao index.html
        this.heroisIniciais = [
            { img: './arquivos/batman.png', nome: 'batman' },
            { img: './arquivos/ciclop.png', nome: 'ciclop' },
            { img: './arquivos/deadpool.png', nome: 'deadpool' },
            { img: './arquivos/mulhermaravilha.png', nome: 'mulhermaravilha' }
        ]
        
        this.iconePadrao = './arquivos/default.png'

        this.heroisEscondidos = []
        this.heroisSelecionados = []
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
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
    }

    //Faz uma cópia do array heroisIniciais e concatena para duplicar a quantidade
    //Chama a função .map, passa o item (cada item de copias) como parâmetro e retorna um Object.assign (para concatenar o objeto) passando como parâmetro um objeto vazio, o item e uma nova propriedade id gerada de forma aleatória.
    //Chama a função sort para ordenar os itens de forma aleatória
    //Usa o setTimeout para executar a função esconderHerois após 1 segundo
    async embaralhar() {
        const copias = this.heroisIniciais.concat(this.heroisIniciais)
        .map(item => {
            return Object.assign({}, item, { id: Math.random() / 0.5 })
        })
        .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando() 
        
        //Faz uma chamada assíncrona para a função timeout da classe Util. Após 1 segundo será executado a função resolve da promise
        await this.util.timeout(1000)

        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
    }

    //Troca a imagem de todos os heróis existentes pelo ícone padrão
    //Chama a função map() e mapeia somente o necessário de cada heroi em herois, ou seja, nome e id
    //Como não tem lógica dentro do map, na mesma linha retorna um objeto com as propriedades necessárias
    //id e nome como são os mesmos valores de cada item mapeado pelo .map() podem ser montados como "id" e "nome", já o img precisa da sintaxe img: this.iconePadrao
    //Pois nesse caso o .map() não sabe o valor de img que está sendo montado no objeto, precisando setar manualmente
    //Após tudo isso é atualizado as imagens com os herois ocultos e criado uma variável para guardar os valores para verificar se estão corretos ou não posteriormente
    esconderHerois(herois) {
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarImagens(heroisOcultos)
        this.heroisOcultos = heroisOcultos
    }

    //Verifica a quantidade de heróis selecionadas durante o jogo e defini se houve acerto ou erro
    verificarSelecao(id, nome) {
        const item = { id, nome }
        const heroisSelecionados = this.heroisSelecionados.length

        switch(heroisSelecionados) {
            case 0:
                //Adiciona uma escolha na lista e espera pelo próximo click
                this.heroisSelecionados.push(item)
                break;

            case 1:
                //Se a quantidade de escolhidos for 1, significa que o usuário só pode escolher mais um
                //Para obter o valor do índice 0 da lista no JS basta user a sintaxe [variavel], se precisar do 0 e do 1, então [var1, var2, ...]
                const [ opcao1 ] = this.heroisSelecionados

                //Zerar lista para não deixar selecionar mais de 2 heróis por vez
                this.heroisSelecionados = []

                //Conferir se os nomes dos heróis batem e se os ids diferem. Os ids precisam ser diferentes para que o jogador não clique duas vezes na mesma imagem e o sistema acuse como acerto
                //Exibr o herói e a mensagem
                if(opcao1.nome === item.nome && opcao1.id !== item.id) {
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    //para a execução
                    return;
                }
                //Exibe a mensagem passando o parâmetro false para a função, já que o padrão é true para acerto e false para erro
                this.tela.exibirMensagem(false)
                break;
        }
    }

    exibirHerois(nomeDoHeroi) {
        //Procurar herói pelo nome em heroisIniciais e obter somente a imagem dele
        const { img } = this.heroisIniciais.find(({nome}) => nomeDoHeroi === nome)

        this.tela.exibirHerois(nomeDoHeroi, img)
    }

    //Chama a função embaralhar() quando for clicado no botão "Clique aqui para iniciar" no index.html
    jogar() {
        this.embaralhar()
    }    
}