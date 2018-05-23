"use strict";
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameLoop = function () {
            _this.player.update();
            _this.bin.update();
            if (_this.collision(_this.bin)) {
                _this.bin.x = 1280;
                if (!_this.dead)
                    _this.dead = true;
                else
                    _this.dead = false;
                console.log("collision detected");
            }
            if (_this.ctx != null) {
                _this.ctx.fillStyle = "#D3D3D3";
                _this.ctx.fillRect(0, 0, 1280, 720);
                _this.ctx.beginPath();
                _this.ctx.fillStyle = "black";
                if (_this.dead)
                    _this.ctx.fillStyle = "red";
                _this.ctx.lineWidth = 5;
                _this.ctx.fillRect(_this.player.x, _this.player.y, _this.player.width, _this.player.height);
                _this.ctx.fillRect(_this.bin.x, _this.bin.y, _this.bin.width, _this.bin.height);
                _this.ctx.stroke();
            }
            requestAnimationFrame(_this.gameLoop);
        };
        console.log("new game created!");
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.ground = 720;
        this.player = new Player(this.ground);
        this.bin = new Bin(this.ground);
        this.dead = false;
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
    function Bin(ground) {
        console.log("hier komt een prullebakkie");
        this.width = 50;
        this.height = 50;
        this.x = 1280;
        this.y = ground - this.height;
        this.hspeed = 12;
    }
    Bin.prototype.update = function () {
        this.x -= this.hspeed;
        if (this.x < 0 - this.width) {
            this.x = 1280;
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
        this.y = ground - 1 - this.height;
        this.ground = ground - 1;
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