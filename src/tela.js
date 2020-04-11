const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"

class Tela {
    //Gera o código html abaixo com os itens passados do objeto heroi passado como parâmetro "item"
    static obterCodigoHTML(item) {
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;">
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
}