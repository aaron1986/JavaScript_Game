import { Player } from './player.js';
import { inputHandler } from './input.js';
import { Background } from './background.js';
import { Projectile } from './projectiles.js';
import { Enemy } from './enemy.js'; 

window.addEventListener("load", function () {
    const canvas = this.document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 800;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.speed = 7;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new inputHandler(this); // Pass the game instance to inputHandler
            this.projectiles = [];
            this.enemies = []; // Initialize an empty array to store enemies
        }

        checkCollisions() {
            for (let i = this.projectiles.length - 1; i >= 0; i--) {
                const projectile = this.projectiles[i];
                for (let j = this.enemies.length - 1; j >= 0; j--) {
                    const enemy = this.enemies[j];
    
                    // Check if the bounding boxes of the projectile and enemy intersect
                    if (
                        projectile.x < enemy.x + enemy.width &&
                        projectile.x + projectile.width > enemy.x &&
                        projectile.y < enemy.y + enemy.height &&
                        projectile.y + projectile.height > enemy.y
                    ) {
                        // Collision detected
                        this.projectiles.splice(i, 1); // Remove the projectile
                        this.enemies.splice(j, 1); // Remove the enemy
                    }
                }
            }
        }

        createProjectile() {
            const playerX = this.player.x + this.player.width / 3;
            const playerY = this.player.y + this.player.height / 2;
            const velocityX = 3; // Adjust the velocity as needed
            const velocityY = 0;

            // Provide the path to the projectile image
            const imageSrc = './img/fire-removebg-preview.png';

            const projectile = new Projectile(playerX, playerY, velocityX, velocityY, imageSrc);
            this.projectiles.push(projectile);
        }

        spawnEnemy() {
            const randomX = Math.random() * this.width; // Adjust the range
            const randomY = Math.random() * this.height; // Adjust the range
            const velocityX = 2; // Adjust the enemy's velocity
            const velocityY = 0;
            const imageSrc = './img/enemy.png'; // Provide the path to the enemy image
            const health = 100; // Set enemy health

            const enemy = new Enemy(randomX, randomY, velocityX, velocityY, imageSrc, health);
            this.enemies.push(enemy);
        }

        update(deltaTime) {
            this.background.update(deltaTime);
            this.player.update(this.input.keys);

            // Spawn enemies or add more logic to control enemy spawning
            // For example, spawn an enemy every few seconds:
            if (Math.random() < 0.01) { // Adjust the probability as needed
                this.spawnEnemy();
            }

            this.projectiles.forEach(projectile => {
                projectile.update();
                projectile.draw(context);
            });

            this.enemies.forEach(enemy => {
                enemy.update();
                enemy.draw(context);
            });
        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);

            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });

            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    let lastTime = 0;

    function animate(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
    
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.checkCollisions(); // Check for collisions
        game.draw(context);
        requestAnimationFrame(animate);
    }

    animate(0);
});
