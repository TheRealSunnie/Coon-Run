class Player {

    x:number
    y:number
    ground:number
    jumping:boolean
    vSpeed:number
    jumpSpeed:number
    acceleration:number
    gravity:number
    jumpHeight:number
    grounded:boolean
    mPressed:boolean
    mReleased:boolean

    constructor(y:number) {
        console.log("i am a player!")
        this.x = 15
        this.y = y-100
        this.ground = y
        this.jumping = false
        this.vSpeed = 0
        this.jumpSpeed = 50
        this.acceleration = 15
        this.gravity = -20
        this.jumpHeight = 300
        this.grounded = true;
        this.mPressed = false
        this.mReleased = false

        window.addEventListener("mousedown", () => this.pressed())
        window.addEventListener("mouseup", () => this.released())
    }

    update():void {
        console.log("updating the player")
        // Check if can jump
        if (this.grounded) {
            if (this.mPressed) this.jumping = true; else this.jumping = false
        }
        // Break if player reaches max height
        if (this.y < this.ground - this.jumpHeight) {
            this.jumping = false
        }
        // Start jumping
        if (this.jumping) {
            if (this.vSpeed == 0) this.vSpeed += this.acceleration
            if (this.vSpeed > this.jumpSpeed) this.vSpeed = this.jumpSpeed
        }
        // Break and start landing
        if (!this.jumping) {
            if (this.vSpeed > this.gravity) this.vSpeed-=2; else this.vSpeed = this.gravity
        }
        
        // Move
        this.y -= this.vSpeed
        // Hit ground
        if (this.y > this.ground - 100) {
            this.y = this.ground-100;
            this.vSpeed = 0;
            this.grounded = true
        }

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