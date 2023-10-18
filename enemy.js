// enemy.js
export class Enemy {
    constructor(x, y, velocityX, velocityY, imageSrc, health) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 50; // Adjust the width of the enemy
        this.height = 50; // Adjust the height of the enemy
        this.health = health;
    }

    update() {
        // Update enemy position based on its velocity and any game logic
        this.x -= this.velocityX;
        this.y += this.velocityY;
        // Add more logic to control enemy behavior, e.g., following the player
    }

    draw(context) {
        // Draw the enemy image
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
