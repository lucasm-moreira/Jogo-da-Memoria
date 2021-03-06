//Métodos estáticos não podem acessar o 'this', por isso o util não será inserido no construtor
const util = Util

const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_MOSTRAR_TUDO = "mostrarTudo"
const MENSAGENS = {
    sucesso: {
        texto: 'Combinação correta!',
        classe: 'alert-success'
    },
    erro: {
        texto: 'Combinação incorreta!',
        classe: 'alert-danger'
    }
}

class Tela {
    //Gera o código html abaixo com os itens passados do objeto heroi passado como parâmetro "item"
    static obterCodigoHTML(item) {
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
            </div>
        </div>
        <br />
        `
    }

    //Pega a id "conteudo" do index.html e insere o código html passado como parâmetro
    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    //Para cada item da lista itens vai executar a função obterCodigoHTML
    //ao final vai concatenar tudo em uma única string
    //Muda de Array para String
    static gerarStringHTMLPelaImagem(itens) {
        return itens.map(Tela.obterCodigoHTML).join('')
    }

    //Após a execução da função "gerarStringHTMLPelaImagem" seu resultado é armazenado na variável codigoHtml e passado como parâmetro para a função "alterarConteudoHTML"
    static atualizarImagens(itens) {
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    //Pega o id "jogar" do botão no index.html e programa para quando ele receber um click seja executado a função que está como parâmetro, funcaoOnClick
    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }

    //Cria função verificarSelecao dentro do objeto window, recebe os parâmetros id e nome por meio da função onclick em obterCodigoHTML  
    static configurarBotaoVerificarSelecao(funcaoOnClick) {
        window.verificarSelecao = funcaoOnClick
    }

    //Pega o elemento por nome e realiza um forEach que para cada item encontrado a imagem será substituída pela que veio como parâmetro na função
    static exibirHerois(nomeDoHeroi, img) {
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        elementosHtml.forEach(item => (item.src = img))
    }

    //Recebe com parâmetro o padrão true para sucesso
    //Pega o elemento pelo id, verifica se teve sucesso ou fracasso e seta a mensagem e o texto de acordo o resultado. No final remove a classe invisível da tag do html
    static async exibirMensagem(sucesso = true) {
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        }
        else {
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }

    //Recebe com parâmetro o padrão true para sucesso
    //Pega o elemento pelo id, verifica se é sucesso ou fracasso e de acordo com o resultado remove ou adiciona a classe invisível
    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }

    //função para iniciar a contagem regressiva para iniciar o jogo
    static iniciarContador() {
        let contarAte = 3
        const elementorContador = document.getElementById(ID_CONTADOR)        
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`

        //Substitui o identificadorNoTexto pelo contarAte de forma regressiva
        const atualizarTexto = () => (elementorContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))

        atualizarTexto()

        //A cada segundo vai chamar a função atualizar texto
        const idDoIntervalo = setInterval(atualizarTexto, 1000)

        return idDoIntervalo
    }

    //Chama a função clearInterval do Javascript que serve para parar o setInterval, deixa o elemento com id do contador vazia
    static limparContador(idDoIntervalo) {
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static configurarBotaoMostrarTudo(funcaoOnClick) {
        const btnMostrarTudo = document.getElementById(ID_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }
}