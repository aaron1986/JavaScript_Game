// enemy.js
export class Enemy {
    constructor(x, y, velocityX, velocityY, imageSrc, health) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 50; 
        this.height = 50; 
        this.health = health;
    }

    update() {
        this.x -= this.velocityX;
        this.y += this.velocityY;
    }

    draw(context) {
        // Draw the enemy image
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
