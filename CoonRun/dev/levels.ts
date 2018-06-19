class Levels {

    private game:Game
    public proverbs:Proverbs = new Proverbs()
    private levels:{level:number, maxSpeed:number, acceleration:number, proverbArray:Array<number>}[]

    public currentLevel:number = 0

    private levelProgress:Array<number>
    public currentProverb:{string: string, correct: string[], incorrect: string[]} = {string:"", correct:[""], incorrect:[""]}
    public currentString:string
 

    //private maxSpeed:number = 0
    //private acceleration:number = 0.001
    private maxLevel:number

    constructor(game:Game) {
        this.game = game
        //this.switch(this.game.currentLevel)

        this.levels = [
            {
                level: 0,
                maxSpeed: 0,
                acceleration: 0,
                // Bin chances
                proverbArray: [0]
    
            },
            {
                level: 1,
                maxSpeed: 13,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [3,1,2,5,6],
    
            },
            {
                level: 2,
                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [2,6],
    
            },
            {
                level: 3,
                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [4,5],
    
            },
        ]

        this.maxLevel = this.levels.length-1

        this.levelProgress = this.levels[this.currentLevel].proverbArray
        this.currentProverb = this.random()
        this.currentString = this.currentProverb.string
    }

    update() {
        let lvlReady = (this.levelProgress.length == 0)
        let proverbReady = (this.currentProverb.correct.length == 0) 
        if (lvlReady && proverbReady) {
            this.currentLevel++
            if (this.currentLevel > this.maxLevel) this.currentLevel = this.maxLevel
            this.levelProgress = this.levels[this.currentLevel].proverbArray
            this.switchProverb()
            console.log("lvl up")
            
        } else if (this.currentProverb.correct.length == 0) {
            this.switchProverb()
        }

        if (this.game.dead) {
            this.currentLevel = 0
        }

        // Control speed
        this.game.objSpeed += this.levels[this.currentLevel].acceleration
        if(this.game.objSpeed > this.levels[this.currentLevel].maxSpeed) this.game.objSpeed = this.levels[this.currentLevel].maxSpeed
        
    }

    restart() {
        this.currentLevel = 1
        this.levelProgress = this.levels[this.currentLevel].proverbArray
        this.switchProverb()

        this.game.dead = false
        this.game.lifeCount = this.game.maxLifes
        this.game.objSpeed = this.game.startObjSpeed
        this.game.score = 0
    }

    switchProverb():void {
        this.currentProverb = this.random()
        console.log("almost new proverb")
        
        this.currentString = this.currentProverb.string
        console.log("new proverb")
        
    }

    random():any {
        let i = Math.floor(Math.random() * this.levelProgress.length)
        let j = this.levelProgress[i]
        this.levelProgress.splice(i,1)
        return this.proverbs.list[j]
     }
}