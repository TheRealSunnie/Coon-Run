class Word {

    public width:number = 75
    public height:number = 75
    public x:number
    public y:number
    public hspeed:number
    private game:Game
    private index:number
    public fake:boolean = false
    public alive:boolean = true

    private Image: HTMLImageElement = <HTMLImageElement>document.getElementById('appel')
    private Sound1: HTMLAudioElement = <HTMLAudioElement>document.getElementById('Correct_SW')
    private Sound2: HTMLAudioElement = <HTMLAudioElement>document.getElementById('False_SW')

    constructor (game:Game, index:number, fake:boolean, height:number) { 
        this.game = game
        this.x = this.game.canvasWidth
        this.y = height
        this.hspeed = this.game.objSpeed
        this.fake = fake
        this.index = index
        if (this.fake) {
            this.Image = <HTMLImageElement>document.getElementById(this.game.levelObject.proverbs.list[this.game.levelObject.currentProverb].incorrect[index])
        } else {
            this.Image = <HTMLImageElement>document.getElementById(this.game.levelObject.proverbProgress[index])
        }
    }

    update():void {
        this.hspeed = this.game.objSpeed
        if (this.game.collision(this)) { 
            this.alive = false
            if(!this.fake) { 
                this.game.levelObject.proverbProgress.splice(this.index, 1)  
                this.game.score += 1000  
<<<<<<< HEAD
                let sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('correctSnd')
                sound.play()
=======
                this.Sound1.play()
>>>>>>> 13bc8c698b1d4efcf3f0846b430c7050c68baf80
            } else {
                // Loses points
                this.game.score -= 1000  
                this.Sound2.play()
                if (this.game.score < 0) {
                    this.game.score = 0
                }
                let sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('incorrectSnd')
                sound.play()
            }
        }
        if (this.x < 0-this.width) { 
            this.alive = false
        }
        this.x -= this.hspeed

        // Draw
        if (this.fake) this.game.ctx.fillStyle = "red"; else this.game.ctx.fillStyle = "green"
        //this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.game.ctx.drawImage(this.Image, this.x, this.y, this.width, this.height)
    }
}