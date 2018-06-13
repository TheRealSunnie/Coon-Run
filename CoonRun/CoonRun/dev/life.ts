class Life {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public hspeed:number
    private game:Game
    public alive:boolean = true

    constructor (game:Game) { // Get game, ground height, canvas width, moving speed and type
        this.game = game
        this.hspeed = this.game.objSpeed
        this.x = this.game.canvasWidth
        this.y = 400
    }

    update():void {
        this.hspeed = this.game.objSpeed
        // If there is a collision toggle the player state
        if (this.game.collision(this)) { 
            this.alive = false
            this.game.lifeCount++
            //if (!this.game.dead) this.game.dead = true; else this.game.dead = false
            //console.log("collision detected")
        }
        // Deactivate when bin leaves left side of screen
        if (this.x < 0-this.width) { 
            // Delete bin
            this.alive = false
        }
        // Move
        this.x -= this.hspeed

        // Draw
        this.game.ctx.fillStyle = "#00FFFF"
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)    }
}