class Bin {

    public x: number
    public y: number
    public vspeed: number
    public width: number
    public height: number

    constructor() {
        console.log("hier komt een prullebakkie")
        this.x = 110
        this.y = 600
        this.width = 100
        this.height = 100
        this.vspeed = 0
    }

    update():void {
        console.log("bin")
    }
}