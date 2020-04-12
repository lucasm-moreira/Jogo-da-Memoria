//Função que será chamada quando a tela for carregada
function onLoad() {    
    const dependencias = {
        //A classe Tela é uma dependência e será utilizada como parâmetro quando instanciar um jogo da memória, por isso criar um objeto chamado dependencias
        tela: Tela,

        //Util é uma variável global
        util: Util
    }

    //Instancia um novo jogo da memória passando dependencias como parâmetro
    const jogoDaMemoria = new JogoDaMemoria(dependencias)
    jogoDaMemoria.inicializar()
}

//Faz com que a variável global responsável pelo carregamento da tela, windows.onload receba a função criada acima, onLoad
window.onload = onLoad