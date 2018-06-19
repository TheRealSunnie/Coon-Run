"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var basicObject = (function () {
    function basicObject(game) {
        this.width = 50;
        this.height = 50;
        this.alive = true;
        this.hspeed = 0;
        this.Image = document.getElementById('bin');
        this.game = game;
        this.x = this.game.canvasWidth;
        this.y = this.game.ground - this.height;
    }
    basicObject.prototype.update = function () {
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(this.Image, this.x, this.y, this.width, this.height);
    };
    return basicObject;
}());
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud(game) {
        var _this = _super.call(this, game) || this;
        _this.Image = document.getElementById('wolk');
        _this.game = game;
        _this.x = _this.game.canvasWidth;
        _this.y = Math.floor(Math.random() * 150) + 5;
        _this.hspeed = _this.game.objSpeed;
        return _this;
    }
    Cloud.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        this.game.ctx.fillStyle = "white";
        _super.prototype.update.call(this);
    };
    return Cloud;
}(basicObject));
var Spawner = (function () {
    function Spawner(game) {
        this.bins = [];
        this.binChance = 0.0;
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
        this.cloudChance = 0.05;
        this.canSpawnCloud = false;
        this.cloudSpawnCD = 60;
        this.lifes = [];
        this.lifeChance = 0;
        this.canSpawnLife = false;
        this.lifeSpawnCD = 1000;
        this.game = game;
    }
    Spawner.prototype.update = function () {
        if (!this.game.dead && this.game.levelObject.currentLevel != 0) {
            if (this.binSpawnCD > 0 && !this.canSpawnBin) {
                this.binSpawnCD--;
            }
            else {
                this.binSpawnCD = 60;
                this.canSpawnBin = true;
            }
            if (Math.random() < this.binChance && this.canSpawnBin) {
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
            if (this.wordSpawnCD > 0 && !this.canSpawnWord) {
                this.wordSpawnCD--;
            }
            else {
                this.wordSpawnCD = 150;
                this.canSpawnWord = true;
            }
            if (Math.random() < this.wordChance && this.canSpawnWord) {
                var fake = void 0;
                var name_1;
                if (Math.random() > .9) {
                    fake = true;
                    name_1 = Math.floor(Math.random() * this.game.levelObject.currentProverb.incorrect.length);
                }
                else {
                    fake = false;
                    name_1 = Math.floor(Math.random() * this.game.levelObject.currentProverb.correct.length);
                }
                this.words.push(new Word(this.game, name_1, fake));
                this.canSpawnWord = false;
            }
            if (this.cloudSpawnCD > 0 && !this.canSpawnCloud) {
                this.cloudSpawnCD--;
            }
            else {
                this.cloudSpawnCD = 60;
                this.canSpawnCloud = true;
            }
            if (Math.random() < this.cloudChance && this.canSpawnCloud) {
                this.clouds.push(new Cloud(this.game));
                this.canSpawnCloud = false;
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
        var deleteWord = [];
        for (var i = 0; i < this.words.length; i++) {
            this.words[i].update();
            if (!this.words[i].alive) {
                deleteWord.push(i);
            }
        }
        deleteWord.reverse();
        for (var i in deleteWord) {
            this.words.splice(parseInt(i), 1);
        }
        var deleteCloud = [];
        for (var i = 0; i < this.clouds.length; i++) {
            this.clouds[i].update();
            if (!this.clouds[i].alive) {
                deleteCloud.push(i);
            }
        }
        deleteCloud.reverse();
        for (var i in deleteCloud) {
            this.clouds.splice(parseInt(i), 1);
        }
        var deleteLife = [];
        for (var i = 0; i < this.lifes.length; i++) {
            this.lifes[i].update();
            if (!this.lifes[i].alive) {
                deleteLife.push(i);
            }
        }
        deleteLife.reverse();
        for (var i in deleteLife) {
            this.lifes.splice(parseInt(i), 1);
        }
        if (this.game.lifeCount < 1 && !this.game.dead) {
            this.game.dead = true;
            console.log("game over");
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
        this.ground = 720;
        this.maxLifes = 2;
        this.lifeCount = this.maxLifes;
        this.score = 0;
        this.dead = false;
        this.startObjSpeed = 12;
        this.objSpeed = this.startObjSpeed;
        this.gameLoop = function () {
            _this.ctx.fillStyle = "#D3D3D3";
            _this.ctx.fillRect(0, 0, 1280, 720);
            _this.player.update();
            _this.Spawner.update();
            _this.levelObject.update();
            _this.ctx.fillStyle = "black";
            _this.ctx.font = "30px Arial";
            _this.ctx.fillText(_this.lifeCount + " levens", 150, 450);
            _this.ctx.fillText("Score: " + _this.score + _this.levelObject.currentLevel, 50, 200);
            _this.ctx.fillText(_this.levelObject.currentString, _this.canvasWidth / 2, 200);
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
var Bin = (function (_super) {
    __extends(Bin, _super);
    function Bin(game, type) {
        var _this = _super.call(this, game) || this;
        _this.Image = document.getElementById('bin');
        _this.game = game;
        _this.hspeed = _this.game.objSpeed;
        _this.type = type;
        switch (_this.type) {
            case _this.game.Spawner.single:
                _this.width = 50;
                _this.height = 125;
                _this.y = _this.game.ground - _this.height;
                break;
            case _this.game.Spawner.double:
                _this.width = 100;
                _this.height = 125;
                _this.y = _this.game.ground - _this.height;
                break;
            case _this.game.Spawner.triple:
                _this.width = 150;
                _this.height = 125;
                _this.y = _this.game.ground - _this.height;
                break;
        }
        _this.x = _this.game.canvasWidth;
        _this.y = _this.game.ground - _this.height;
        return _this;
    }
    Bin.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            this.game.lifeCount--;
        }
        this.game.ctx.fillStyle = "black";
        _super.prototype.update.call(this);
    };
    return Bin;
}(basicObject));
var Levels = (function () {
    function Levels(game) {
        this.proverbs = new Proverbs();
        this.currentLevel = 0;
        this.currentProverb = { string: "", correct: [""], incorrect: [""] };
        this.game = game;
        this.levels = [
            {
                level: 0,
                maxSpeed: 0,
                acceleration: 0,
                proverbArray: [0]
            },
            {
                level: 1,
                maxSpeed: 13,
                acceleration: 0.001,
                proverbArray: [3, 1, 2, 5, 6],
            },
            {
                level: 2,
                maxSpeed: 15,
                acceleration: 0.001,
                proverbArray: [2, 6],
            },
            {
                level: 3,
                maxSpeed: 15,
                acceleration: 0.001,
                proverbArray: [4, 5],
            },
        ];
        this.maxLevel = this.levels.length - 1;
        this.levelProgress = this.levels[this.currentLevel].proverbArray;
        this.currentProverb = this.random();
        this.currentString = this.currentProverb.string;
    }
    Levels.prototype.update = function () {
        var lvlReady = (this.levelProgress.length == 0);
        var proverbReady = (this.currentProverb.correct.length == 0);
        if (lvlReady && proverbReady) {
            this.currentLevel++;
            if (this.currentLevel > this.maxLevel)
                this.currentLevel = this.maxLevel;
            this.levelProgress = this.levels[this.currentLevel].proverbArray;
            this.switchProverb();
            console.log("lvl up");
        }
        else if (this.currentProverb.correct.length == 0) {
            this.switchProverb();
        }
        if (this.game.dead) {
            this.currentLevel = 0;
        }
        this.game.objSpeed += this.levels[this.currentLevel].acceleration;
        if (this.game.objSpeed > this.levels[this.currentLevel].maxSpeed)
            this.game.objSpeed = this.levels[this.currentLevel].maxSpeed;
    };
    Levels.prototype.restart = function () {
        this.currentLevel = 1;
        this.levelProgress = this.levels[this.currentLevel].proverbArray;
        this.switchProverb();
        this.game.dead = false;
        this.game.lifeCount = this.game.maxLifes;
        this.game.objSpeed = this.game.startObjSpeed;
        this.game.score = 0;
    };
    Levels.prototype.switchProverb = function () {
        this.currentProverb = this.random();
        console.log("almost new proverb");
        this.currentString = this.currentProverb.string;
        console.log("new proverb");
    };
    Levels.prototype.random = function () {
        var i = Math.floor(Math.random() * this.levelProgress.length);
        var j = this.levelProgress[i];
        this.levelProgress.splice(i, 1);
        return this.proverbs.list[j];
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
        this.playerImage = document.getElementById('player');
        this.width = 150;
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
        this.jumpKey = 32;
        this.duckKey = 40;
        this.ducking = false;
        this.game = game;
        this.y = this.game.ground - this.height;
        this.ground = this.game.ground;
        this.jumpHeight = this.ground - this.height - 250;
        this.minJumpHeight = this.ground - this.height - 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
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
        this.game.ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    };
    Player.prototype.onKeyDown = function (e) {
        if (e.keyCode == this.jumpKey) {
            if (this.game.dead || this.game.levelObject.currentLevel == 0) {
                this.game.levelObject.restart();
            }
            else if (!this.ducking) {
                this.mPressed = true;
                this.mReleased = false;
                this.sound.play();
            }
        }
        if (!this.game.dead && this.game.levelObject.currentLevel != 0) {
            if (e.keyCode == this.duckKey && !this.ducking && this.grounded) {
                this.height /= 2;
                this.y += this.height;
                this.ducking = true;
            }
        }
    };
    Player.prototype.onKeyUp = function (e) {
        if (e.keyCode == this.jumpKey) {
            this.mPressed = false;
            this.mReleased = true;
        }
        if (e.keyCode == this.duckKey && this.ducking) {
            this.y -= this.height;
            this.height *= 2;
            this.ducking = false;
        }
    };
    return Player;
}());
var Proverbs = (function () {
    function Proverbs() {
        this.list = [
            {
                string: "",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
            {
                string: "De .. valt niet ver van de boom",
                correct: ["appel"],
                incorrect: ["banaan"]
            },
            {
                string: "De ... in de pot vinden",
                correct: ["hond"],
                incorrect: ["kat"]
            },
            {
                string: "Zo sluw als een ...",
                correct: ["vos"],
                incorrect: ["vis"]
            },
            {
                string: "Als een ... in de val",
                correct: ["rat"],
                incorrect: ["muis"]
            },
            {
                string: "Hij is zo sterk als een ...",
                correct: ["beer"],
                incorrect: ["leeuw"]
            },
            {
                string: "als de ... van huis is, dansen de muizen op tafel",
                correct: ["kat"],
                incorrect: ["hond"]
            },
            {
                string: "Als er één ... over de dam is, volgen er meer",
                correct: ["schaap"],
                incorrect: ["geit"]
            },
            {
                string: "Er als de ... bij zijn",
                correct: ["kippen"],
                incorrect: ["koeien"]
            },
            {
                string: "Over ... en ... praten",
                correct: ["koetjes en kalfjes"],
                incorrect: ["bloemetjes en bijtjes "]
            },
            {
                string: "De ... uit de boom kijken",
                correct: ["kat"],
                incorrect: ["kip"]
            },
            {
                string: "... bijten niet",
                correct: ["Blaffende honden"],
                incorrect: ["Gillende katten"]
            },
            {
                string: "twee ... in één klap slaan ",
                correct: ["vliegen"],
                incorrect: ["mier"]
            },
            {
                string: "...-tranen huilen",
                correct: ["Krokodillen"],
                incorrect: ["dinosaurus"]
            },
            {
                string: "Nu komt de ... uit de mouw",
                correct: ["aap"],
                incorrect: ["muis"]
            },
            {
                string: "Men moet de huid niet verkopen voor de ... geschoten is",
                correct: ["beer"],
                incorrect: ["das"]
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
    function Word(game, index, fake) {
        this.width = 50;
        this.height = 50;
        this.fake = false;
        this.alive = true;
        this.game = game;
        this.x = this.game.canvasWidth;
        this.y = this.game.ground - this.height - 250;
        this.hspeed = this.game.objSpeed;
        this.fake = fake;
        this.index = index;
        if (this.fake) {
            this.name = this.game.levelObject.currentProverb.incorrect[index];
        }
        else {
            this.name = this.game.levelObject.currentProverb.correct[index];
        }
    }
    Word.prototype.update = function () {
        this.hspeed = this.game.objSpeed;
        if (this.game.collision(this)) {
            this.alive = false;
            if (!this.fake) {
                this.game.levelObject.currentProverb.correct.splice(this.index, 1);
            }
            else {
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