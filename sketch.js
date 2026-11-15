let jogador;

let andandoDireita;
let andandoEsquerda;
let puloSprite;
let imagemMoeda;
let arremessandoSprite;

let cameraX = 0;

let coletaveis = [];
let dinheiro = 0;
let coletaveisCriados = false;

// Vida
let vida = 100;
let vidaMaxima = 100;

let hud;

function setup() {
    createCanvas(windowWidth, windowHeight);

    dinheiro = 0;
    vida = 100;

    andandoDireita = loadImage("assets/andandoDireita.png");
    andandoEsquerda = loadImage("assets/andandoEsquerda.png");
    puloSprite = loadImage("assets/pulo.png");
    imagemMoeda = loadImage("assets/moeda.png");
    arremessandoSprite = loadImage("assets/arremessando.png");

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
                height * 0.87 - 85
            )
        );

        coletaveis.push(
            new Coletavel(
                inicio + larguraCenario1 * 0.70,
                height * 0.87 - 150
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

    // Câmera
    if (larguraMapa > 0) {
        cameraX = jogador.x - width / 2 + jogador.largura / 2;

        cameraX = constrain(
            cameraX,
            0,
            max(0, larguraMapa - width)
        );
    }

    // Cenário
    desenharMapa1(cameraX);

    // Mundo do jogo
    push();
    translate(-cameraX, 0);

    // Personagem
    jogador.atualizar();

    // Bolas arremessadas
    jogador.arremesso.atualizar();
    jogador.arremesso.desenhar();

    // Moedas
    for (let i = coletaveis.length - 1; i >= 0; i--) {
        let moeda = coletaveis[i];

        if (moeda.verificarColeta(jogador)) {
            dinheiro += 1;
        }

        moeda.desenhar();
    }

    pop();

    // HUD
    hud.desenhar(dinheiro);
    hud.desenharVida(vida, vidaMaxima);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    prepararMapa1();
}

function keyPressed() {
    if ((key === "x" || key === "X") && jogador) {
        jogador.iniciarArremesso();
    }
}