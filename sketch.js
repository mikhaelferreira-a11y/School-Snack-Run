
let jogador;

let andandoDireita;
let andandoEsquerda;
let puloSprite;
let imagemMoeda;

let cameraX = 0;

let coletaveis = [];
let dinheiro = 0;
let coletaveisCriados = false;

let hud;

function setup() {
    createCanvas(windowWidth, windowHeight);

    dinheiro = 0;

    andandoDireita = loadImage("assets/andandoDireita.png");
    andandoEsquerda = loadImage("assets/andandoEsquerda.png");
    puloSprite = loadImage("assets/pulo.png");
    imagemMoeda = loadImage("assets/moeda.png");

    carregarMapa1();

    jogador = new Protagonista();
    hud = new HUD();
}

function criarColetaveis() {
    if (coletaveisCriados || larguraMapa === 0) return;

    for (let i = 0; i < quantidadeCenarios1; i++) {
        let inicio = larguraCenario1 * i;

        coletaveis.push(
            new Coletavel(
                inicio + larguraCenario1 * 0.50,
                height * 0.87 - 120
            )
        );

        coletaveis.push(
            new Coletavel(
                inicio + larguraCenario1 * 1,
                height * 0.87 - 170
            )
        );
    }

    coletaveisCriados = true;
}

function draw() {
    background(0);

    prepararMapa1();

    if (imagemMoeda && imagemMoeda.width > 0) {
        criarColetaveis();
    }

    if (larguraMapa > 0) {
        cameraX = jogador.x - width / 2 + jogador.largura / 2;

        cameraX = constrain(
            cameraX,
            0,
            max(0, larguraMapa - width)
        );
    }

    desenharMapa1(cameraX);

    push();
    translate(-cameraX, 0);

    jogador.atualizar();

    for (let i = coletaveis.length - 1; i >= 0; i--) {
        let moeda = coletaveis[i];

        if (moeda.verificarColeta(jogador)) {
            dinheiro += 1;
        }

        moeda.desenhar();
    }

    pop();

    hud.desenhar(dinheiro);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    prepararMapa1();
}

function keyPressed() {
    if (key === "f" || key === "F") {
        fullscreen(!fullscreen());
    }
}
