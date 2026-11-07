
class Coletavel {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.largura = 85;
        this.altura = 85;
        this.coletado = false;

        this.hitbox = {
            largura: 65,
            altura: 65,
            offsetX: 10,
            offsetY: 10
        };
    }

    desenhar() {
        if (this.coletado) return;
        if (!imagemMoeda || imagemMoeda.width === 0) return;

        image(
            imagemMoeda,
            this.x,
            this.y,
            this.largura,
            this.altura
        );
    }

    verificarColeta(jogador) {
        if (this.coletado) return false;

        let posicaoChao = height * 0.87;

        let jogadorX = jogador.x + jogador.hitbox.offsetX;

        let jogadorY =
            posicaoChao -
            jogador.altura +
            jogador.pulo.deslocamentoY +
            jogador.hitbox.offsetY;

        let jogadorDireita = jogadorX + jogador.hitbox.largura;
        let jogadorBase = jogadorY + jogador.hitbox.altura;

        let moedaX = this.x + this.hitbox.offsetX;
        let moedaY = this.y + this.hitbox.offsetY;

        let moedaDireita = moedaX + this.hitbox.largura;
        let moedaBase = moedaY + this.hitbox.altura;

        let colidiu =
            jogadorX < moedaDireita &&
            jogadorDireita > moedaX &&
            jogadorY < moedaBase &&
            jogadorBase > moedaY;

        if (colidiu) {
            this.coletado = true;
            return true;
        }

        return false;
    }
}
