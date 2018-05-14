class Player {

    ypositie:number

    constructor() {
        this.ypositie = 0
        console.log("i am a player!")
    }

    update(){
        this.ypositie ++
        console.log("updating the player")
        
    }
}