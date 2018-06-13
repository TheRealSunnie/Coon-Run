class Cloud {

    public wolkImage: HTMLImageElement = <HTMLImageElement>document.getElementById('wolk')

    public width: number = 100
    public height: number = 50
    public x:number
    public y:number
    public hspeed:number
    private game:Game
    public alive:boolean = true

    
    constructor (game:Game) {
        this.game = game
        this.x = this.game.canvasWidth
        this.y = Math.floor(Math.random()*200) + 2
        this.hspeed = this.game.objSpeed
    }


    update():void {
        this.hspeed = this.game.objSpeed
        if (this.x < 0-this.width) {
            this.alive = false
        }

        this.x -= this.hspeed

        // Draw
        this.game.ctx.fillStyle = "white"
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.game.ctx.drawImage(this.wolkImage, this.x, this.y, this.width, this.height)
    }
}