export class CollisionHandler {
    constructor(player, projectiles, enemies, knights) {
        this.player = player;
        this.projectiles = projectiles;
        this.enemies = enemies;
        this.knights = knights;
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
                    // remove the enemy from the game
                    this.enemies.splice(j, 1);
                    this.player.score += 10;

                    // Save the updated score to localStorage
                    localStorage.setItem("score", this.player.score);

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
                this.player.playerHealth -= 20;

                // Save the updated score to localStorage
                localStorage.setItem("playerHealth", this.player.playerHealth);

                // Play the sound effect when hit
                const hurt = document.getElementById('hurtSound');
                if (hurt) {
                    hurt.play();
                }
                // when health reaches zero or less - Game Over!
                if (this.player.playerHealth <= 0) {
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
                    this.player.score += 20;
                    
                    // Save the updated score to localStorage
                    localStorage.setItem("score", this.player.score);
                    
                    //sound
                    const knightKilledSound = document.getElementById('knightKilledSound');
                    if (knightKilledSound) {
                        knightKilledSound.play();
                    }
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
                this.player.playerHealth -= 30;
                // Save the updated score to localStorage
                localStorage.setItem("playerHealth", this.player.playerHealth);

                // Play the sound effect when hit
                const hurt = document.getElementById('hurtSound');
                if (hurt) {
                    hurt.play();
                }
                // when health reaches zero or less - Game Over!
                if (this.player.playerHealth <= 0) {
                    console.log("Game Over!");
                } //end of if statement
            } //else
        } //end of knight collisions for loop
        
    } // end of checkCollisions
} //end of collisionHandler
