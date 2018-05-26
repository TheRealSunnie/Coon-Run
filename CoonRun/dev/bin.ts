class Bin {

    public width:number = 50
    public height:number = 50
    public x:number
    public y:number
    private canvasWidth:number
    public hspeed:number
    public active:boolean = false
    
    public single = 0
    public double = 1
    public type = this.single

    constructor(ground:number, canvasWidth:number, hspeed:number) { // Get ground height, canvas width and moving speed
        this.canvasWidth = canvasWidth
        this.x = canvasWidth
        this.y = ground-this.height
        this.hspeed = hspeed
    }

    update():void {
        switch (this.type) { // Bins can have different types/sizes/sprites..
            case this.single:
                this.width = 75
                break;

            case this.double:
                this.width = 150
                break;
        }
        // If !active reset position to right side of the screen, else start moving <-
        if (!this.active) {
            this.x = this.canvasWidth
        } else {
            this.x -= this.hspeed
        }
        if (this.x < 0-this.width) { // Deactivate when bin leaves left side of screen
            this.active = false
        }
    }
}