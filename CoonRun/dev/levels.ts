class Levels {

    private gameObject:Game
    public words:Array<Word> = [];
    public proverb:string
    private maxSpeed:number = 0
    public wordChance = 0.05
    public canSpawnWord:boolean = false
    public wordSpawnCD:number = 300

    constructor(game:Game) {
        this.gameObject = game
        this.proverb = ""
        this.switch(this.gameObject.currentLevel)
    }

    update() {
        if (this.gameObject.currentLevel > 4) this.gameObject.currentLevel = 4
        this.gameObject.objSpeed += 0.001
        if(this.gameObject.objSpeed > this.maxSpeed) this.gameObject.objSpeed = this.maxSpeed

        if (this.wordSpawnCD > 0 && !this.canSpawnWord) {
            this.wordSpawnCD--
        } else {
            this.wordSpawnCD = 300
            this.canSpawnWord = true // Bin may spawn when spawnCD hits 0
        }

        if (Math.random() < this.wordChance && this.canSpawnWord && !this.gameObject.dead) {
            let wordType:boolean
            if (Math.random()>.5) { // Decide on bin type
                wordType = true
            } else {
                wordType = false
            }
            // New bin
            this.words.push(new Word(this.gameObject, 0, wordType))
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
    }

    switch(level:number):void {
        switch (level) { // Bins can have different types/sizes/sprites..
            case 0:
                this.maxSpeed = 0
                break;
            case 1:
                this.proverb = "De ... valt niet ver van de boom"
                this.maxSpeed = 13
                break;

            case 2:
                this.proverb = "De ... in de pot vinden"
                this.maxSpeed = 15
                break;
            case 3:
                this.proverb = "Zo sluw als een ..."
                this.maxSpeed = 17
                break;
            case 4:
                this.proverb = "Als een ... in de val"
                this.maxSpeed = 20
                break;
        }
    }

}