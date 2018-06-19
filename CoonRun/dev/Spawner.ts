class Spawner {

    game:Game
    public bins:Array<Bin> = [];
    public binChance = 0.0 // Chance of bin spawning
    public canSpawnBin:boolean = false
    public binSpawnCD:number = 60
    public single = 0
    public double = 1
    public triple = 2

    public words:Array<Word> = [];
    public wordChance = 0.05
    public canSpawnWord:boolean = false
    public wordSpawnCD:number = 300

    public clouds:Array<Cloud> = [];
    public cloudChance = 0.05
    public canSpawnCloud:boolean = false
    public cloudSpawnCD:number = 60
  
    public lifes:Array<Life> = [];
    public lifeChance = 0
    public canSpawnLife:boolean = false
    public lifeSpawnCD:number = 1000

    constructor (game:Game) {
        this.game = game

    }

    update():void{
        if (!this.game.dead && this.game.levelObject.currentLevel != 0) {
            // Countdown for spawning
            if (this.binSpawnCD > 0 && !this.canSpawnBin) {
                this.binSpawnCD--
            } else {
                this.binSpawnCD = 60
                this.canSpawnBin = true // Bin may spawn when spawnCD hits 0
            }
            if (Math.random() < this.binChance && this.canSpawnBin) {
                let binType:number
                if (Math.random()>.33) { // Decide on bin type
                    binType = this.single
                } else if (Math.random()>.5) {
                    binType = this.double
                } else {
                    binType = this.triple
                }
                // New bin
                this.bins.push(new Bin(this.game, binType))
                this.canSpawnBin = false // Restart the cooldown for spawning
            }

            if (this.wordSpawnCD > 0 && !this.canSpawnWord) {
                this.wordSpawnCD--
            } else {
                this.wordSpawnCD = 150
                this.canSpawnWord = true
            }
            if (Math.random() < this.wordChance && this.canSpawnWord) {
                let fake:boolean
                let name:number
                if (Math.random()>.9) {
                    fake = true
                    name = Math.floor(Math.random() * this.game.levelObject.currentProverb.incorrect.length)
                } else {
                    fake = false
                    name = Math.floor(Math.random() * this.game.levelObject.currentProverb.correct.length)
                }
                // New word
                this.words.push(new Word(this.game, name, fake))
                this.canSpawnWord = false
            }

            if(this.cloudSpawnCD > 0 && !this.canSpawnCloud) {
                this.cloudSpawnCD--
            } else {
                this.cloudSpawnCD = 60
                this.canSpawnCloud = true
            }
            if (Math.random() < this.cloudChance && this.canSpawnCloud) {
                this.clouds.push (new Cloud(this.game))
                this.canSpawnCloud = false
            }    

            if(this.lifeSpawnCD > 0 && !this.canSpawnLife) {
                this.lifeSpawnCD--
            } else {
                this.lifeSpawnCD = 1100
                this.canSpawnLife = true
            }
            if (Math.random() < this.lifeChance && this.canSpawnLife) {
                this.lifes.push (new Life(this.game))
                this.canSpawnLife = false
            }
        }
        // Bins
        let deleteBin:number[] = [] // Temp holder for removed bins
        for (let i=0; i<this.bins.length; i++) {
            this.bins[i].update() // Moves the bins
            if (!this.bins[i].alive) {
                deleteBin.push(i) // Move object to the temp holder
            }
        }
        deleteBin.reverse()
        for (const i in deleteBin) {
            this.bins.splice(parseInt(i), 1) // Empty the temp holder
        }

        // Words
        let deleteWord = []
        for(let i=0; i<this.words.length; i++) {
            this.words[i].update()
            if (!this.words[i].alive) {
                deleteWord.push(i)
            }
        }
        deleteWord.reverse()
        for (const i in deleteWord) {
            this.words.splice(parseInt(i), 1)
        }

        // Cloud
        let deleteCloud = []
        for(let i=0; i<this.clouds.length; i++) {
            this.clouds[i].update()
            if (!this.clouds[i].alive) {
                deleteCloud.push(i)
            }
        }
        deleteCloud.reverse()
        for (const i in deleteCloud) {
            this.clouds.splice(parseInt(i), 1)
        }

        // Life
        let deleteLife = []
        for(let i=0; i<this.lifes.length; i++) {
            this.lifes[i].update()
            if (!this.lifes[i].alive) {
                deleteLife.push(i)
            }
        }
        deleteLife.reverse()
        for (const i in deleteLife) {
            this.lifes.splice(parseInt(i), 1)
        }

        if (this.game.lifeCount < 1 && !this.game.dead) {
            this.game.dead = true
            console.log("game over")
        }

        if (this.game.score < 0) {
            this.game.score = 0
        }
    }
}