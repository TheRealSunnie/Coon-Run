class Player {

    public width:number
    public height:number
    public x:number
    public y:number
    public ground:number
    public jumping:boolean
    public vSpeed:number
    public jumpSpeed:number
    public acceleration:number
    public gravity:number
    private jumpHeight:number
    private minJumpHeight:number
    private grounded:boolean
    private mPressed:boolean
    private mReleased:boolean

    constructor(ground:number) {
        console.log("i am a player!")
        this.width = 100
        this.height = 100
        this.x = 15
        this.y = ground-1-this.height
        this.ground = ground-1
        this.jumping = false
        this.vSpeed = 0
        this.jumpSpeed = 20
        this.acceleration = 5
        this.gravity = -20
        this.jumpHeight = ground - 400
        this.minJumpHeight = ground - 300
        this.grounded = true
        this.mPressed = false
        this.mReleased = false

        window.addEventListener("mousedown", () => this.pressed())
        window.addEventListener("mouseup", () => this.released())
    }

    update():void {
        //console.log("updating the player")
        // Check if grounded
        if (this.y+this.height == this.ground) this.grounded = true
        // Check if can jump and enable jump
        if (this.grounded) {
            this.vSpeed = 0
            if (this.mPressed) this.jumping = true
        }
        // Minimum jump
        if (this.jumping && this.mReleased && this.y < this.minJumpHeight) {
            this.jumping = false
        }
        // Break if player reaches max height
        if (this.y < this.jumpHeight) {
            this.jumping = false
        }
        // Start jumping
        if (this.jumping) {
            this.grounded = false
            this.vSpeed += this.acceleration
            if (this.vSpeed > this.jumpSpeed) this.vSpeed = this.jumpSpeed
        }
        // Break and start landing
        if (!this.jumping) {
            this.vSpeed -= this.acceleration
            if (this.vSpeed < this.gravity) this.vSpeed = this.gravity
        }
        
        // Move
        this.y -= this.vSpeed
        // Hit ground
        if (this.y > this.ground-this.height) {
            this.y = this.ground-this.height
            //this.grounded = true
        }
        //console.log(this.vSpeed)
    }

    pressed():void {
        console.log("pressed")
        this.mPressed = true
        this.mReleased = false
    }

    released():void {
        console.log("release");
        this.mPressed = false
        this.mReleased = true
    }
}