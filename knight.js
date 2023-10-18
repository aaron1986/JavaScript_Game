// knight.js
export class Knight {
    constructor(x, y, velocityX, velocityY, imageSrc, health) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 90; 
        this.height = 360;
        this.health = health;
    }

    update() {
        this.x -= this.velocityX;
        this.y += this.velocityY;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}