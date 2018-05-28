 class Game { // Declare all the stuff
    private canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    private ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    private canvasWidth:number = 1280
    public level: Levels
    private player:Player
    public bins:Array<Bin> = [];
    public spawnChance = 0.05 // Chance of bin spawning
    private ground:number = 720
    public lifes:number = 3 
    public dead:boolean = false
    public objSpeed:number = 6
    private canSpawn:boolean = false
    private spawnCD:number = 60
    public single = 0
    public double = 1

    constructor() { // Load in all the stuff
        //console.log("new game created!")
        this.level = new Levels(this)
        this.player = new Player(this.ground)
        // Start looping stuff
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop = ():void => {
        console.log(this.objSpeed)
        if (this.lifes == -10) this.level.update(2)
        // Update stuff
        this.player.update()
        // Countdown for spawning
        if (this.spawnCD > 0 && !this.canSpawn) {
            this.spawnCD--
        } else {
            this.spawnCD = 50
            this.canSpawn = true // Bin may spawn when spawnCD hits 0
        }
        
        if (Math.random() < this.spawnChance && this.canSpawn) {
            let binType
            if (Math.random()>.5) { // Decide on bin type
                binType = 0
            } else {
                binType = 1
            }
            // New bin
            this.bins.push(new Bin(this, this.ground, this.canvasWidth, binType))
            console.log("Bin created")
            this.canSpawn = false // Restart the cooldown for spawning
        }
        let deleteBin = [] // Temp holder for removed bins
        for(let i=0; i<this.bins.length; i++) {
            this.bins[i].update() // Moves the bins
            if (!this.bins[i].alive) {
                deleteBin.push(i) // Move object to the temp holder
            }
        }
        for (const i in deleteBin) {
            this.bins.splice(parseInt(i), 1) // Empty the temp holder
        }
        if (this.lifes < 1 && !this.dead) {
            this.dead = true
            console.log("game over")
        }
        // Draw stuff
        this.ctx.fillStyle = "#D3D3D3" // Color
        this.ctx.fillRect(0, 0, 1280, 720) // Clears canvas
        this.ctx.fillStyle = "black"
        if (this.dead) this.ctx.fillStyle = "red"
        // Use fillRect to draw blocks
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)
        for(let i=0; i<this.bins.length; i++) {
            this.ctx.fillRect(this.bins[i].x, this.bins[i].y, this.bins[i].width, this.bins[i].height)
        }
        this.ctx.font = "30px Arial"
        this.ctx.fillText(this.lifes + " lifes", 50, 450,100)
        this.ctx.stroke() // This draws all of the above
        // Next frame
        requestAnimationFrame(this.gameLoop)
     }

    collision(object:Bin | Trash):boolean { // Checks collision between the player and a given object
        if (object.x > this.player.x-object.width && object.x < this.player.x+this.player.width && object.y > this.player.y-object.height && object.y < this.player.y+this.player.height) {
            return true;
        } else {
            return false;
        }
    }
}

// Makes sure stuff actually happens on load
window.addEventListener("load", () => new Game())