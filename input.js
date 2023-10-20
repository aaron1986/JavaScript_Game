export class inputHandler {
    constructor(game) { // Pass the game instance to inputHandler
        this.keys = [];
        this.game = game; // Store the game instance for access in event handlers

        window.addEventListener("keydown", (e) => {
            if (
                (e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Space") &&
                this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key);
            } else if (e.key === "m") {
                // Create a projectile when 'm' is pressed
                this.game.createProjectile();
            }
            
        });

        window.addEventListener("keyup", (e) => {
            if (
                e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Space"
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}
