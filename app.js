//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Tente adivinhar o número secreto entre 1 e 100.';

//Variável para quantidade de números sorteados
let quantidadeNumerosSorteados = 100;

//Variável para lista de números sorteados
let listaDeNumerosSorteados = [];

//Variável para armazenar o número secreto
let numeroSecreto = gerarNumeroAleatorio();

//Variável para o número de tentativas
let tentativas = 1;

//Função para exibir texto na página
function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); //text-to-speech

    //Alternativa para text-to-speech
    //if ('speechSynthesis' in window) {
     //   let utterance = new SpeechSynthesisUtterance(texto);
    //    utterance.lang = 'pt-BR'; 
    //    utterance.rate = 1.2; 
    //    window.speechSynthesis.speak(utterance); 
   // } else {
   //     console.log("Web Speech API não suportada neste navegador.");
  //  }
}

//Função para exibir mensagem inicial
function mensagemInicial() {
    exibirTexto('h1', 'Jogo do Número Secreto');
    exibirTexto('p', 'Tente adivinhar o número secreto entre 1 e 100.');
}

mensagemInicial();

//Função para verificar o chute
function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
    let mensagemTentativas  = `Parabéns! Você descobriu o número secreto em ${tentativas} ${palavraTentativa}.`;
    
    if (chute == numeroSecreto) {
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //habilita o botão após acertar o número
    }   else if (chute > numeroSecreto) {
        exibirTexto('p', 'O número secreto é menor.');
    }   else {  
        exibirTexto('p', 'O número secreto é maior.');
    }
    tentativas++;
    limparCampo();
}

//Função para gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeNumerosSorteados + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == quantidadeNumerosSorteados) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//Função para limpar campo de input
function limparCampo() {
    document.querySelector('input').value = '';
}

//Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //desabilita o botão ao reiniciar o jogo
}