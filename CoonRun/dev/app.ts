 class Game { // Declare all the stuff
    private canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    private ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    private canvasWidth:number = 1280
    private player:Player
    private bins:Array<Bin> = [];

    private maxBins:number = 5
    private ground:number = 720
    private dead:boolean = false
    private objSpeed:number = 10
    private canSpawn:boolean = false
    private spawnCD:number = 100

    constructor() { // Load in all the stuff
        //console.log("new game created!")
        // New player
        this.player = new Player(this.ground)
        // New bins
        for(let i=0; i<this.maxBins; i++) {
            this.bins.push(new Bin(this.ground, this.canvasWidth, this.objSpeed));
            //console.log("Bin created")
        }
        // Start looping stuff
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop = ():void => {
        // Update stuff
        this.player.update()
        // Make bins appear randomly (temp solution)
        let chance = 0.002 // Chance of spawning
        // Countdown for spawning
        if (this.spawnCD > 0 && !this.canSpawn) {
            this.spawnCD--
        } else {
            this.spawnCD = 120
            this.canSpawn = true // Bin may spawn when spawnCD hits 0
        }
        for(let i=0; i<this.maxBins; i++) { // For every bin in the array
            if (Math.random() < chance && this.canSpawn) {
                if (Math.random()>.5) { // Decide on bin type
                this.bins[i].type = this.bins[i].single
                } else {
                    this.bins[i].type = this.bins[i].double
                }
                this.bins[i].update() // Apply bin type without moving
                // Reset x/y positions after resizing
                this.bins[i].x = this.canvasWidth
                this.bins[i].y = this.ground-this.bins[i].height
                this.bins[i].active = true // Activate a bin to move
                this.canSpawn = false // Restart the cooldown for spawning
            }
            if (this.collision(this.bins[i])) { // If there is a collision toggle the player state
                this.bins[i].active = false
                if (!this.dead) this.dead = true; else this.dead = false
                console.log("collision detected")
            }
            this.bins[i].update() // Moves the bins 
        }
        // Draw stuff
        this.ctx.fillStyle = "#D3D3D3" // Color
        this.ctx.fillRect(0, 0, 1280, 720) // Clears canvas
        this.ctx.fillStyle = "black"
        if (this.dead) this.ctx.fillStyle = "red"
        // Use fillRect to draw blocks
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)
        for(let i=0; i<this.maxBins; i++) {
            this.ctx.fillRect(this.bins[i].x, this.bins[i].y, this.bins[i].width, this.bins[i].height)
        }
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