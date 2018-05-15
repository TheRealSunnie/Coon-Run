 class Game {
    // Declare all the stuff
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D|null;

    ground:number

    player:Player
    // ememies:Enemy[] // hier ga je *vijanden* enemyStuff in zetten

    constructor(){
        // Load in all the stuff
        console.log("new game created!")
        this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");

        this.ground = 620

        this.player = new Player(this.ground)

        // Start looping stuff
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop = ():void => {
        // Update stuff
        this.player.update()
          
        // Draw stuff
        if (this.ctx != null) {
            this.ctx.fillStyle = "#D3D3D3";
            this.ctx.fillRect(0, 0, 1280, 720);
            this.ctx.beginPath();
            this.ctx.fillStyle = "black";
            this.ctx.lineWidth = 5;
            this.ctx.fillRect(this.player.x, this.player.y, 100, 100);
            this.ctx.stroke();
        }
        // Next *frame* stuff
        requestAnimationFrame(this.gameLoop);
     }
}

// Make sure stuff actually happens on load
window.addEventListener("load", () => new Game())

