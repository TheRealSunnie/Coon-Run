 class Game {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player:Player
    // ememies:Enemy[] // hier ga je vijanden in zetten

    constructor(){
        console.log("new game created!")

        this.player = new Player()
        

        this.canvas = <HTMLCanvasElement>document.getElementById('cnvs')!;
        
        this.ctx = this.canvas.getContext("2d");
        this.gameLoop();
    }

    gameLoop() {
        this.player.update()
        
        this.ctx.fillStyle = "#D3D3D3";
        this.ctx.fillRect(0, 0, 1280, 720);
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(0, 620, 100, 100);
        this.ctx.stroke();

        requestAnimationFrame(this.gameLoop);
     }
}

window.addEventListener("load", () => new Game())

