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
        this.ground = 620;
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
        this.y = y;
        this.ground = y;
        this.jumping = false;
        this.jumpSpeed = 8;
        this.jumpHeight = 150;
        this.gravity = 6;
        window.addEventListener("click", function () { return _this.jump(); });
    }
    Player.prototype.update = function () {
        console.log("updating the player");
        if (this.y < this.ground - this.jumpHeight)
            this.jumping = false;
        if (this.jumping)
            this.y -= this.jumpSpeed;
        else
            this.y += this.gravity;
        if (this.y > this.ground)
            this.y = this.ground;
    };
    Player.prototype.jump = function () {
        console.log("jump!");
        if (this.y > this.ground - 100)
            this.jumping = true;
    };
    return Player;
}());
var Test = (function () {
    function Test() {
        this.mijnvalue = true;
        this.doSomething();
        console.log("ik ben een test");
    }
    Test.prototype.doSomething = function () {
        console.log("doe iets");
    };
    return Test;
}());
//# sourceMappingURL=main.js.map