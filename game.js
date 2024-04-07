let caixa     = document.querySelectorAll(".caixa");
let opcao     = "X";
let perdeu    = false;
let vitoriasX = 0;
let vitoriasO = 0;
let empate    = 0;

caixa.forEach(e =>{
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        if (!perdeu && e.innerHTML === ""){
            e.innerHTML = opcao;
            isGanhador();
            isEmpate();
            trocaJogador();
        }
    })
})

function trocaJogador() {
    if (opcao === "X") {
        opcao = "O";
        document.querySelector(".opcaoX").style.left = "85px";
    } else {
        opcao = "X";
        document.querySelector(".opcaoX").style.left = "0";
    }
}

function isGanhador() {
    let condicoesVencer = getCondicoesVencer();

    for(let i = 0; i<condicoesVencer.length; i++){
        let v0 = caixa[condicoesVencer[i][0]].innerHTML;
        let v1 = caixa[condicoesVencer[i][1]].innerHTML;
        let v2 = caixa[condicoesVencer[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            perdeu = true;
            document.querySelector("#resultado").innerHTML = opcao + " Ganhou!";
            atualizaContadorVencedor();
            document.querySelector("#jogarNovamente").style.display = "inline";

            for (j = 0; j<3; j++) {
                caixa[condicoesVencer[i][j]].style.backgroundColor = "Purple";
            }
        }
    }
}

function isEmpate() {
    if (!perdeu) {
        let bEmpate = true;
        caixa.forEach(e =>{
            if (e.innerHTML === "") {
                bEmpate = false;
            } 
        })

        if (bEmpate) {
            perdeu = true;
            document.querySelector("#resultado").innerHTML = "Empate!";
            atualizaContadorEmpate();
            document.querySelector("#jogarNovamente").style.display = "inline";
        }
    }
}

function getCondicoesVencer() {
    return [
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6]
    ];
}

function atualizaContadorVencedor() {
    if (opcao === "X") {
        vitoriasX++;
        document.querySelector("#vitoriasX").innerText = vitoriasX;

    } else {
        vitoriasO++;
        document.querySelector("#vitoriasO").innerText = vitoriasO;
    }
}

function atualizaContadorEmpate() {
    empate++;
    document.querySelector("#empate").innerText = empate;
}

document.querySelector("#jogarNovamente").addEventListener("click", ()=>{
    perdeu = false;
    opcao = "X";
    document.querySelector(".opcaoX").style.left   = "0";
    document.querySelector("#resultado").innerHTML = "";
    document.querySelector("#jogarNovamente").style.display = "none";

    caixa.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    })
})