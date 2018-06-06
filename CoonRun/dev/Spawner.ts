class Spawner {

    game:Game
    public bins:Array<Bin> = [];
    public binChance = 0.03 // Chance of bin spawning
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
    public cloudChance = 0
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
        // Bins
        // Countdown for spawning
        if (this.binSpawnCD > 0 && !this.canSpawnBin) {
            this.binSpawnCD--
        } else {
            this.binSpawnCD = 70
            this.canSpawnBin = true // Bin may spawn when spawnCD hits 0
        }

        if (Math.random() < this.binChance && this.canSpawnBin && !this.game.dead) {
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
        let deleteBin = [] // Temp holder for removed bins
        for (let i=0; i<this.bins.length; i++) {
            this.bins[i].update() // Moves the bins
            if (!this.bins[i].alive) {
                deleteBin.push(i) // Move object to the temp holder
            }
        }
        for (const i in deleteBin) {
            this.bins.splice(parseInt(i), 1) // Empty the temp holder
        }

        // Words
        if (this.wordSpawnCD > 0 && !this.canSpawnWord) {
            this.wordSpawnCD--
        } else {
            this.wordSpawnCD = 300
            this.canSpawnWord = true // Bin may spawn when spawnCD hits 0
        }

        if (Math.random() < this.wordChance && this.canSpawnWord && !this.game.dead) {
            let wordType:boolean
            if (Math.random()>.5) { // Decide on bin type
                wordType = true
            } else {
                wordType = false
            }
            // New word
            this.words.push(new Word(this.game, 0, wordType))
            this.canSpawnWord = false // Restart the cooldown for spawning
        }
        let deleteWord = [] // Temp holder for removed bins
        for(let i=0; i<this.words.length; i++) {
            this.words[i].update() // Moves the bins
            if (!this.words[i].alive) {
                deleteWord.push(i) // Move object to the temp holder
            }
        }
        for (const i in deleteWord) {
            this.words.splice(parseInt(i), 1) // Empty the temp holder
        }

        // Cloud
        if(this.cloudSpawnCD > 0 && !this.canSpawnCloud) {
            this.cloudSpawnCD--
        } else {
            this.cloudSpawnCD = 50
            this.canSpawnCloud = true
        }

        if (Math.random() < this.cloudChance && this.canSpawnCloud) {
            this.clouds.push (new Cloud(this.game))
            this.canSpawnCloud = false
        }

        let deleteCloud = []
        for(let i=0; i<this.clouds.length; i++) {
            this.clouds[i].update()
            if (!this.clouds[i].alive) {
                deleteCloud.push(i)
            }
        }

        for (const i in deleteCloud) {
            this.clouds.splice(parseInt(i), 1)
        }

        // Life
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

        let deleteLife = []
        for(let i=0; i<this.lifes.length; i++) {
            this.lifes[i].update()
            if (!this.lifes[i].alive) {
                deleteLife.push(i)
            }
        }

        for (const i in deleteLife) {
            this.lifes.splice(parseInt(i), 1)
        }

        if (this.game.lifeCount < 1 && !this.game.dead) {
            this.game.dead = true
            console.log("game over")
        }
        if (this.game.dead) {
            this.game.levelObject.switch(0)
        }
        if (this.game.score < 0) {
            this.game.score = 0
        }

    }
}