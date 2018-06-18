/// <reference path="basicObject.ts"/>

class Bin extends basicObject {
    
    public type:number

    constructor (game:Game, type:number) {
        super(game)

 

        this.game = game
        this.hspeed = this.game.objSpeed
        this.type = type
        switch (this.type) { // Bins can have different types/sizes/sprites..
            case this.game.Spawner.single:
                this.width = 75
                this.height = 125
                this.y = this.game.ground-this.height
                this.Image = <HTMLImageElement>document.getElementById('bin')
                break;
            case this.game.Spawner.double:
                this.width = 150
                this.height = 125
                this.y = this.game.ground-this.height
                this.Image = <HTMLImageElement>document.getElementById('bin2')
                break;
            case this.game.Spawner.triple:
                this.width = 150
                this.height = 125
                this.y = this.game.ground-this.height
                this.Image = <HTMLImageElement>document.getElementById('bin3')
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