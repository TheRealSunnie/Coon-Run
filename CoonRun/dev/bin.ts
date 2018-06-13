class Bin {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public hspeed:number
    private game:Game
    public type:number
    public alive:boolean = true

    constructor (game:Game, type:number) {
        this.game = game
        this.hspeed = this.game.objSpeed
        this.type = type
        switch (this.type) { // Bins can have different types/sizes/sprites..
            case this.game.Spawner.single:
                this.width = 50
                this.height = 125
                this.y = this.game.ground-this.height
                break;

            case this.game.Spawner.double:
                this.width = 100
                this.height = 125
                this.y = this.game.ground-this.height
                break;
            case this.game.Spawner.triple:
                this.width = 150
                this.height = 125
                this.y = this.game.ground-this.height
                break;
        }

        this.x = this.game.canvasWidth
        this.y = this.game.ground-this.height
    }

    update():void {
        this.hspeed = this.game.objSpeed
        // If there is a collision toggle the player state
        if (this.game.collision(this)) { 
            this.alive = false
            this.game.lifeCount--
        }
        // Deactivate when bin leaves left side of screen
        if (this.x < 0-this.width) { 
            // Delete bin
            this.alive = false
        }
        // Move
        this.x -= this.hspeed

        // Draw
        this.game.ctx.fillStyle = "black"
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}