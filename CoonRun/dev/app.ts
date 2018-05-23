 class Game {
    // Declare all the stuff
    private canvas:HTMLCanvasElement
    private ctx:CanvasRenderingContext2D|null

    private ground:number

    private player:Player
    private bin:Bin
    // ememies:Enemy[] // hier ga je *vijanden* enemyStuff in zetten

    //private collisionCheck:Boolean
    private dead: boolean

    constructor() {
        // Load in all the stuff
        console.log("new game created!")
        this.canvas = <HTMLCanvasElement>document.getElementById('cnvs')
        this.ctx = this.canvas.getContext("2d")

        this.ground = 720

        this.player = new Player(this.ground)
        this.bin = new Bin(this.ground)

        //this.collisionCheck = false
        this.dead = false

        // Start looping stuff
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop = ():void => {
        // Update stuff
        this.player.update()
        this.bin.update()
        // Check for rectangle collision
        /*if (this.bin.x > this.player.x-this.bin.width && this.bin.x < this.player.x+this.player.width && this.bin.y > this.player.y-this.bin.height && this.bin.y < this.player.y+this.player.height) {
            this.collisionCheck = true;
        } else {
            this.collisionCheck = false;
        }
        
        console.log(this.collisionCheck)
        if (this.collisionCheck) {
            this.bin.x = 1280
        } */

        if (this.collision(this.bin)) {
            this.bin.x = 1280
            if (!this.dead) this.dead = true; else this.dead = false
            console.log("collision detected")
        }
          
        // Draw stuff
        if (this.ctx != null) {
            this.ctx.fillStyle = "#D3D3D3"
            this.ctx.fillRect(0, 0, 1280, 720)
            this.ctx.beginPath()
            this.ctx.fillStyle = "black"
            if (this.dead) this.ctx.fillStyle = "red"
            this.ctx.lineWidth = 5
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)
            this.ctx.fillRect(this.bin.x, this.bin.y, this.bin.width, this.bin.height)
            this.ctx.stroke()
        }
        // Next *frame* stuff
        requestAnimationFrame(this.gameLoop)
     }

     collision(object:object):boolean {
        if (object.x > this.player.x-object.width && object.x < this.player.x+this.player.width && object.y > this.player.y-object.height && object.y < this.player.y+this.player.height) {
            return true;
        } else {
            return false;
        }
     }
}

// Make sure stuff actually happens on load
window.addEventListener("load", () => new Game())

