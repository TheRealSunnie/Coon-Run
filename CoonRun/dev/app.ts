 class Game { // Declare all the stuff
    private canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs')
    private ctx:CanvasRenderingContext2D = this.canvas.getContext("2d")!
    public canvasWidth:number = 1280
    public levelObject: Levels
    public currentLevel:number = 1
    private player:Player
    public bins:Array<Bin> = [];
    public binChance = 0.03 // Chance of bin spawning
    public lifes:Array<Life> = [];
    public lifeChance = 0.01
    public ground:number = 720
    public lifeCount:number = 3 
    public score:number = 0
    public dead:boolean = false
    public objSpeed:number = 10
    public canSpawnLife:boolean = false
    public lifeSpawnCD:number = 1000
    public canSpawnBin:boolean = false
    public binSpawnCD:number = 60
    public single = 0
    public double = 1
    public clouds:Array<Cloud> = [];
    public cloudChance = 0.1
    public cloudSpawnCD:number = 60
    public canSpawnCloud:boolean = false

    constructor() { // Load in all the stuff
        //console.log("new game created!")
        this.levelObject = new Levels(this)
        this.player = new Player(this)
        // Start looping stuff
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop = ():void => {
        // Update stuff
        this.levelObject.update()
        this.player.update()
        // Countdown for spawning
        if (this.binSpawnCD > 0 && !this.canSpawnBin) {
            this.binSpawnCD--
        } else {
            this.binSpawnCD = 70
            this.canSpawnBin = true // Bin may spawn when spawnCD hits 0
        }
        
        if (Math.random() < this.binChance && this.canSpawnBin && !this.dead) {
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
        // Cloud
        if(this.cloudSpawnCD > 0 && !this.canSpawnCloud) {
            this.cloudSpawnCD--
        } else {
            this.cloudSpawnCD = 50
            this.canSpawnCloud = true
        }

        if (Math.random() < this.cloudChance && this.canSpawnCloud) {
            this.clouds.push (new Cloud(this))
            this.canSpawnCloud = false
        }

        let deleteCloud = []
        for(let i=0; i<this.clouds.length; i++) {
            this.clouds[i].update()
            if (!this.clouds[i].alive) {
                deleteCloud.push(i)
            }
        }

        for (const i in deleteCloud) {
            this.clouds.splice(parseInt(i), 1)
        }

        // Life
        if(this.lifeSpawnCD > 0 && !this.canSpawnLife) {
            this.lifeSpawnCD--
        } else {
            this.lifeSpawnCD = 1100
            this.canSpawnLife = true
        }

        if (Math.random() < this.lifeChance && this.canSpawnLife) {
            this.lifes.push (new Life(this))
            this.canSpawnLife = false
        }

        let deleteLife = []
        for(let i=0; i<this.lifes.length; i++) {
            this.lifes[i].update()
            if (!this.lifes[i].alive) {
                deleteLife.push(i)
            }
        }


        for (const i in deleteLife) {
            this.lifes.splice(parseInt(i), 1)
        }

        if (this.lifeCount < 1 && !this.dead) {
            this.dead = true
            console.log("game over")
        }
        if (this.dead) {
            this.levelObject.switch(0)
        }
        if (this.score < 0) {
            this.score = 0
        }
        // Draw stuff
        this.ctx.fillStyle = "#D3D3D3" // Color
        this.ctx.fillRect(0, 0, 1280, 720) // Clears canvas

        this.ctx.fillStyle = "white"
        for(let i=0; i<this.clouds.length; i++) {
            this.ctx.fillRect(this.clouds[i].x, this.clouds[i].y, this.clouds[i].width, this.clouds[i].height)
        }
        
        this.ctx.fillStyle = "black"
        // Use fillRect to draw blocks
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height)
        for(let i=0; i<this.bins.length; i++) {
            this.ctx.fillRect(this.bins[i].x, this.bins[i].y, this.bins[i].width, this.bins[i].height)
        }
        for(let i=0; i<this.levelObject.words.length; i++) {
            if(this.levelObject.words[i].fake) this.ctx.fillStyle = "red"; else this.ctx.fillStyle = "green"
            this.ctx.fillRect(this.levelObject.words[i].x, this.levelObject.words[i].y, this.levelObject.words[i].width, this.levelObject.words[i].height)
        }

        for(let i=0; i<this.lifes.length; i++) {
            this.ctx.fillStyle = "#00FFFF";
            this.ctx.fillRect(this.lifes[i].x, this.lifes[i].y, this.lifes[i].width, this.lifes[i].height)
        }
        


        this.ctx.fillStyle = "black"
        this.ctx.font = "30px Arial"
        this.ctx.fillText(this.lifeCount + " levens", 150, 450)
        this.ctx.fillText("Score: " + this.score, 50, 100)
        this.ctx.fillText(this.levelObject.proverb, this.canvasWidth/2, 100)
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