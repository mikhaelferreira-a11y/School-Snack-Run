
class Protagonista {

    constructor() {
        this.x = 100;
        this.largura = 180;
        this.altura = 220;
 
        this.velocidade = 4;
        this.velocidadeCorrida = 8;

        this.quadro = 0;
        this.totalQuadros = 8;
        this.ultimoTempo = 0;
        this.intervaloAnimacao = 120;
        this.direcao = "direita";
        this.andando = false;

        this.hitbox = {
            largura: 90,
            altura: 170,
            offsetX: 45,
            offsetY: 35
        };

        this.pulo = new Pular();
    }

    movimentar() {
        let direita = keyIsDown(68) || keyIsDown(RIGHT_ARROW);
        let esquerda = keyIsDown(65) || keyIsDown(LEFT_ARROW);

        let correndo = keyIsDown(SHIFT);

        let velocidadeAtual = correndo
            ? this.velocidadeCorrida
            : this.velocidade;

        this.andando = false;

        if (direita && !esquerda) {
            this.x += velocidadeAtual;
            this.direcao = "direita";
            this.andando = true;
        }
        else if (esquerda && !direita) {
            this.x -= velocidadeAtual;
            this.direcao = "esquerda";
            this.andando = true;
        }

        if (larguraMapa > 0) {
            this.x = constrain(
                this.x,
                0,
                max(0, larguraMapa - this.largura)
            );
        }
    }

    animar() {
        if (!this.andando || this.pulo.pulando) {
            this.quadro = 0;
            return;
        }

        if (millis() - this.ultimoTempo >= this.intervaloAnimacao) {
            this.quadro++;

            if (this.quadro >= this.totalQuadros) {
                this.quadro = 0;
            }

            this.ultimoTempo = millis();
        }
    }

    desenhar() {
        let posicaoChao = height * 0.87;

        if (this.pulo.pulando) {
            if (!puloSprite || puloSprite.width === 0) return;

            let larguraQuadro = puloSprite.width / 8;
            let origemX = this.pulo.quadro * larguraQuadro;

            image(
                puloSprite,
                this.x,
                posicaoChao - this.altura + this.pulo.deslocamentoY,
                this.largura,
                this.altura,
                origemX,
                150,
                larguraQuadro,
                650
            );

            return;
        }
        
        let sprite;

        if (this.direcao === "direita") {
            sprite = andandoDireita;
        } else {
            sprite = andandoEsquerda;
        }

        if (!sprite || sprite.width === 0) return;

        let larguraQuadro = sprite.width / 8;
        let origemX = this.quadro * larguraQuadro;

        image(
            sprite,
            this.x,
            posicaoChao - this.altura,
            this.largura,
            this.altura,
            origemX,
            0,
            larguraQuadro,
            sprite.height
        );
    }

    desenharHitbox() {
        let posicaoChao = height * 0.87;

        let x = this.x + this.hitbox.offsetX;

        let y =
            posicaoChao -
            this.altura +
            this.pulo.deslocamentoY +
            this.hitbox.offsetY;

        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);

        rect(
            x,
            y,
            this.hitbox.largura,
            this.hitbox.altura
        );

        noStroke();
    }

    atualizar() {
        this.movimentar();
        this.pulo.atualizar();
        this.animar();
        this.desenhar();
    }
}
