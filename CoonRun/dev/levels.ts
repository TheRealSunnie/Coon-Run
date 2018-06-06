class Levels {

    private game:Game
    public proverbs:Proverbs = new Proverbs()
    public currentString:string = ""

    private maxSpeed:number = 0
    private acceleration:number = 0.001
    private maxLevel:number = 4

    constructor(game:Game) {
        this.game = game
        this.switch(this.game.currentLevel)
    }

    update() {
        if (this.game.currentLevel > this.maxLevel) this.game.currentLevel = this.maxLevel
        // Control speed
        this.game.objSpeed += this.acceleration
        if(this.game.objSpeed > this.maxSpeed) this.game.objSpeed = this.maxSpeed

    }

    // This should be all the levels
    // Change obj speed, sw collection, active sw pickups, spawnchances, day/night, timers
    switch(level:number):void {
        switch (level) {
            case 0:
                this.maxSpeed = 0
                break;
            case 1:
                this.currentString = this.proverbs.list[0].string
                this.maxSpeed = 13
                break;

            case 2:
                this.currentString = this.proverbs.list[0].string
                this.maxSpeed = 15
                break;
            case 3:
                this.currentString = this.proverbs.list[0].string
                this.maxSpeed = 17
                break;
            case 4:
                this.currentString = this.proverbs.list[0].string
                this.maxSpeed = 20
                break;
        }
    }

}