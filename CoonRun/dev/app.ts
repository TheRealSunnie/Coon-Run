 class Game { // Declare all the stuff
    private canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    public ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    public canvasWidth:number = 1280
    public Spawner:Spawner
    public levelObject: Levels
    public player:Player
    public ground:number = 650
    public startingLifes:number = 2
    public lifeCount:number = this.startingLifes
    public score:number = 0
    private highscore:number = 0
    public dead:boolean = false
    public startObjSpeed:number = 12
    public objSpeed:number = this.startObjSpeed
    public bgSpeed:number = 1
    public cloudSpeed:number = .5

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
        this.ctx.drawImage(this.levelObject.levelSprite, 0, 0, 1280, 720) // Clears canvas
        this.ctx.drawImage(this.levelObject.levelSprite, 0, 0, 1280, 720) // Clears canvas

        // Update stuff
        this.Spawner.update()
        this.levelObject.update()
        this.player.update()

        if (this.lifeCount < 1 && !this.dead) {
            this.dead = true
            this.lifeCount = 0
            this.highscore = this.score
        }

        if (this.score < 0) {
            this.score = 0
        }

        this.ctx.fillStyle = "black"
        this.ctx.font = "32px VT323"
        // Scores and lifes
        this.ctx.textAlign="start"
        this.ctx.fillText(this.lifeCount + " levens", 150, 450)
        this.ctx.fillText("Score: " + this.score + this.highscore + this.levelObject.currentLevel, 50, 200)
        // Proverb string
        this.ctx.textAlign="center"
        this.ctx.font = "48px VT323"
        this.ctx.fillText(this.levelObject.currentString, this.canvasWidth/2, 100)
        // Start screen
        if (this.levelObject.currentLevel == 0) {
            this.ctx.fillText("PRESS SPACE TO START", this.canvasWidth/2, this.canvas.height/2)
        }
        this.ctx.stroke() // This draws all of the above
        // Next frame
        requestAnimationFrame(this.gameLoop)
     }


    collision(object:Bin | Trash | Word | Life):boolean { // Checks collision between the player and a given object
        if (object.x > this.player.x+60-object.width && object.x < this.player.x+this.player.width-10 && object.y > this.player.y-object.height && object.y < this.player.y+this.player.height) {
            return true;
        } else {
            return false;
        }
    }
}

// Makes sure stuff actually happens on load
window.addEventListener("load", () => new Game())