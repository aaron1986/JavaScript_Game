export class Player {
    constructor(game) {
        this.game = game;
        this.width = 200;
        this.height = 250;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById("player");
        this.speed = 0;
        this.maxSpeed = 10;
    }

    update(input) {
        // Horizontal movement
        if (input.includes("ArrowRight")) {
            this.speed = this.maxSpeed;
        } else if (input.includes("ArrowLeft")) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }

        this.x += this.speed;

        // gravity
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

        // jumping
        if (input.includes("ArrowUp") && this.onGround()) {
            this.vy = -20; // Adjust the jump height as needed
        }

        this.y += this.vy;

        // player doesn't go below the ground
        if (this.y > this.game.height - this.height) {
            this.y = this.game.height - this.height;
        }

        // player stays within the game boundaries
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
    }

    draw(context) {
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onGround() {
        return this.y >= this.game.height - this.height;
    }
}