import { Player } from './player.js';
import { inputHandler } from './input.js';
import { Background } from './background.js';
import { Projectile } from './projectiles.js';
import { Enemy } from './enemy.js'; 
import { Knight } from './knight.js';


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
            this.input = new inputHandler(this); 
            this.projectiles = [];
            this.enemies = []; 
            this.knights = [];
            this.score = 0;
        }

        checkCollisions() {
            // Check collisions with the 'enemy' enemies
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
                        // Collision with 'enemy' detected
                        this.projectiles.splice(i, 1); // Remove the projectile
                        this.enemies.splice(j, 1); // Remove the enemy
                        this.score += 10;
                    }
                }
            }
        
            // Check collisions with the 'knight' enemies
            for (let i = this.projectiles.length - 1; i >= 0; i--) {
                const projectile = this.projectiles[i];
                for (let k = this.knights.length - 1; k >= 0; k--) {
                    const knight = this.knights[k];
        
                    // Check if the bounding boxes of the projectile and knight intersect
                    if (
                        projectile.x < knight.x + knight.width &&
                        projectile.x + projectile.width > knight.x &&
                        projectile.y < knight.y + knight.height &&
                        projectile.y + projectile.height > knight.y
                    ) {
                        // Collision with 'knight' detected
                        this.projectiles.splice(i, 1); // Remove the projectile
                        this.knights.splice(k, 1); // Remove the knight
                        this.score += 20;
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
            const randomX = Math.random() * this.width; 
            const randomY = Math.random() * this.height; 
            const velocityX = 2; 
            const velocityY = 0;
            const imageSrc = './img/enemy.png'; 
            const health = 100; 

            const enemy = new Enemy(randomX, randomY, velocityX, velocityY, imageSrc, health);
            this.enemies.push(enemy);
        }

        spawnKnight() {
            const randomX = Math.random() * this.width;
            const randomY = this.height - 345; 
            const velocityX = 2;
            const velocityY = 0;
            const imageSrc = './img/knight-removebg-preview-removebg-preview.png'; 
            const health = 150; 
    
            const knight = new Knight(randomX, randomY, velocityX, velocityY, imageSrc, health);
            this.knights.push(knight);
        }

        drawScore(context) {
            context.font = "24px Arial"; // Adjust the font style and size
            context.fillStyle = "white"; // Adjust the text color
            context.fillText(`Score: ${this.score}`, 10, 30); // Adjust the position
        }

        update(deltaTime) {
            this.background.update(deltaTime);
            this.player.update(this.input.keys);

            if (Math.random() < 0.01) { 
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

            if (Math.random() < 0.005) {
                this.spawnKnight();
            }
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

            this.knights.forEach(knight => {
                knight.update();
                knight.draw(context);
            });

            this.drawScore(context); 
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
    game.checkCollisions();
    game.draw(context);
    requestAnimationFrame(animate);
}

animate(0);
});
