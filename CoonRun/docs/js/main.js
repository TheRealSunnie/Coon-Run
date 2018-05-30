"use strict";
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
        this.bins = [];
        this.binChance = 0.03;
        this.lifes = [];
        this.lifeChance = 0.01;
        this.ground = 720;
        this.lifeCount = 3;
        this.score = 0;
        this.dead = false;
        this.objSpeed = 10;
        this.canSpawnLife = false;
        this.lifeSpawnCD = 1000;
        this.canSpawnBin = false;
        this.binSpawnCD = 60;
        this.single = 0;
        this.double = 1;
        this.clouds = [];
        this.cloudChance = 0.1;
        this.cloudSpawnCD = 60;
        this.canSpawnCloud = false;
        this.gameLoop = function () {
            _this.levelObject.update();
            _this.player.update();
            if (_this.binSpawnCD > 0 && !_this.canSpawnBin) {
                _this.binSpawnCD--;
            }
            else {
                _this.binSpawnCD = 70;
                _this.canSpawnBin = true;
            }
            if (Math.random() < _this.binChance && _this.canSpawnBin && !_this.dead) {
                var binType = void 0;
                if (Math.random() > .5) {
                    binType = 0;
                }
                else {
                    binType = 1;
                }
                _this.bins.push(new Bin(_this, binType));
                _this.canSpawnBin = false;
            }
            var deleteBin = [];
            for (var i = 0; i < _this.bins.length; i++) {
                _this.bins[i].update();
                if (!_this.bins[i].alive) {
                    deleteBin.push(i);
                }
            }
            for (var i in deleteBin) {
                _this.bins.splice(parseInt(i), 1);
            }
            if (_this.cloudSpawnCD > 0 && !_this.canSpawnCloud) {
                _this.cloudSpawnCD--;
            }
            else {
                _this.cloudSpawnCD = 50;
                _this.canSpawnCloud = true;
            }
            if (Math.random() < _this.cloudChance && _this.canSpawnCloud) {
                _this.clouds.push(new Cloud(_this));
                _this.canSpawnCloud = false;
            }
            var deleteCloud = [];
            for (var i = 0; i < _this.clouds.length; i++) {
                _this.clouds[i].update();
                if (!_this.clouds[i].alive) {
                    deleteCloud.push(i);
                }
            }
            for (var i in deleteCloud) {
                _this.clouds.splice(parseInt(i), 1);
            }
            if (_this.lifeSpawnCD > 0 && !_this.canSpawnLife) {
                _this.lifeSpawnCD--;
            }
            else {
                _this.lifeSpawnCD = 1100;
                _this.canSpawnLife = true;
            }
            if (Math.random() < _this.lifeChance && _this.canSpawnLife) {
                _this.lifes.push(new Life(_this));
                _this.canSpawnLife = false;
            }
            var deleteLife = [];
            for (var i = 0; i < _this.lifes.length; i++) {
                _this.lifes[i].update();
                if (!_this.lifes[i].alive) {
                    deleteLife.push(i);
                }
            }
            for (var i in deleteLife) {
                _this.lifes.splice(parseInt(i), 1);
            }
            if (_this.lifeCount < 1 && !_this.dead) {
                _this.dead = true;
                console.log("game over");
            }
            if (_this.dead) {
                _this.levelObject.switch(0);
            }
            if (_this.score < 0) {
                _this.score = 0;
            }
            _this.ctx.fillStyle = "#D3D3D3";
            _this.ctx.fillRect(0, 0, 1280, 720);
            _this.ctx.fillStyle = "white";
            for (var i = 0; i < _this.clouds.length; i++) {
                _this.ctx.fillRect(_this.clouds[i].x, _this.clouds[i].y, _this.clouds[i].width, _this.clouds[i].height);
            }
            _this.ctx.fillStyle = "black";
            _this.ctx.fillRect(_this.player.x, _this.player.y, _this.player.width, _this.player.height);
            for (var i = 0; i < _this.bins.length; i++) {
                _this.ctx.fillRect(_this.bins[i].x, _this.bins[i].y, _this.bins[i].width, _this.bins[i].height);
            }
            for (var i = 0; i < _this.levelObject.words.length; i++) {
                if (_this.levelObject.words[i].fake)
                    _this.ctx.fillStyle = "red";
                else
                    _this.ctx.fillStyle = "green";
                _this.ctx.fillRect(_this.levelObject.words[i].x, _this.levelObject.words[i].y, _this.levelObject.words[i].width, _this.levelObject.words[i].height);
            }
            for (var i = 0; i < _this.lifes.length; i++) {
                _this.ctx.fillStyle = "#00FFFF";
                _this.ctx.fillRect(_this.lifes[i].x, _this.lifes[i].y, _this.lifes[i].width, _this.lifes[i].height);
            }
            _this.ctx.fillStyle = "black";
            _this.ctx.font = "30px Arial";
            _this.ctx.fillText(_this.lifeCount + " levens", 150, 450);
            _this.ctx.fillText("Score: " + _this.score, 50, 100);
            _this.ctx.fillText(_this.levelObject.proverb, _this.canvasWidth / 2, 100);
            _this.ctx.stroke();
            requestAnimationFrame(_this.gameLoop);
        };
        this.levelObject = new Levels(this);
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
var Cloud = (function () {
    function Cloud(game) {
        this.width = 100;
        this.height = 50;
        this.alive = true;
        this.gameObject = game;
        this.x = this.gameObject.canvasWidth;
        this.y = Math.floor(Math.random() * 200) + 2;
        this.hspeed = this.gameObject.objSpeed;
    }
    Cloud.prototype.update = function () {
        this.hspeed = this.gameObject.objSpeed;
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
    };
    return Cloud;
}());
var Bin = (function () {
    function Bin(game, type) {
        this.width = 50;
        this.height = 50;
        this.alive = true;
        this.gameObject = game;
        this.hspeed = this.gameObject.objSpeed;
        this.x = this.gameObject.canvasWidth;
        this.y = this.gameObject.ground - this.height;
        this.type = type;
        switch (this.type) {
            case this.gameObject.single:
                this.width = 75;
                this.height = 100;
                this.y = this.gameObject.ground - this.height;
                break;
            case this.gameObject.double:
                this.width = 100;
                this.height = 120;
                this.y = this.gameObject.ground - this.height;
                break;
        }
    }
    Bin.prototype.update = function () {
        this.hspeed = this.gameObject.objSpeed;
        if (this.gameObject.collision(this)) {
            this.alive = false;
            this.gameObject.lifeCount--;
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
    };
    return Bin;
}());
var Levels = (function () {
    function Levels(game) {
        this.words = [];
        this.maxSpeed = 0;
        this.wordChance = 0.05;
        this.canSpawnWord = false;
        this.wordSpawnCD = 300;
        this.gameObject = game;
        this.proverb = "";
        this.switch(this.gameObject.currentLevel);
    }
    Levels.prototype.update = function () {
        if (this.gameObject.currentLevel > 4)
            this.gameObject.currentLevel = 4;
        this.gameObject.objSpeed += 0.001;
        if (this.gameObject.objSpeed > this.maxSpeed)
            this.gameObject.objSpeed = this.maxSpeed;
        if (this.wordSpawnCD > 0 && !this.canSpawnWord) {
            this.wordSpawnCD--;
        }
        else {
            this.wordSpawnCD = 300;
            this.canSpawnWord = true;
        }
        if (Math.random() < this.wordChance && this.canSpawnWord && !this.gameObject.dead) {
            var wordType = void 0;
            if (Math.random() > .5) {
                wordType = true;
            }
            else {
                wordType = false;
            }
            this.words.push(new Word(this.gameObject, 0, wordType));
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
    };
    Levels.prototype.switch = function (level) {
        switch (level) {
            case 0:
                this.maxSpeed = 0;
                break;
            case 1:
                this.proverb = "De ... valt niet ver van de boom";
                this.maxSpeed = 13;
                break;
            case 2:
                this.proverb = "De ... in de pot vinden";
                this.maxSpeed = 15;
                break;
            case 3:
                this.proverb = "Zo sluw als een ...";
                this.maxSpeed = 17;
                break;
            case 4:
                this.proverb = "Als een ... in de val";
                this.maxSpeed = 20;
                break;
        }
    };
    return Levels;
}());
var Life = (function () {
    function Life(game) {
        this.width = 50;
        this.height = 50;
        this.alive = true;
        this.gameObject = game;
        this.hspeed = this.gameObject.objSpeed;
        this.x = this.gameObject.canvasWidth;
        this.y = 400;
    }
    Life.prototype.update = function () {
        this.hspeed = this.gameObject.objSpeed;
        if (this.gameObject.collision(this)) {
            this.alive = false;
            this.gameObject.lifeCount++;
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
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
        this.gameObject = game;
        this.y = this.gameObject.ground - this.height;
        this.ground = this.gameObject.ground;
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
    };
    Player.prototype.pressed = function () {
        console.log("pressed");
        this.mPressed = true;
        this.mReleased = false;
        this.sound.play();
        if (this.gameObject.dead) {
            this.gameObject.dead = false;
            this.gameObject.lifeCount = 3;
            this.gameObject.currentLevel = 1;
            this.gameObject.levelObject.switch(this.gameObject.currentLevel);
            this.gameObject.objSpeed = 10;
            this.gameObject.score = 0;
            this.gameObject.binSpawnCD = 100;
            this.gameObject.canSpawnBin = false;
            this.gameObject.cloudSpawnCD = 100;
            this.gameObject.canSpawnCloud = false;
            this.gameObject.canSpawnLife = false;
            this.gameObject.lifeSpawnCD = 100;
            this.gameObject.levelObject.wordSpawnCD = 200;
            this.gameObject.levelObject.canSpawnWord = false;
        }
    };
    Player.prototype.released = function () {
        console.log("release");
        this.mPressed = false;
        this.mReleased = true;
    };
    return Player;
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
        this.gameObject = game;
        this.x = this.gameObject.canvasWidth;
        this.y = this.gameObject.ground - this.height - 250;
        this.hspeed = this.gameObject.objSpeed;
        this.name = name;
        this.fake = fake;
    }
    Word.prototype.update = function () {
        this.hspeed = this.gameObject.objSpeed;
        if (this.gameObject.collision(this)) {
            this.alive = false;
            if (!this.fake) {
                this.gameObject.currentLevel++;
                this.gameObject.levelObject.switch(this.gameObject.currentLevel);
                this.gameObject.score++;
            }
            else {
                this.gameObject.score--;
            }
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
    };
    return Word;
}());
//# sourceMappingURL=main.js.map