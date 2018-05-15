class Player {

    x:number
    y:number
    ground:number
    jumping:boolean
    jumpSpeed:number
    jumpHeight:number
    gravity:number

    constructor(y:number) {
        console.log("i am a player!")
        this.x = 15
        this.y = y
        this.ground = y
        this.jumping = false
        this.jumpSpeed = 8
        this.jumpHeight = 150
        this.gravity = 6

        window.addEventListener("click", () => this.jump())
    }

    update():void {
        console.log("updating the player")
        if (this.y < this.ground - this.jumpHeight) this.jumping = false
        if (this.jumping) this.y -= this.jumpSpeed; else this.y += this.gravity
        if (this.y > this.ground) this.y = this.ground;
    }

    jump():void {
        console.log("jump!");
        if (this.y > this.ground - 100) this.jumping = true;
    }
}