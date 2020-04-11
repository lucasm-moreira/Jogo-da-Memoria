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
    inicializar() {
        //Vai pegar todas as funções da classe Tela
        //coloca todos os heróis na tela
        this.tela.atualizarImagens(this.heroisIniciais)
    }
}