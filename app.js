let listaNumSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
function mostrarTextoNaTela(tag, texto) {
  let pegarTag = document.querySelector(tag);
  pegarTag.innerHTML = texto;
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}
function mensagemInicial() {
  mostrarTextoNaTela("h1", "Jogo do número secreto");
  mostrarTextoNaTela("p", "Escolha um número de 0 a 10");
}
mensagemInicial();
function verificarChute() {
  let numeroAleatorio = document.querySelector("input").value;

  if (numeroAleatorio == numeroSecreto) {
    mostrarTextoNaTela("h1", "Acertou!");
    let txtTentativas = tentativas > 1 ? "tentativas" : "tentativa";
    let msgTentativa = `Você acertou o número sorteado com ${tentativas} ${txtTentativas}!`;
    mostrarTextoNaTela("p", `Parabéns, você acertou!<br/>${msgTentativa}`);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroSecreto < numeroAleatorio) {
      mostrarTextoNaTela("h1", "Errou!");
      mostrarTextoNaTela("p", "O número sorteado é menor!");
    } else {
      mostrarTextoNaTela("h1", "Errou!");
      mostrarTextoNaTela("p", "O número sorteado é maior!");
    }
  }
  tentativas++;
  limparBarra();
}
function gerarNumeroAleatorio() {
  let sorteio = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeElementosLista = listaNumSorteados.length;

  if (quantidadeElementosLista == numeroLimite) {
    listaNumSorteados = [];
  }

  if (listaNumSorteados.includes(sorteio)) {
    return gerarNumeroAleatorio();
  } else {
    console.log(listaNumSorteados);
    listaNumSorteados.push(sorteio);
  }
  return sorteio;
}
function limparBarra() {
  let chute = document.querySelector("input");
  chute.value = "";
}
function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  limparBarra();
  mensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
