"use strict";
var Cloud = (function () {
    function Cloud(game) {
        this.width = 100;
        this.height = 50;
        this.alive = true;
        this.game = game;
        this.x = this.game.canvasWidth;
        this.y = Math.floor(Math.random() * 200) + 2;
        this.hspeed = this.game.objSpeed;
    }
    Cloud.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
        this.game.ctx.fillStyle = "white";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    return Cloud;
}());
var Spawner = (function () {
    function Spawner(game) {
        this.bins = [];
        this.binChance = 0.03;
        this.canSpawnBin = false;
        this.binSpawnCD = 60;
        this.single = 0;
        this.double = 1;
        this.triple = 2;
        this.words = [];
        this.wordChance = 0.05;
        this.canSpawnWord = false;
        this.wordSpawnCD = 300;
        this.clouds = [];
        this.cloudChance = 0.1;
        this.canSpawnCloud = false;
        this.cloudSpawnCD = 60;
        this.lifes = [];
        this.lifeChance = 0;
        this.canSpawnLife = false;
        this.lifeSpawnCD = 1000;
        this.game = game;
    }
    Spawner.prototype.update = function () {
        if (this.binSpawnCD > 0 && !this.canSpawnBin) {
            this.binSpawnCD--;
        }
        else {
            this.binSpawnCD = 20;
            this.canSpawnBin = true;
        }
        if (Math.random() < this.binChance && this.canSpawnBin && !this.game.dead) {
            var binType = void 0;
            if (Math.random() > .33) {
                binType = this.single;
            }
            else if (Math.random() > .5) {
                binType = this.double;
            }
            else {
                binType = this.triple;
            }
            this.bins.push(new Bin(this.game, binType));
            this.canSpawnBin = false;
        }
        var deleteBin = [];
        for (var i = 0; i < this.bins.length; i++) {
            this.bins[i].update();
            if (!this.bins[i].alive) {
                deleteBin.push(i);
            }
        }
        deleteBin.reverse();
        for (var i in deleteBin) {
            this.bins.splice(parseInt(i), 1);
        }
        if (this.wordSpawnCD > 0 && !this.canSpawnWord) {
            this.wordSpawnCD--;
        }
        else {
            this.wordSpawnCD = 300;
            this.canSpawnWord = true;
        }
        if (Math.random() < this.wordChance && this.canSpawnWord && !this.game.dead) {
            var wordType = void 0;
            if (Math.random() > .5) {
                wordType = true;
            }
            else {
                wordType = false;
            }
            this.words.push(new Word(this.game, 0, wordType));
            this.canSpawnWord = false;
        }
        var deleteWord = [];
        for (var i = 0; i < this.words.length; i++) {
            this.words[i].update();
            if (!this.words[i].alive) {
                deleteWord.push(i);
            }
        }
        for (var i in deleteWord) {
            this.words.splice(parseInt(i), 1);
        }
        if (this.cloudSpawnCD > 0 && !this.canSpawnCloud) {
            this.cloudSpawnCD--;
        }
        else {
            this.cloudSpawnCD = 50;
            this.canSpawnCloud = true;
        }
        if (Math.random() < this.cloudChance && this.canSpawnCloud) {
            this.clouds.push(new Cloud(this.game));
            this.canSpawnCloud = false;
        }
        var deleteCloud = [];
        for (var i = 0; i < this.clouds.length; i++) {
            this.clouds[i].update();
            if (!this.clouds[i].alive) {
                deleteCloud.push(i);
            }
        }
        for (var i in deleteCloud) {
            this.clouds.splice(parseInt(i), 1);
        }
        if (this.lifeSpawnCD > 0 && !this.canSpawnLife) {
            this.lifeSpawnCD--;
        }
        else {
            this.lifeSpawnCD = 1100;
            this.canSpawnLife = true;
        }
        if (Math.random() < this.lifeChance && this.canSpawnLife) {
            this.lifes.push(new Life(this.game));
            this.canSpawnLife = false;
        }
        var deleteLife = [];
        for (var i = 0; i < this.lifes.length; i++) {
            this.lifes[i].update();
            if (!this.lifes[i].alive) {
                deleteLife.push(i);
            }
        }
        for (var i in deleteLife) {
            this.lifes.splice(parseInt(i), 1);
        }
        if (this.game.lifeCount < 1 && !this.game.dead) {
            this.game.dead = true;
            console.log("game over");
        }
        if (this.game.dead) {
            this.game.levelObject.switch(0);
        }
        if (this.game.score < 0) {
            this.game.score = 0;
        }
    };
    return Spawner;
}());
var Trash = (function () {
    function Trash(ground, canvasWidth, hspeed) {
        console.log("hier komt een prullebakkie");
        this.width = 50;
        this.height = 50;
        this.canvasWidth = canvasWidth;
        this.x = canvasWidth;
        this.y = ground - this.height;
        this.hspeed = hspeed;
        this.active = false;
    }
    Trash.prototype.update = function () {
        if (!this.active) {
            this.x = this.canvasWidth;
        }
        else {
            this.x -= this.hspeed;
        }
        if (this.x < 0 - this.width) {
            this.active = false;
        }
    };
    return Trash;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = 1280;
        this.currentLevel = 1;
        this.ground = 720;
        this.lifeCount = 15;
        this.score = 0;
        this.dead = false;
        this.objSpeed = 10;
        this.gameLoop = function () {
            _this.ctx.fillStyle = "#D3D3D3";
            _this.ctx.fillRect(0, 0, 1280, 720);
            _this.levelObject.update();
            _this.player.update();
            _this.Spawner.update();
            _this.ctx.fillStyle = "black";
            _this.ctx.font = "30px Arial";
            _this.ctx.fillText(_this.lifeCount + " levens", 150, 450);
            _this.ctx.fillText("Score: " + _this.score, 50, 100);
            _this.ctx.fillText(_this.levelObject.currentString, _this.canvasWidth / 2, 100);
            _this.ctx.stroke();
            requestAnimationFrame(_this.gameLoop);
        };
        this.levelObject = new Levels(this);
        this.Spawner = new Spawner(this);
        this.player = new Player(this);
        requestAnimationFrame(this.gameLoop);
    }
    Game.prototype.collision = function (object) {
        if (object.x > this.player.x - object.width && object.x < this.player.x + this.player.width && object.y > this.player.y - object.height && object.y < this.player.y + this.player.height) {
            return true;
        }
        else {
            return false;
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Bin = (function () {
    function Bin(game, type) {
        this.width = 50;
        this.height = 50;
        this.alive = true;
        this.game = game;
        this.hspeed = this.game.objSpeed;
        this.type = type;
        switch (this.type) {
            case this.game.Spawner.single:
                this.width = 50;
                this.height = 125;
                this.y = this.game.ground - this.height;
                break;
            case this.game.Spawner.double:
                this.width = 100;
                this.height = 125;
                this.y = this.game.ground - this.height;
                break;
            case this.game.Spawner.triple:
                this.width = 150;
                this.height = 125;
                this.y = this.game.ground - this.height;
                break;
        }
        this.x = this.game.canvasWidth;
        this.y = this.game.ground - this.height;
    }
    Bin.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            this.game.lifeCount--;
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
        this.game.ctx.fillStyle = "black";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    return Bin;
}());
var Levels = (function () {
    function Levels(game) {
        this.proverbs = new Proverbs();
        this.proverbArray = [];
        this.currentProverb = { string: "", correct: [""], incorrect: [""] };
        this.currentString = "";
        this.maxSpeed = 0;
        this.acceleration = 0.001;
        this.maxLevel = 4;
        this.game = game;
        this.switch(this.game.currentLevel);
    }
    Levels.prototype.update = function () {
        if (this.game.currentLevel > this.maxLevel)
            this.game.currentLevel = this.maxLevel;
        this.game.objSpeed += this.acceleration;
        if (this.game.objSpeed > this.maxSpeed)
            this.game.objSpeed = this.maxSpeed;
    };
    Levels.prototype.switch = function (level) {
        switch (level) {
            case 0:
                this.maxSpeed = 0;
                this.proverbArray = [0, 1];
                this.currentProverb = { string: "", correct: [""], incorrect: [""] };
                break;
            case 1:
                this.maxSpeed = 13;
                this.currentString = this.proverbs.list[0].string;
                this.proverbArray = [3];
                this.currentProverb = this.random();
                break;
            case 2:
                this.maxSpeed = 15;
                this.currentString = this.proverbs.list[0].string;
                this.proverbArray = [2];
                this.currentProverb = this.random();
                break;
            case 3:
                this.maxSpeed = 17;
                this.currentString = this.proverbs.list[0].string;
                this.proverbArray = [3];
                this.currentProverb = this.random();
                break;
            case 4:
                this.maxSpeed = 20;
                this.currentString = this.proverbs.list[0].string;
                this.proverbArray = [4];
                this.currentProverb = this.random();
                break;
        }
    };
    Levels.prototype.random = function () {
        return this.proverbs.list[this.proverbArray[Math.floor(Math.random() * this.proverbArray.length)]];
    };
    return Levels;
}());
var Life = (function () {
    function Life(game) {
        this.width = 50;
        this.height = 50;
        this.alive = true;
        this.game = game;
        this.hspeed = this.game.objSpeed;
        this.x = this.game.canvasWidth;
        this.y = 400;
    }
    Life.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            this.game.lifeCount++;
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
        this.game.ctx.fillStyle = "#00FFFF";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    return Life;
}());
var Player = (function () {
    function Player(game) {
        var _this = this;
        this.width = 100;
        this.height = 200;
        this.x = 15;
        this.jumping = false;
        this.vSpeed = 0;
        this.jumpSpeed = 30;
        this.acceleration = 3.5;
        this.gravity = -30;
        this.grounded = true;
        this.mPressed = false;
        this.mReleased = false;
        this.sound = document.getElementById('jump');
        this.game = game;
        this.y = this.game.ground - this.height;
        this.ground = this.game.ground;
        this.jumpHeight = this.ground - this.height - 250;
        this.minJumpHeight = this.ground - this.height - 200;
        window.addEventListener("mousedown", function () { return _this.pressed(); });
        window.addEventListener("mouseup", function () { return _this.released(); });
    }
    Player.prototype.update = function () {
        if (this.y + this.height == this.ground)
            this.grounded = true;
        if (this.grounded) {
            this.vSpeed = 0;
            if (this.mPressed)
                this.jumping = true;
        }
        if (this.jumping && this.mReleased && this.y < this.minJumpHeight) {
            this.jumping = false;
        }
        if (this.y < this.jumpHeight) {
            this.jumping = false;
        }
        if (this.jumping) {
            this.grounded = false;
            this.vSpeed += this.acceleration;
            if (this.vSpeed > this.jumpSpeed)
                this.vSpeed = this.jumpSpeed;
        }
        if (!this.jumping && !this.grounded) {
            if (this.vSpeed < 10 && this.vSpeed > -10)
                this.vSpeed -= this.acceleration / 2;
            else
                this.vSpeed -= this.acceleration * 1.5;
            if (this.vSpeed < this.gravity)
                this.vSpeed = this.gravity;
        }
        this.y -= this.vSpeed;
        if (this.y > this.ground - this.height) {
            this.y = this.ground - this.height;
        }
        this.game.ctx.fillStyle = "black";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Player.prototype.pressed = function () {
        console.log("pressed");
        this.mPressed = true;
        this.mReleased = false;
        this.sound.play();
        if (this.game.dead) {
            this.game.dead = false;
            this.game.lifeCount = 3;
            this.game.currentLevel = 1;
            this.game.levelObject.switch(this.game.currentLevel);
            this.game.objSpeed = 10;
            this.game.score = 0;
        }
    };
    Player.prototype.released = function () {
        console.log("release");
        this.mPressed = false;
        this.mReleased = true;
    };
    return Player;
}());
var Proverbs = (function () {
    function Proverbs() {
        this.list = [
            {
                string: "De .. valt niet ver van de boom",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
            {
                string: "De ... in de pot vinden",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
            {
                string: "Zo sluw als een ...",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
            {
                string: "Als een ... in de val",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
        ];
    }
    return Proverbs;
}());
var Test = (function () {
    function Test() {
        this.mijnvalue = true;
        this.update();
        console.log("ik ben een test");
    }
    Test.prototype.update = function () {
        console.log("doe iets");
    };
    return Test;
}());
var Word = (function () {
    function Word(game, name, fake) {
        this.width = 50;
        this.height = 50;
        this.fake = false;
        this.alive = true;
        this.game = game;
        this.x = this.game.canvasWidth;
        this.y = this.game.ground - this.height - 250;
        this.hspeed = this.game.objSpeed;
        this.name = name;
        this.fake = fake;
    }
    Word.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            if (!this.fake) {
                this.game.currentLevel++;
                this.game.levelObject.switch(this.game.currentLevel);
                this.game.score++;
            }
            else {
                this.game.score--;
            }
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
        if (this.fake)
            this.game.ctx.fillStyle = "red";
        else
            this.game.ctx.fillStyle = "green";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    return Word;
}());
//# sourceMappingURL=main.js.map