/// <reference path="basicObject.ts"/>

class Bin extends basicObject {
    
    public type:number

    constructor (game:Game, type:number) {
        super(game)

        this.Image = <HTMLImageElement>document.getElementById('bin')

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
        
        // Draw
        this.game.ctx.fillStyle = "black"
        super.update()
    }
}