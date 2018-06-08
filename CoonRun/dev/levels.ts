class Levels {

    private game:Game
    public proverbs:Proverbs = new Proverbs()
    private proverbArray:Array<number> = []
    public currentProverb:{string: string, correct: string[], incorrect: string[]} = {string:"", correct:[""], incorrect:[""]}
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
                this.proverbArray = [0, 1]
                this.currentProverb = {string:"", correct:[""], incorrect:[""]}
                break;
            case 1:
                this.maxSpeed = 13
                this.currentString = this.proverbs.list[0].string
                this.proverbArray = [3]
                this.currentProverb = this.random()
                break;

            case 2:
                this.maxSpeed = 15
                this.currentString = this.proverbs.list[0].string
                this.proverbArray = [2]
                this.currentProverb = this.random()
                break;
            case 3:
                this.maxSpeed = 17
                this.currentString = this.proverbs.list[0].string
                this.proverbArray = [3]
                this.currentProverb = this.random()
                break;
            case 4:
                this.maxSpeed = 20
                this.currentString = this.proverbs.list[0].string
                this.proverbArray = [4]
                this.currentProverb = this.random()
                break;
        }
    }

    random():any {
        return this.proverbs.list[this.proverbArray[Math.floor(Math.random() * this.proverbArray.length)]]
    }
}