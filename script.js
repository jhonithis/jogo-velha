var casas               = [];
var casasVazias         = [];
var nivelAtual          = "EASY";
var niveis              = ["EASY", "NORMAL", "HARD"]
var NPC                 = "NPC";
var isPrimeiraJogadaNPC = true;
var HUMANO              = "HUMANO";
var casasCanto          = [1, 3, 7, 9];
var casasCruz           = [2, 4, 6, 8];

window.onload = loadGame;

function loadGame(){
    casas = document.getElementsByClassName("casa");
    for (var i = 0; i < casas.length; i++) {
        casas[i].innerHTML = "";
        casas[i].addEventListener('click', jogadaUsuario);
        casasVazias[i] = i + 1;
    }
}

function setNivel(nivel){
    resetJogo();
    document.querySelectorAll('[data-nivel="' + nivelAtual + '"]')[0].classList.remove("menu-selected");
    nivel.classList.add("menu-selected");
    this.nivelAtual = nivel.getAttribute("data-nivel");
}

function jogadaUsuario(event) {
    event.target.innerHTML = "<span>X</span>";
    casa = parseInt(event.target.getAttribute("data-casa"));    
    removeEventListener(casa)
    removeListCasaVazia(casa);
    
    if(!isGanhouJogo(HUMANO)){
        jogadaComputador();
    }
}

function jogadaComputador(){
    switch(nivelAtual) {
        case "EASY":
            nivelEasyManager();
            break;
        case "NORMAL":
            nivelNormalManager();
            break;
        case "HARD":
            nivelHardManager();
            break;
        default:
            alert("Caro Usuário, por favor informe o nivel do jogo ^^.");
    }

    isGanhouJogo(NPC);
}

function nivelEasyManager(){
    var casa = casasVazias[Math.floor(Math.random() * casasVazias.length)];
    document.getElementById("casa-" + casa).innerHTML = "<span>O</span>";
    removeListCasaVazia(casa);
    removeEventListener(casa);
}

function nivelNormalManager(){
    var casa = undefined;

    if(isPrimeiraJogadaNPC){
        isPrimeiraJogadaNPC = false;
        do {
            casa = casasVazias[casasVazias.indexOf(casasCanto[Math.floor(Math.random() * casasCanto.length)])];
        } while (casa == undefined);

    } else{
        casa = casasVazias[Math.floor(Math.random() * casasVazias.length)]; 
    }

    document.getElementById("casa-" + casa).innerHTML = "<span>O</span>";

    removeListCasaVazia(casa);
    removeEventListener(casa);
}

function nivelHardManager(){
    var casa = undefined;
    if(isPrimeiraJogadaNPC){

        isPrimeiraJogadaNPC = false;

        if(casasVazias[casasVazias.indexOf(5)] != undefined){
            casa = 5;
        } else {
            do {
                casa = casasVazias[casasVazias.indexOf(casasCanto[Math.floor(Math.random() * casasCanto.length)])];
            } while (casa == undefined);
        } 
    } else {

        if(proximaJogada("O")){
            casa = proximaJodada;
        } else if(proximaJogada("X")){
           casa = proximaJodada;
        }

        if (casa == undefined){

            if (casasVazias.length == 6 && 
                document.getElementById("casa-5").firstElementChild.textContent != "O" &&
                casasVazias[casasVazias.indexOf(2)] != undefined &&
                casasVazias[casasVazias.indexOf(4)] != undefined &&
                casasVazias[casasVazias.indexOf(6)] != undefined &&
                casasVazias[casasVazias.indexOf(8)] != undefined) {
                    var i = 0;
                    do {
                        i++;
                        casa = casasVazias[casasVazias.indexOf(casasCanto[Math.floor(Math.random() * casasCanto.length)])];
                    } while (casa == undefined && i < 4);


            } else if((casasVazias.length == 6 && document.getElementById("casa-5").firstElementChild.textContent == "O") && (document.getElementById("casa-2").textContent != "" && document.getElementById("casa-4").textContent != "") && document.getElementById("casa-2").firstElementChild.textContent == "X" && document.getElementById("casa-4").firstElementChild.textContent == "X" ){
                casa = 1;                
            } else if((casasVazias.length == 6 && document.getElementById("casa-5").firstElementChild.textContent == "O") && (document.getElementById("casa-4").textContent != "" && document.getElementById("casa-8").textContent != "") && document.getElementById("casa-4").firstElementChild.textContent == "X" && document.getElementById("casa-8").firstElementChild.textContent == "X" ){
                casa = 7;                
            } else if((casasVazias.length == 6 && document.getElementById("casa-5").firstElementChild.textContent == "O") && (document.getElementById("casa-8").textContent != "" && document.getElementById("casa-6").textContent != "") &&
document.getElementById("casa-8").firstElementChild.textContent == "X" && document.getElementById("casa-6").firstElementChild.textContent == "X" ){
                casa = 9;                
            } else if((casasVazias.length == 6 && document.getElementById("casa-5").firstElementChild.textContent == "O") && (document.getElementById("casa-6").textContent != "" && document.getElementById("casa-2").textContent != "") && document.getElementById("casa-6").firstElementChild.textContent == "X" && document.getElementById("casa-2").firstElementChild.textContent == "X" ){
                casa = 3;                
            } else if (casasVazias.length == 6 && document.getElementById("casa-5").firstElementChild.textContent == "O" && (casasVazias[casasVazias.indexOf(1)] != undefined && casasVazias[casasVazias.indexOf(9)] != undefined ) || ( casasVazias[casasVazias.indexOf(3)] != undefined && casasVazias[casasVazias.indexOf(7)] != undefined)) {
                var i = 0;
                do {
                    i++;
                    casa = casasVazias[casasVazias.indexOf(casasCruz[Math.floor(Math.random() * casasCruz.length)])];
                } while (casa == undefined && i < 4);

            } 
        }

        if(casa == undefined) {
            casa = casasVazias[Math.floor(Math.random() * casasVazias.length)];
        }

    }

    document.getElementById("casa-" + casa).innerHTML = "<span>O</span>";
    removeListCasaVazia(casa);
    removeEventListener(casa);
}

