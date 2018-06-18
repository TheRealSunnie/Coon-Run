/// <reference path="basicObject.ts"/>

class Cloud extends basicObject {

    
    constructor (game:Game) {
        super(game)

        this.Image = <HTMLImageElement>document.getElementById('wolk')
        this.width = 150
        this.height = 75
        this.game = game
        this.x = this.game.canvasWidth
        this.y = Math.floor(Math.random()*150) + 5
        this.hspeed = this.game.objSpeed
    }


    update():void {
        this.hspeed = this.game.objSpeed

        // Draw
        this.game.ctx.fillStyle = "white"
        super.update()
    }
}