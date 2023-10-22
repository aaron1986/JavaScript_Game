import { Player } from './player.js';
import { inputHandler } from './input.js';
import { Background } from './background.js';
import { Projectile } from './projectiles.js';
import { Enemy } from './enemy.js'; 
import { Knight } from './knight.js';
import { CollisionHandler } from './collisions.js';


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
            this.playerMaxHealth = 200; 
            this.playerHealth = this.playerMaxHealth;
            this.healthBarWidth = 300; 
            this.healthBarHeight = 20; 
            this.healthBarX = 20; 
            this.healthBarY = 80; 
            this.player.score = localStorage.getItem("score");
            this.player.playerHealth = localStorage.getItem("playerHealth") || this.playerMaxHealth;           
            this.player.score = 0;
            this.collisionHandler = new CollisionHandler(this.player, this.projectiles, this.enemies, this.knights);
            this.gameOver = false;
        }

        resetPlayerHealth() {
            this.player.playerHealth = this.playerMaxHealth;
            localStorage.setItem("playerHealth", this.playerMaxHealth);
        }

        createProjectile() {
            const playerX = this.player.x + this.player.width / 3;
            const playerY = this.player.y + this.player.height / 2;
            const velocityX = 3; 
            const velocityY = 0;
            
            const imageSrc = './img/fire-removebg-preview.png';

            const projectile = new Projectile(playerX, playerY, velocityX, velocityY, imageSrc);
            this.projectiles.push(projectile);

            // Play the sound effect when firing a projectile
            const projectileSound = document.getElementById('projectileSound');
            if (projectileSound) {
            projectileSound.play();
            } //end of if statement
        } //createProjectile

        spawnEnemy() {
            const randomX = Math.random() * this.width; 
            const randomY = Math.random() * this.height + 450; 
            const velocityX = 2; 
            const velocityY = 0;
            const imageSrc = './img/enemy.png'; 
            const health = 100; 

            const enemy = new Enemy(randomX, randomY, velocityX, velocityY, imageSrc, health);
            this.enemies.push(enemy);
        } //end of spawnEnemy

        spawnKnight() {
            const randomX = Math.random() * this.width;
            const randomY = this.height - 345; 
            const velocityX = 2;
            const velocityY = 0;
            const imageSrc = './img/knight-removebg-preview-removebg-preview.png'; 
            const health = 150; 
    
            const knight = new Knight(randomX, randomY, velocityX, velocityY, imageSrc, health);
            this.knights.push(knight);
        } //end of spawnKnight
        
        drawScore(context) {
            context.font = "45px Arial";
            context.fillStyle = "white";
            context.fillText(`Score: ${this.player.score}`, 10, 50);
            
        } //end of drawScore

        handleGameRestart() {
            if (this.input.keys['KeyY'] && this.player.playerHealth <= 0) {
                this.resetPlayerHealth();
                this.player.score = 0;
                this.gameOver = false;
            }
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

            //collision class
            this.collisionHandler.checkCollisions();

            if (this.gameOver) {
                this.handleGameRestart();
                return;
            }

            if (this.player.playerHealth <= 0) {
                this.gameOver = true;
            }

        } //end of deltaTime

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

            // draw the health bar
            context.fillStyle = "white";
            context.fillRect(this.healthBarX, this.healthBarY, this.healthBarWidth, this.healthBarHeight);

            // remaining health
            context.fillStyle = "red";
            const remainingHealthWidth = (this.player.playerHealth / this.playerMaxHealth) * this.healthBarWidth;
            context.fillRect(this.healthBarX, this.healthBarY, remainingHealthWidth, this.healthBarHeight);
            
            if (this.gameOver) {
                context.font = "40px Arial";
                context.fillStyle = "red";
                context.fillText("Game Over", this.width / 2 - 100, this.height / 2);
                context.fillText("Press 'Y' to Play Again", this.width / 2 - 160, this.height / 2 + 50);
            }

            //context.clearRect(0, 0, canvas.width, canvas.height);

        } //end of context
 
    } //end of game class
   
    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    let lastTime = 0;

   function animate(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
   
    game.update(deltaTime);
    game.draw(context);
    requestAnimationFrame(animate);
    
} //end of timstamp

game.resetPlayerHealth();

animate(0);
}); // end of window edvent listener

