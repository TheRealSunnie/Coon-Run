"use strict";
var Game = (function () {
    function Game() {
        console.log("new game created!");
        this.player = new Player();
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        this.player.update();
        this.ctx.fillStyle = "#D3D3D3";
        this.ctx.fillRect(0, 0, 1280, 720);
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(0, 620, 100, 100);
        this.ctx.stroke();
        requestAnimationFrame(this.gameLoop);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Player = (function () {
    function Player() {
        this.ypositie = 0;
        console.log("i am a player!");
    }
    Player.prototype.update = function () {
        this.ypositie++;
        console.log("updating the player");
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