class Bin {

    public width: number
    public height: number
    public x: number
    public y: number
    public hspeed: number

    constructor(ground:number) {
        console.log("hier komt een prullebakkie")
        this.width = 50
        this.height = 50
        this.x = 1280
        this.y = ground-this.height
        this.hspeed = 12
    }

    update():void {
        this.x -= this.hspeed
        if (this.x < 0-this.width) {
            this.x = 1280
        }
    }
}