class Trash {

    public width:number
    public height:number
    public x:number
    public y:number
    private canvasWidth:number
    public hspeed:number
    public active:boolean

    constructor(ground:number, canvasWidth:number, hspeed:number) {
        console.log("hier komt een prullebakkie")
        this.width = 50
        this.height = 50
        this.canvasWidth = canvasWidth
        this.x = canvasWidth
        this.y = ground-this.height
        this.hspeed = hspeed
        this.active = false
    }

    update():void {
        if (!this.active) {
            this.x = this.canvasWidth
        } else {
            this.x -= this.hspeed
        }
        if (this.x < 0-this.width) {
            this.active = false
        }
    }
}