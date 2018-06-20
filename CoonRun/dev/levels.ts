class Levels {

    private game:Game
    public proverbs:Proverbs = new Proverbs()
    public levels:{level:number, sprite:HTMLImageElement, maxSpeed:number, acceleration:number, proverbArray:Array<number>, bgArray:Array<number>, night:boolean}[]

    public currentLevel:number = 0
    public currentProverb:number = 0

    private levelProgress:Array<number>
    public proverbProgress:Array<string>
    public currentString:string
 
    private maxLevel:number

    public levelSprite:HTMLImageElement

    private levelCountdown:number = 300
    public levelBreak:boolean = false

    private nightOver:boolean = false
    private nightCountdown:number = 600

    constructor(game:Game) {
        this.game = game

        this.levels = [
            {
                level: 0,
                sprite: <HTMLImageElement>document.getElementById('level1'),

                maxSpeed: 0,
                acceleration: 0,

                // Bin chances

                proverbArray: [0],
                bgArray: [0,1],
                night: false
            },
            {
                level: 1,
                sprite: <HTMLImageElement>document.getElementById('level1'),

                maxSpeed: 13,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [1,2,3,4],
                bgArray: [2,3,4],
                night: false
            },
            {
                level: 2,
                sprite: <HTMLImageElement>document.getElementById('level0'),

                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [0],
                bgArray: [0,1],
                night: true
            },
            {
                level: 3,
                sprite: <HTMLImageElement>document.getElementById('level2'),

                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [5,6,7,8,9,10],
                bgArray: [5,6],
                night: false
            },
            {
                level: 4,
                sprite: <HTMLImageElement>document.getElementById('level0'),

                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [0],
                bgArray: [0,1],
                night: true
            },
            {
                level: 5,
                sprite: <HTMLImageElement>document.getElementById('level3'),

                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [11,12,13,14,15],
                bgArray: [7,8,9],
                night: false
            },
            {
                level: 6,
                sprite: <HTMLImageElement>document.getElementById('level0'),

                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [0],
                bgArray: [0,1],
                night: true
            },
            {
                level: 7,
                sprite: <HTMLImageElement>document.getElementById('level4'),

                maxSpeed: 15,
                acceleration: 0.001,
                // Bin chances
                proverbArray: [0],
                bgArray: [10,11],
                night: false
            },
            

        ]

        this.maxLevel = this.levels.length-1
        this.levelSprite = this.levels[this.currentLevel].sprite

        this.levelProgress = this.levels[this.currentLevel].proverbArray.slice();
        this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice()
        this.currentString = this.proverbs.list[this.currentProverb].string
    }

    update() {
        let lvlReady = (this.levelProgress.length == 0)
        let proverbReady = (this.proverbProgress.length == 0) 
        
        if ((proverbReady && lvlReady) || this.nightOver) {
            
            this.currentProverb = 0
            this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice()
            this.currentString = this.proverbs.list[this.currentProverb].string
            if (this.nightOver) {
                console.log("night over");
                this.nightOver = false
                if (this.currentLevel != this.maxLevel) {
                    this.currentLevel++
                }
                this.switchLevel()
            } else {
                this.levelBreak = true
            }
            
        } else if (proverbReady) {
            this.switchProverb()
        }

        if (this.levelBreak) {
            if (this.levelCountdown > 0) {
                this.levelCountdown--
            }

            if (this.levelCountdown < 1) {
                // Switches level
                if (this.currentLevel != this.maxLevel) {
                    this.currentLevel++
                }
                this.switchLevel()
                this.levelCountdown = 300
                this.levelBreak = false
            }
        }

        if (this.levels[this.currentLevel].night) {
            if (this.nightCountdown > 0) {
                this.nightCountdown--
            }

            if (this.nightCountdown < 1) {
                this.nightOver = true
                this.nightCountdown = 600
            }
        }

        if (this.game.dead) {
            this.currentLevel = 0
        }

        // Control speed
        this.game.objSpeed += this.levels[this.currentLevel].acceleration
        if(this.game.objSpeed > this.levels[this.currentLevel].maxSpeed) this.game.objSpeed = this.levels[this.currentLevel].maxSpeed
        
    }

    // Resets the game and the required values
    restart() {
        this.currentLevel = 1
        // Switches level
        this.switchLevel()

        // Reset required game values
        this.game.dead = false
        this.game.lifeCount = this.game.startingLifes
        this.game.objSpeed = this.game.startObjSpeed
        this.game.score = 0
    }

    // Gets the random proverb and resets the proverbprogress with a new correct array and updates the string
    switchProverb():void {
        this.currentProverb = this.random()
        this.proverbProgress = this.proverbs.list[this.currentProverb].correct.slice()
        this.currentString = this.proverbs.list[this.currentProverb].string    
    }

    // Gets a random value from a level's proverb array and return an index for the proverblist
    random():any {
        let i = Math.floor(Math.random() * this.levelProgress.length)
        let j = this.levelProgress[i]
        this.levelProgress.splice(i,1)

        return j
     }

     switchLevel():void {
        this.levelProgress = this.levels[this.currentLevel].proverbArray.slice();
        this.levelSprite = this.levels[this.currentLevel].sprite
        this.switchProverb()
     }
}