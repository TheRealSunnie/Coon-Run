class Life {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public hspeed:number
    private gameObject:Game
    public alive:boolean = true

    constructor (game:Game) { // Get game, ground height, canvas width, moving speed and type
        this.gameObject = game
        this.hspeed = this.gameObject.objSpeed
        this.x = this.gameObject.canvasWidth
        this.y = 400
    }

    update():void {
        this.hspeed = this.gameObject.objSpeed
        // If there is a collision toggle the player state
        if (this.gameObject.collision(this)) { 
            this.alive = false
            this.gameObject.lifeCount++
            //if (!this.gameObject.dead) this.gameObject.dead = true; else this.gameObject.dead = false
            //console.log("collision detected")
        }
        // Deactivate when bin leaves left side of screen
        if (this.x < 0-this.width) { 
            // Delete bin
            this.alive = false
        }
        // Move
        this.x -= this.hspeed
    }
}