class Word {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public hspeed:number
    private game:Game
    public name:number
    public fake:boolean = false
    public alive:boolean = true

    constructor (game:Game, name:number, fake:boolean) { 
        this.game = game
        this.x = this.game.canvasWidth
        this.y = this.game.ground-this.height - 250
        this.hspeed = this.game.objSpeed
        this.name = name
        this.fake = fake
    }

    update():void {
        this.hspeed = this.game.objSpeed
        if (this.game.collision(this)) { 
            this.alive = false
            if(!this.fake) { 
                this.game.currentLevel++
                this.game.levelObject.switch(this.game.currentLevel)
                this.game.score++
            } else {
                this.game.score--
            }
        }
        if (this.x < 0-this.width) { 
            this.alive = false
        }
        this.x -= this.hspeed

        // Draw
        if (this.fake) this.game.ctx.fillStyle = "red"; else this.game.ctx.fillStyle = "green"
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}