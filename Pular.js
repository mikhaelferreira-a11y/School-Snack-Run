class Pular {

    constructor() {

        this.velocidadeY = 0;
        this.forcaPulo = -16;
        this.gravidade = 0.8;

        this.deslocamentoY = 0;
        this.pulando = false;

        this.teclaAnterior = false;

        this.quadro = 0;
        this.totalQuadros = 8;

        this.ultimoTempo = 0;
        this.intervalo = 80;
    }

    atualizar() {

        let teclaPulo = keyIsDown(32);

        if (
            teclaPulo &&
            !this.teclaAnterior &&
            !this.pulando
        ) {

            this.velocidadeY = this.forcaPulo;
            this.pulando = true;

            this.quadro = 0;
            this.ultimoTempo = millis();
        }

        this.teclaAnterior = teclaPulo;

        if (this.pulando) {

            this.deslocamentoY += this.velocidadeY;

            this.velocidadeY += this.gravidade;

            if (millis() - this.ultimoTempo >= this.intervalo) {

                if (this.quadro < this.totalQuadros - 1) {
                    this.quadro++;
                }

                this.ultimoTempo = millis();
            }

            
            if (this.deslocamentoY >= 0) {

                this.deslocamentoY = 0;
                this.velocidadeY = 0;
                this.pulando = false;
                this.quadro = 0;
            }
        }
    }
}