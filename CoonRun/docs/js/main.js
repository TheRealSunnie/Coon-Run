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
        this.spawnChance = 0.05;
        this.ground = 720;
        this.lifes = 3;
        this.dead = false;
        this.objSpeed = 6;
        this.canSpawn = false;
        this.spawnCD = 60;
        this.single = 0;
        this.double = 1;
        this.gameLoop = function () {
            if (_this.lifes == -10)
                _this.level.update(2);
            _this.player.update();
            if (_this.spawnCD > 0 && !_this.canSpawn) {
                _this.spawnCD--;
            }
            else {
                _this.spawnCD = 50;
                _this.canSpawn = true;
            }
            if (Math.random() < _this.spawnChance && _this.canSpawn) {
                var binType = void 0;
                if (Math.random() > .5) {
                    binType = 0;
                }
                else {
                    binType = 1;
                }
                _this.bins.push(new Bin(_this, _this.ground, _this.canvasWidth, binType));
                _this.canSpawn = false;
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
            if (_this.dead)
                _this.ctx.fillStyle = "red";
            _this.ctx.fillRect(_this.player.x, _this.player.y, _this.player.width, _this.player.height);
            for (var i = 0; i < _this.bins.length; i++) {
                _this.ctx.fillRect(_this.bins[i].x, _this.bins[i].y, _this.bins[i].width, _this.bins[i].height);
            }
            _this.ctx.font = "30px Arial";
            _this.ctx.fillText(_this.lifes + " lifes", 150, 450, 100);
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
    function Bin(game, ground, canvasWidth, type) {
        this.width = 50;
        this.height = 50;
        this.active = false;
        this.alive = true;
        this.gameObject = game;
        this.x = canvasWidth;
        this.y = ground - this.height;
        this.hspeed = this.gameObject.objSpeed;
        this.type = type;
        switch (this.type) {
            case this.gameObject.single:
                this.width = 75;
                break;
            case this.gameObject.double:
                this.width = 150;
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
        this.game = game;
        this.update(1);
    }
    Levels.prototype.update = function (level) {
        switch (level) {
            case 1:
                this.game.objSpeed = 8;
                break;
            case 2:
                this.game.objSpeed = 12;
                for (var i = 0; i < this.game.bins.length; i++) {
                    this.game.bins[i].hspeed = this.game.objSpeed;
                }
                break;
            default:
                this.game.objSpeed = 0;
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
        this.gravity = -50;
        this.grounded = true;
        this.mPressed = false;
        this.mReleased = false;
        this.sound = document.getElementById('jump');
        this.y = ground - this.height;
        this.ground = ground;
        this.jumpHeight = ground - this.height - 220;
        this.minJumpHeight = ground - this.height - 170;
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
                this.vSpeed -= this.acceleration / 3.5;
            else
                this.vSpeed -= this.acceleration;
            if (this.vSpeed < this.gravity)
                this.vSpeed = this.gravity;
        }
        this.y -= this.vSpeed;
        if (this.y > this.ground - this.height) {
            this.y = this.ground - this.height;
        }
        console.log(this.vSpeed);
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
//# sourceMappingURL=main.js.map