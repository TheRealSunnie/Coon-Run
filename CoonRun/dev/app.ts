 class Game { // Declare all the stuff
    private canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    private ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    public canvasWidth:number = 1280
    public level: Levels
    private player:Player
    public bins:Array<Bin> = [];
    public binChance = 0.05 // Chance of bin spawning
    public ground:number = 720
    public lifes:number = 3 
    public dead:boolean = false
    public objSpeed:number = 9
    private canSpawnBin:boolean = false
    private binSpawnCD:number = 60
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
        // Update stuff
        this.level.update()
        console.log(this.objSpeed)
        this.player.update()
        // Countdown for spawning
        if (this.binSpawnCD > 0 && !this.canSpawnBin) {
            this.binSpawnCD--
        } else {
            this.binSpawnCD = 50
            this.canSpawnBin = true // Bin may spawn when spawnCD hits 0
        }
        
        if (Math.random() < this.binChance && this.canSpawnBin) {
            let binType:number
            if (Math.random()>.5) { // Decide on bin type
                binType = 0
            } else {
                binType = 1
            }
            // New bin
            this.bins.push(new Bin(this, binType))
            this.canSpawnBin = false // Restart the cooldown for spawning
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
        // Use fillRect to draw blocks
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)
        for(let i=0; i<this.bins.length; i++) {
            this.ctx.fillRect(this.bins[i].x, this.bins[i].y, this.bins[i].width, this.bins[i].height)
        }
        for(let i=0; i<this.level.words.length; i++) {
            if(this.level.words[i].fake) this.ctx.fillStyle = "red"; else this.ctx.fillStyle = "green"
            this.ctx.fillRect(this.level.words[i].x, this.level.words[i].y, this.level.words[i].width, this.level.words[i].height)
        }

        this.ctx.fillStyle = "black"
        this.ctx.font = "30px Arial"
        this.ctx.fillText(this.lifes + " levens", 150, 450)
        this.ctx.fillText(this.level.proverb, this.canvasWidth/2, 100)
        this.ctx.stroke() // This draws all of the above
        // Next frame
        requestAnimationFrame(this.gameLoop)
     }

    collision(object:Bin | Trash | Word):boolean { // Checks collision between the player and a given object
        if (object.x > this.player.x-object.width && object.x < this.player.x+this.player.width && object.y > this.player.y-object.height && object.y < this.player.y+this.player.height) {
            return true;
        } else {
            return false;
        }
    }
}

// Makes sure stuff actually happens on load
window.addEventListener("load", () => new Game())