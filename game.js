import {Player} from './player.js';
import {inputHandler} from './input.js';

window.addEventListener("load", function(){
    const canvas = this.document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 800;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.Player = new Player(this);
            this.input = new inputHandler();
        }

        update() {
            this.Player.update(this.input.keys);
        }

        draw(context) {
            this.Player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate() {
        context.clearRect(0,0, canvas.width, canvas.height);
        game.update();
        game.draw(context);
        requestAnimationFrame(animate);
    }
    animate();

});