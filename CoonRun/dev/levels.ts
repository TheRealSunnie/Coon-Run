class Levels {

    private game:Game

    constructor (game:Game) {
        this.game = game
        this.update(1)
    }

    update(level:number):void {
        switch (level) { // Bins can have different types/sizes/sprites..
            case 1:
                this.game.objSpeed = 8
                break;

            case 2:
                this.game.objSpeed = 12
                for(let i=0; i<this.game.bins.length; i++) {
                    this.game.bins[i].hspeed = this.game.objSpeed
                }
                break;
            default:
                this.game.objSpeed = 0
        }
    }

}