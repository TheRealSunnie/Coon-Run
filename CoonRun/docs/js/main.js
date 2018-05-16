"use strict";
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameLoop = function () {
            _this.player.update();
            if (_this.ctx != null) {
                _this.ctx.fillStyle = "#D3D3D3";
                _this.ctx.fillRect(0, 0, 1280, 720);
                _this.ctx.beginPath();
                _this.ctx.fillStyle = "black";
                _this.ctx.lineWidth = 5;
                _this.ctx.fillRect(_this.player.x, _this.player.y, 100, 100);
                _this.ctx.stroke();
            }
            requestAnimationFrame(_this.gameLoop);
        };
        console.log("new game created!");
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.ground = 720;
        this.player = new Player(this.ground);
        requestAnimationFrame(this.gameLoop);
    }
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Player = (function () {
    function Player(y) {
        var _this = this;
        console.log("i am a player!");
        this.x = 15;
        this.y = y - 100;
        this.ground = y;
        this.jumping = false;
        this.vSpeed = 0;
        this.jumpSpeed = 50;
        this.acceleration = 15;
        this.gravity = -20;
        this.jumpHeight = 300;
        this.grounded = true;
        this.mPressed = false;
        this.mReleased = false;
        window.addEventListener("mousedown", function () { return _this.pressed(); });
        window.addEventListener("mouseup", function () { return _this.released(); });
    }
    Player.prototype.update = function () {
        console.log("updating the player");
        if (this.grounded) {
            if (this.mPressed)
                this.jumping = true;
            else
                this.jumping = false;
        }
        if (this.y < this.ground - this.jumpHeight) {
            this.jumping = false;
        }
        if (this.jumping) {
            if (this.vSpeed == 0)
                this.vSpeed += this.acceleration;
            if (this.vSpeed > this.jumpSpeed)
                this.vSpeed = this.jumpSpeed;
        }
        if (!this.jumping) {
            if (this.vSpeed > this.gravity)
                this.vSpeed -= 2;
            else
                this.vSpeed = this.gravity;
        }
        this.y -= this.vSpeed;
        if (this.y > this.ground - 100) {
            this.y = this.ground - 100;
            this.vSpeed = 0;
            this.grounded = true;
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