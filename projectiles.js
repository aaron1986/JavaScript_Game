// projectiles.js
export class Projectile {
    constructor(x, y, velocityX, velocityY, imageSrc) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 20; // Set the width of the projectile
        this.height = 20; // Set the height of the projectile
    }

    update() {
        // Update the projectile's position based on its velocity
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    draw(context) {
        // Draw the image as the projectile
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