function proximaJogada(jogador){
    if( preveJogada(1, 2, 3, jogador) || preveJogada(4, 5, 6, jogador) || preveJogada(7, 8, 9, jogador) ||
        preveJogada(1, 4, 7, jogador) || preveJogada(2, 5, 8, jogador) || preveJogada(3, 6, 9, jogador) ||
        preveJogada(1, 5, 9 ,jogador) || preveJogada(3, 5, 7, jogador) ){
            return true;
    }

    return false;
}

function preveJogada(a, b, c, jogador){
    var casaA = document.getElementById("casa-" + a).textContent;
    var casaB = document.getElementById("casa-" + b).textContent;
    var casaC = document.getElementById("casa-" + c).textContent;

    if((casaA == "") && (casaB == casaC) && casaC == jogador){
        proximaJodada = a;
        return true;
    }

    if((casaB == "") && (casaA == casaC) && casaC == jogador){
        proximaJodada = b;
        return true;
    }

    if((casaC == "") && (casaA == casaB) && casaB == jogador){
        proximaJodada = c;
        return true;
    }

    return false;
}

function removeEventListener(casa){
    casas[casa - 1].removeEventListener('click', jogadaUsuario);
}

function removeListCasaVazia(casa){
    casasVazias.splice(casasVazias.indexOf(casa), 1);
}

function casasIguais(a, b, c){
    var casaA = document.getElementById("casa-" + a).textContent;
    var casaB = document.getElementById("casa-" + b).textContent;
    var casaC = document.getElementById("casa-" + c).textContent;
    if((casaA == casaB) && (casaB == casaC) && (casaC != "")) {
        return true;
    }
    return false;
}

function isGanhouJogo(jogador){

    if( casasIguais(1, 2, 3) || casasIguais(4, 5, 6) || casasIguais(7, 8, 9) ||
        casasIguais(1, 4, 7) || casasIguais(2, 5, 8) || casasIguais(3, 6, 9) ||
        casasIguais(1, 5, 9) || casasIguais(3, 5, 7) ){
        var textVitoria = "";

        if(jogador == NPC){
            textVitoria = "¯ \\ _ (ツ) _ / ¯ Você perdeu, tente novamente...";
        } else {
            textVitoria = "Parabéns.... você ganhou \\o/ ";
        }

        document.getElementById("resultado").innerHTML = textVitoria;
        fimJogo();
        return true;
        
    } if (casasVazias.length == 0){
        document.getElementById("resultado").innerHTML = "Empatou o.O";
        fimJogo();
        return true;
    }
    return false;

}

function resetJogo(){
    fimJogo();
    loadGame();
    document.getElementById("jogo").style.zIndex = "1"
    document.getElementById("resultado").innerHTML = "";
    isPrimeiraJogadaNPC = true;
    proximaJodada = undefined;
}

function fimJogo(){
    document.getElementById("jogo").style.zIndex = "-1";
    for (var i = 0; i < casas.length; i++) {
        casas[i].removeEventListener('click', jogadaUsuario);
    }
}
