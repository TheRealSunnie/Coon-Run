"use strict";
var Pickup = (function () {
    function Pickup(ground, canvasWidth, hspeed) {
        console.log("hier komt een prullebakkie");
        this.width = 50;
        this.height = 50;
        this.canvasWidth = canvasWidth;
        this.x = canvasWidth;
        this.y = ground - this.height;
        this.hspeed = hspeed;
        this.active = false;
    }
    Pickup.prototype.update = function () {
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
    return Pickup;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = 1280;
        this.bins = [];
        this.maxBins = 5;
        this.gameLoop = function () {
            _this.player.update();
            var chance = 0.002;
            if (_this.spawnCD > 0 && !_this.canSpawn) {
                _this.spawnCD--;
            }
            else {
                _this.spawnCD = 120;
                _this.canSpawn = true;
            }
            for (var i = 0; i < _this.maxBins; i++) {
                if (Math.random() < chance && _this.canSpawn) {
                    _this.bins[i].active = true;
                    if (Math.random() > .5) {
                        _this.bins[i].type = _this.bins[i].single;
                    }
                    else {
                        _this.bins[i].type = _this.bins[i].double;
                    }
                    _this.bins[i].x = _this.canvasWidth;
                    _this.bins[i].y = _this.ground - _this.bins[i].height;
                    _this.canSpawn = false;
                }
                if (_this.collision(_this.bins[i])) {
                    _this.bins[i].active = false;
                    if (!_this.dead)
                        _this.dead = true;
                    else
                        _this.dead = false;
                    console.log("collision detected");
                }
                _this.bins[i].update();
            }
            console.log(_this.spawnCD, _this.canSpawn);
            _this.ctx.fillStyle = "#D3D3D3";
            _this.ctx.fillRect(0, 0, 1280, 720);
            _this.ctx.beginPath();
            _this.ctx.fillStyle = "black";
            if (_this.dead)
                _this.ctx.fillStyle = "red";
            _this.ctx.lineWidth = 5;
            _this.ctx.fillRect(_this.player.x, _this.player.y, _this.player.width, _this.player.height);
            for (var i = 0; i < _this.maxBins; i++) {
                _this.ctx.fillRect(_this.bins[i].x, _this.bins[i].y, _this.bins[i].width, _this.bins[i].height);
            }
            _this.ctx.stroke();
            requestAnimationFrame(_this.gameLoop);
        };
        console.log("new game created!");
        this.ground = 720;
        this.dead = false;
        this.objSpeed = 10;
        this.canSpawn = false;
        this.spawnCD = 100;
        this.player = new Player(this.ground);
        for (var i = 0; i < this.maxBins; i++) {
            this.bins.push(new Bin(this.ground, this.canvasWidth, this.objSpeed));
            console.log("Bin created");
        }
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
    function Bin(ground, canvasWidth, hspeed) {
        this.single = 0;
        this.double = 1;
        this.type = this.single;
        console.log("hier komt een prullebakkie");
        this.width = 50;
        this.height = 50;
        this.canvasWidth = canvasWidth;
        this.x = canvasWidth;
        this.y = ground - this.height;
        this.hspeed = hspeed;
        this.active = false;
    }
    Bin.prototype.update = function () {
        switch (this.type) {
            case this.single:
                this.width = 75;
                break;
            case this.double:
                this.width = 150;
                break;
        }
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
    return Bin;
}());
var Player = (function () {
    function Player(ground) {
        var _this = this;
        console.log("i am a player!");
        this.width = 100;
        this.height = 100;
        this.x = 15;
        this.y = ground - this.height;
        this.ground = ground;
        this.jumping = false;
        this.vSpeed = 0;
        this.jumpSpeed = 20;
        this.acceleration = 5;
        this.gravity = -20;
        this.jumpHeight = ground - 400;
        this.minJumpHeight = ground - 300;
        this.grounded = true;
        this.mPressed = false;
        this.mReleased = false;
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
        if (!this.jumping) {
            this.vSpeed -= this.acceleration;
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