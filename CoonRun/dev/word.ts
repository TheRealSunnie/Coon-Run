class Word {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    public hspeed:number
    private gameObject:Game
    public name:number
    public fake:boolean = false
    public alive:boolean = true

    constructor (game:Game, name:number, fake:boolean) { 
        this.gameObject = game
        this.x = this.gameObject.canvasWidth
        this.y = this.gameObject.ground-this.height - 250
        this.hspeed = this.gameObject.objSpeed
        this.name = name
        this.fake = fake
    }

    update():void {

        if (this.gameObject.collision(this)) { 
            this.alive = false
            if(!this.fake) this.gameObject.level.switch(2)
        }
        if (this.x < 0-this.width) { 
            this.alive = false
        }
        this.x -= this.hspeed
    }
}