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
            this.playerMaxHealth = 200; 
            this.playerHealth = this.playerMaxHealth;
            this.healthBarWidth = 300; 
            this.healthBarHeight = 20; 
            this.healthBarX = 20; 
            this.healthBarY = 80; 
        }

        checkCollisions() {
            // Check collisions with the 'enemy' enemies
            for (let i = this.projectiles.length - 1; i >= 0; i--) {
                const projectile = this.projectiles[i];
                for (let j = this.enemies.length - 1; j >= 0; j--) {
                    const enemy = this.enemies[j];
                    
                    if (
                        projectile.x < enemy.x + enemy.width &&
                        projectile.x + projectile.width > enemy.x &&
                        projectile.y < enemy.y + enemy.height &&
                        projectile.y + projectile.height > enemy.y
                    ) {
                        // Collision with enemy
                        this.projectiles.splice(i, 1); 
                        // remove the enemy from game
                        this.enemies.splice(j, 1); 
                        this.score += 10;
                        
                        // Play the sound effect when firing a projectile
                        const splatSound = document.getElementById('splatSound');
                        if (splatSound) {
                            splatSound.play();
                        }
                    }
                } //end of j for loop
            } //end of i for loop
            
            // Check collisions with the player and enemies
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];
                
                // Check if the enemy touches the player
                if (
                    this.player.x < enemy.x + enemy.width &&
                    this.player.x + this.player.width > enemy.x &&
                    this.player.y < enemy.y + enemy.height &&
                    this.player.y + this.player.height > enemy.y
                ) {
                    this.enemies.splice(j, 1); 
                    this.playerHealth -= 20; 
                    // Play the sound effect when hit
                    const hurt = document.getElementById('hurtSound');
                    if (hurt) {
                        hurt.play();
                    }
                    // when health reaches zero or less - Game Over!
                    if(this.playerHealth <= 0) {
                        console.log("Game Over!");
                    }
                }
            } //end of j for loop
        
        
            // very DRY!
            for (let i = this.projectiles.length - 1; i >= 0; i--) {
                const projectile = this.projectiles[i];
                for (let k = this.knights.length - 1; k >= 0; k--) {
                    const knight = this.knights[k];

                    if (
                        projectile.x < knight.x + knight.width &&
                        projectile.x + projectile.width > knight.x &&
                        projectile.y < knight.y + knight.height &&
                        projectile.y + projectile.height > knight.y
                    ) {
                        this.projectiles.splice(i, 1); 
                        this.knights.splice(k, 1); 
                        this.score += 20;
                        //sound
                        const knightKilledSound = document.getElementById('knightKilledSound');
                        if (knightKilledSound) {
                        knightKilledSound.play();
                        } //end of if statement
                    } //2nd if statement
                } //end of knight for loop
            } //end of very DRY for loop
       // Check collisions with the 'knight' enemies
    for (let i = this.knights.length - 1; i >= 0; i--) {
        const knight = this.knights[i];
        if (
            this.player.x < knight.x + knight.width &&
            this.player.x + this.player.width > knight.x &&
            this.player.y < knight.y + knight.height &&
            this.player.y + this.player.height > knight.y
        ) {
            this.knights.splice(i, 1); 
            this.playerHealth -= 30; 
            // Play the sound effect when hit
            const hurt = document.getElementById('hurtSound');
            if (hurt) {
                hurt.play();
            }
            // when health reaches zero or less - Game Over!
            if(this.playerHealth <= 0) {
                console.log("Game Over!");
                    } //end of if statement

                } //else
            } //end of knight collisions for loop

        } // end of checkCollisions

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
            context.fillText(`Score: ${this.score}`, 10, 50);
            
            let highScores = JSON.parse(localStorage.getItem("score"));

            localStorage.setItem("score", this.score);
        } //end of drawScore
        
  
        
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
            const remainingHealthWidth = (this.playerHealth / this.playerMaxHealth) * this.healthBarWidth;
            context.fillRect(this.healthBarX, this.healthBarY, remainingHealthWidth, this.healthBarHeight);
        } //end of context
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
} //end of timstamp

animate(0);
}); // end of window edvent listener

