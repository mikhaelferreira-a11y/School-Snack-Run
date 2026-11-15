
class Arremesso {

    constructor() {
        this.bolinhas = [];
    }

    lancar(x, y, direcao) {
        this.bolinhas.push({
            x: x,
            y: y,
            velocidade: 10,
            direcao: direcao,
            tamanho: 18
        });
    }

    atualizar() {
        for (let i = this.bolinhas.length - 1; i >= 0; i--) {
            let bola = this.bolinhas[i];

            bola.x += bola.velocidade * bola.direcao;

            if (bola.x < 0 || bola.x > larguraMapa) {
                this.bolinhas.splice(i, 1);
            }
        }
    }

    desenhar() {
        noStroke();
        fill(255);

        for (let bola of this.bolinhas) {
            ellipse(
                bola.x,
                bola.y,
                bola.tamanho,
                bola.tamanho
            );
        }
    }
}
