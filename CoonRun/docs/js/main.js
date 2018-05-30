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
        this.bins = [];
        this.binChance = 0.05;
        this.ground = 720;
        this.lifes = 3;
        this.dead = false;
        this.objSpeed = 9;
        this.canSpawnBin = false;
        this.binSpawnCD = 60;
        this.single = 0;
        this.double = 1;
        this.gameLoop = function () {
            _this.level.update();
            console.log(_this.objSpeed);
            _this.player.update();
            if (_this.binSpawnCD > 0 && !_this.canSpawnBin) {
                _this.binSpawnCD--;
            }
            else {
                _this.binSpawnCD = 50;
                _this.canSpawnBin = true;
            }
            if (Math.random() < _this.binChance && _this.canSpawnBin) {
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
            if (_this.lifes < 1 && !_this.dead) {
                _this.dead = true;
                console.log("game over");
            }
            _this.ctx.fillStyle = "#D3D3D3";
            _this.ctx.fillRect(0, 0, 1280, 720);
            _this.ctx.fillStyle = "black";
            _this.ctx.fillRect(_this.player.x, _this.player.y, _this.player.width, _this.player.height);
            for (var i = 0; i < _this.bins.length; i++) {
                _this.ctx.fillRect(_this.bins[i].x, _this.bins[i].y, _this.bins[i].width, _this.bins[i].height);
            }
            for (var i = 0; i < _this.level.words.length; i++) {
                if (_this.level.words[i].fake)
                    _this.ctx.fillStyle = "red";
                else
                    _this.ctx.fillStyle = "green";
                _this.ctx.fillRect(_this.level.words[i].x, _this.level.words[i].y, _this.level.words[i].width, _this.level.words[i].height);
            }
            _this.ctx.fillStyle = "black";
            _this.ctx.font = "30px Arial";
            _this.ctx.fillText(_this.lifes + " levens", 150, 450);
            _this.ctx.fillText(_this.level.proverb, _this.canvasWidth / 2, 100);
            _this.ctx.stroke();
            requestAnimationFrame(_this.gameLoop);
        };
        this.level = new Levels(this);
        this.player = new Player(this.ground);
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
        this.gameObject = game;
        this.x = this.gameObject.canvasWidth;
        this.y = this.gameObject.ground - this.height;
        this.hspeed = this.gameObject.objSpeed;
        this.type = type;
        switch (this.type) {
            case this.gameObject.single:
                this.width = 75;
                this.height = 50;
                this.y = this.gameObject.ground - this.height;
                break;
            case this.gameObject.double:
                this.width = 100;
                this.height = 100;
                this.y = this.gameObject.ground - this.height;
                break;
        }
    }
    Bin.prototype.update = function () {
        if (this.gameObject.collision(this)) {
            this.alive = false;
            this.gameObject.lifes--;
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
        this.game = game;
        this.proverb = "";
        this.switch(1);
    }
    Levels.prototype.update = function () {
        this.game.objSpeed += 0.001;
        if (this.game.objSpeed > this.maxSpeed)
            this.game.objSpeed = this.maxSpeed;
        if (this.wordSpawnCD > 0 && !this.canSpawnWord) {
            this.wordSpawnCD--;
        }
        else {
            this.wordSpawnCD = 300;
            this.canSpawnWord = true;
        }
        if (Math.random() < this.wordChance && this.canSpawnWord) {
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
    };
    Levels.prototype.switch = function (level) {
        switch (level) {
            case 1:
                this.proverb = "De ... valt niet ver van de boom";
                this.maxSpeed = 11;
                break;
            case 2:
                this.proverb = "De ... in de pot vinden";
                this.maxSpeed = 13;
                for (var i = 0; i < this.game.bins.length; i++) {
                    this.game.bins[i].hspeed = this.game.objSpeed;
                }
                break;
            default:
                this.maxSpeed = 0;
        }
    };
    return Levels;
}());
var Player = (function () {
    function Player(ground) {
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
        this.y = ground - this.height;
        this.ground = ground;
        this.jumpHeight = ground - this.height - 200;
        this.minJumpHeight = ground - this.height - 150;
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
        if (this.gameObject.collision(this)) {
            this.alive = false;
            if (!this.fake)
                this.gameObject.level.switch(2);
        }
        if (this.x < 0 - this.width) {
            this.alive = false;
        }
        this.x -= this.hspeed;
    };
    return Word;
}());
//# sourceMappingURL=main.js.map