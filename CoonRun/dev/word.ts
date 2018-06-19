class Word {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public hspeed:number
    private game:Game
    private index:number
    public name:string
    public fake:boolean = false
    public alive:boolean = true

    constructor (game:Game, index:number, fake:boolean) { 
        this.game = game
        this.x = this.game.canvasWidth
        this.y = this.game.ground-this.height - 250
        this.hspeed = this.game.objSpeed
        this.fake = fake
        this.index = index
        if (this.fake) {
            this.name = this.game.levelObject.currentProverb.incorrect[index]
        } else {
            this.name = this.game.levelObject.currentProverb.correct[index]
        }
    }

    update():void {
        this.hspeed = this.game.objSpeed
        if (this.game.collision(this)) { 
            this.alive = false
            if(!this.fake) { 
                this.game.levelObject.currentProverb.correct.splice(this.index, 1)
                //console.log(this.game.levelObject.currentProverb.correct.length);
            } else {
                // Loses points
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