
class HUD {

    desenhar(dinheiro) {

        let x = width - 275;
        let y = 20;

        noStroke();
        fill(0, 0, 0, 90);
        rect(x + 6, y + 6, 235, 85, 18);

        fill(24, 59, 99);
        rect(x, y, 235, 85, 18);

        noFill();
        stroke(244, 197, 66);
        strokeWeight(4);
        rect(x, y, 235, 85, 18);
        noStroke();

        if (imagemMoeda && imagemMoeda.width > 0) {
            image(
                imagemMoeda,
                x + 12,
                y + 10,
                80,
                65
            );
        }

        fill(244, 197, 66);
        textSize(17);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);
        text("DINHEIRO", x + 105, y + 28);

        fill(255);
        textSize(25);
        text("R$ " + dinheiro + ",00", x + 105, y + 58);

        textStyle(NORMAL);
    }

    desenharVida(vida, vidaMaxima) {

        let x = 30;
        let y = 30;

        let largura = 220;
        let altura = 18;

        noStroke();
        fill(50);
        rect(x, y, largura, altura);

        let porcentagem = constrain(
            vida / vidaMaxima,
            0,
            1
        );

    
        fill(0, 200, 0);
        rect(
            x,
            y,
            largura * porcentagem,
            altura
        );

     
        fill(255);
        textSize(16);
        textAlign(LEFT, BOTTOM);
        text(
            "HP: " + vida + "/" + vidaMaxima,
            x,
            y - 5
        );
    }
}
