 class Game { // Declare all the stuff
    private canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    public ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    public canvasWidth:number = 1280
    public Spawner:Spawner
    public levelObject: Levels
    public currentLevel:number = 0
    private player:Player
    public ground:number = 720
    public maxLifes:number = 2
    public lifeCount:number = this.maxLifes
    public score:number = 0
    public dead:boolean = false
    public startObjSpeed:number = 12
    public objSpeed:number = this.startObjSpeed

    constructor() { // Load in all the stuff
        //console.log("new game created!")
        this.levelObject = new Levels(this)
        this.Spawner = new Spawner(this)
        this.player = new Player(this)
        // Start looping stuff
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop = ():void => {
        // Draw setup
        this.ctx.fillStyle = "#D3D3D3" // Color
        this.ctx.fillRect(0, 0, 1280, 720) // Clears canvas

        // Update stuff
        this.levelObject.update()
        this.player.update()
        this.Spawner.update()

        this.ctx.fillStyle = "black"
        this.ctx.font = "30px Arial"
        this.ctx.fillText(this.lifeCount + " levens", 150, 450)
        this.ctx.fillText("Score: " + this.score, 50, 100)
        // Proverb string
        this.ctx.fillText(this.levelObject.currentString, this.canvasWidth/2, 100)
        this.ctx.stroke() // This draws all of the above
        // Next frame
        requestAnimationFrame(this.gameLoop)
     }


    collision(object:Bin | Trash | Word | Life):boolean { // Checks collision between the player and a given object
        if (object.x > this.player.x-object.width && object.x < this.player.x+this.player.width && object.y > this.player.y-object.height && object.y < this.player.y+this.player.height) {
            return true;
        } else {
            return false;
        }
    }
}

// Makes sure stuff actually happens on load
window.addEventListener("load", () => new Game())