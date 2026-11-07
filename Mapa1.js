let cenario1;

let larguraCenario1 = 0;
let larguraMapa = 0;

let quantidadeCenarios1 = 5;

function carregarMapa1() {

    cenario1 = loadImage("assets/cenario1.png");
}

function prepararMapa1() {

    if (!cenario1 || cenario1.width === 0) return;

    let escala = height / cenario1.height;

    larguraCenario1 = cenario1.width * escala;

    larguraMapa = larguraCenario1 * quantidadeCenarios1;
}

function desenharMapa1(cameraX) {

    if (larguraMapa === 0) return;

    for (let i = 0; i < quantidadeCenarios1; i++) {

        image(
            cenario1,
            (larguraCenario1 * i) - cameraX,
            0,
            larguraCenario1,
            height
        );
    }
}