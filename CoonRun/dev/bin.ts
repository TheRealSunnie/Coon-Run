class Bin {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public hspeed:number
    private gameObject:Game
    public type:number
    public alive:boolean = true

    constructor (game:Game, type:number) { // Get game, ground height, canvas width, moving speed and type
        this.gameObject = game
        this.hspeed = this.gameObject.objSpeed
        this.x = this.gameObject.canvasWidth
        this.y = this.gameObject.ground-this.height
        this.type = type

        switch (this.type) { // Bins can have different types/sizes/sprites..
            case this.gameObject.single:
                this.width = 75
                this.height = 100
                this.y = this.gameObject.ground-this.height
                break;

            case this.gameObject.double:
                this.width = 100
                this.height = 120
                this.y = this.gameObject.ground-this.height
                break;
        }
    }

    update():void {
        this.hspeed = this.gameObject.objSpeed
        // If there is a collision toggle the player state
        if (this.gameObject.collision(this)) { 
            this.alive = false
            this.gameObject.lifes--
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