export class inputHandler{
    constructor() {
        this.keys = [];
        window.addEventListener("keydown", e => {
           if((e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Space"
           ) && this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
           }
           console.log(e.key, this.keys);
        });

        window.addEventListener("keyup", e => {
            if(e.key === "ArrowDown" || 
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "space") {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}