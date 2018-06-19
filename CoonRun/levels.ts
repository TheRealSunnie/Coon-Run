class Levels {

    private game:Game
    public proverbs:Proverbs = new Proverbs()
    private proverbArray:Array<number> = []
    public currentProverb:{string: string, correct: string[], incorrect: string[]} = {string:"", correct:[""], incorrect:[""]}
    public currentString:string = ""

    private maxSpeed:number = 0
    private acceleration:number = 0.001
    private maxLevel:number = 5

    constructor(game:Game) {
        this.game = game
        this.switch(this.game.currentLevel)
    }

    update() {
        if (this.game.currentLevel > this.maxLevel) this.game.currentLevel = this.maxLevel
        // Control speed
        this.game.objSpeed += this.acceleration
        if(this.game.objSpeed > this.maxSpeed) this.game.objSpeed = this.maxSpeed

        let correctIsZero = (this.currentProverb.correct.length == 0)
        let proverbIsZero = (this.proverbArray.length == 0)
        
        if (correctIsZero && proverbIsZero) {
            this.game.currentLevel++
            if (this.game.currentLevel > this.maxLevel) this.game.currentLevel = this.maxLevel
      
            this.switch(this.game.currentLevel)
        } else if(correctIsZero) {
            this.switchProverb()
        }
        
    }

    // This should be all the levels
    // Change obj speed, sw collection, active sw pickups, spawnchances, day/night, timers
    switch(level:number):void {
        
        switch (level) {
            
            case 0:
                this.maxSpeed = 0
                this.proverbArray = [0]
                this.currentProverb = {string:"", correct:[], incorrect:[]}
                this.currentString = this.currentProverb.string
                break;
            case 1:
                this.maxSpeed = 13
                this.proverbArray = [0]
                break;
            case 2:
                this.maxSpeed = 15
                this.proverbArray = [1]
                break;
            case 3:
                this.maxSpeed = 17
                this.proverbArray = [2]
                break;
            case 4:
                this.maxSpeed = 20
                this.proverbArray = [3]
                break;
            case 5:
                this.maxSpeed = 22
                this.proverbArray = [0]
                break;
        }
        if (this.game.currentLevel != 0) this.switchProverb()
        
    }

    switchProverb() {
        this.currentProverb = this.random()
        this.currentString = this.currentProverb.string
    }

    restart() {
        this.game.dead = false
        this.game.lifeCount = this.game.maxLifes
        this.game.objSpeed = this.game.startObjSpeed
        this.game.score = 0
        this.game.currentLevel = 1
        this.switch(this.game.currentLevel)
    }

    random():any {
        let i:number = Math.floor(Math.random() * this.proverbArray.length)
        let j:number = this.proverbArray[i]
        this.proverbArray.splice(i,1)
        return this.proverbs.list[j]
    }
}