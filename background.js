class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update(deltaTime) {
        this.x -= this.speedModifier * deltaTime;
        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 2400;
        this.height = 800;
        this.layer1Image = document.getElementById("layer1");
        this.layer2Image = document.getElementById("layer2");
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, 40, this.layer2Image);
        this.backgroundLayers = [this.layer1, this.layer2];
    }

    update(deltaTime) {
        this.backgroundLayers.forEach(layer => {
            layer.update(deltaTime);
        });
    }

    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}
