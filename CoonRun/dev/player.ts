class Player {
    public width:number = 100
    public height:number = 200
    public x:number = 15
    public y:number
    public ground:number
    public jumping:boolean = false
    public vSpeed:number = 0
    public jumpSpeed:number = 30
    public acceleration:number = 3.5
    public gravity:number = -30
    private jumpHeight:number
    private minJumpHeight:number
    private grounded:boolean = true
    private mPressed:boolean = false
    private mReleased:boolean = false
    public sound:HTMLAudioElement = <HTMLAudioElement>document.getElementById('jump')

    constructor(ground:number) {
        //console.log("i am a player!")
        this.y = ground-this.height
        this.ground = ground
        this.jumpHeight = ground-this.height - 200
        this.minJumpHeight = ground-this.height - 150
        // Checks for input
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
        // Stop jumping if mouse is released and player is past the min jump height
        if (this.jumping && this.mReleased && this.y < this.minJumpHeight) {
            this.jumping = false
        }
        // Stop jumping if player reaches max height
        if (this.y < this.jumpHeight) {
            this.jumping = false
        }
        // Change the speed if player is jumping
        if (this.jumping) {
            this.grounded = false
            this.vSpeed += this.acceleration
            if (this.vSpeed > this.jumpSpeed) this.vSpeed = this.jumpSpeed
        }
        // Change the speed if player is not jumping
        if (!this.jumping && !this.grounded) {
            if (this.vSpeed < 10 && this.vSpeed > -10) this.vSpeed -= this.acceleration/2; else this.vSpeed -= this.acceleration*1.5
            if (this.vSpeed < this.gravity) this.vSpeed = this.gravity
        }
        // Move the player based on its speed
        this.y -= this.vSpeed
        // Makes sure player doesn't go below the ground
        if (this.y > this.ground-this.height) {
            this.y = this.ground-this.height
        }
    }
    // Changes the input variables
    pressed():void {
        console.log("pressed")
        this.mPressed = true
        this.mReleased = false
        this.sound.play();
    }

    released():void {
        console.log("release");
        this.mPressed = false
        this.mReleased = true
    }
}