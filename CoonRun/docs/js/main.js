"use strict";
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById('cnvs');
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = 1280;
        this.bins = [];
        this.spawnChance = 0.05; // Chance of bin spawning
        this.ground = 720;
        this.lifes = 3;
        this.dead = false;
        this.objSpeed = 6;
        this.canSpawn = false;
        this.spawnCD = 60;
        this.single = 0;
        this.double = 1;
        this.gameLoop = function () {
            console.log(_this.objSpeed);
            if (_this.lifes == -10)
                _this.level.update(2);
            // Update stuff
            _this.player.update();
            // Countdown for spawning
            if (_this.spawnCD > 0 && !_this.canSpawn) {
                _this.spawnCD--;
            }
            else {
                _this.spawnCD = 50;
                _this.canSpawn = true; // Bin may spawn when spawnCD hits 0
            }
            if (Math.random() < _this.spawnChance && _this.canSpawn) {
                var binType = void 0;
                if (Math.random() > .5) {
                    binType = 0;
                }
                else {
                    binType = 1;
                }
                // New bin
                _this.bins.push(new Bin(_this, _this.ground, _this.canvasWidth, binType));
                console.log("Bin created");
                _this.canSpawn = false; // Restart the cooldown for spawning
            }
            var deleteBin = []; // Temp holder for removed bins
            for (var i = 0; i < _this.bins.length; i++) {
                _this.bins[i].update(); // Moves the bins
                if (!_this.bins[i].alive) {
                    deleteBin.push(i); // Move object to the temp holder
                }
            }
            for (var i in deleteBin) {
                _this.bins.splice(parseInt(i), 1); // Empty the temp holder
            }
            if (_this.lifes < 1 && !_this.dead) {
                _this.dead = true;
                console.log("game over");
            }
            // Draw stuff
            _this.ctx.fillStyle = "#D3D3D3"; // Color
            _this.ctx.fillRect(0, 0, 1280, 720); // Clears canvas
            _this.ctx.fillStyle = "black";
            if (_this.dead)
                _this.ctx.fillStyle = "red";
            // Use fillRect to draw blocks
            _this.ctx.fillRect(_this.player.x, _this.player.y, _this.player.width, _this.player.height);
            for (var i = 0; i < _this.bins.length; i++) {
                _this.ctx.fillRect(_this.bins[i].x, _this.bins[i].y, _this.bins[i].width, _this.bins[i].height);
            }
            _this.ctx.font = "30px Arial";
            _this.ctx.fillText(_this.lifes + " lifes", 50, 450, 100);
            _this.ctx.stroke(); // This draws all of the above
            // Next frame
            requestAnimationFrame(_this.gameLoop);
        };
        //console.log("new game created!")
        this.level = new Levels(this);
        this.player = new Player(this.ground);
        // Start looping stuff
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
// Makes sure stuff actually happens on load
window.addEventListener("load", function () { return new Game(); });
var Bin = /** @class */ (function () {
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
        // If there is a collision toggle the player state
        if (this.gameObject.collision(this)) {
            this.alive = false;
            this.gameObject.lifes--;
            //if (!this.gameObject.dead) this.gameObject.dead = true; else this.gameObject.dead = false
            //console.log("collision detected")
        }
        // Deactivate when bin leaves left side of screen
        if (this.x < 0 - this.width) {
            // Delete bin
            this.alive = false;
        }
        // Move
        this.x -= this.hspeed;
    };
    return Bin;
}());
var Levels = /** @class */ (function () {
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
var Player = /** @class */ (function () {
    function Player(ground) {
        var _this = this;
        this.width = 100;
        this.height = 100;
        this.x = 15;
        this.jumping = false;
        this.vSpeed = 0;
        this.jumpSpeed = 20;
        this.acceleration = 5;
        this.gravity = -20;
        this.grounded = true;
        this.mPressed = false;
        this.mReleased = false;
        this.sound = document.getElementById('jump');
        //console.log("i am a player!")
        this.y = ground - this.height;
        this.ground = ground;
        this.vSpeed = 0;
        this.jumpSpeed = 20;
        this.acceleration = 5;
        this.gravity = -20;
        this.jumpHeight = ground - 400;
        this.minJumpHeight = ground - 300;
        // Checks for input
        window.addEventListener("mousedown", function () { return _this.pressed(); });
        window.addEventListener("mouseup", function () { return _this.released(); });
    }
    Player.prototype.update = function () {
        //console.log("updating the player")
        // Check if grounded
        if (this.y + this.height == this.ground)
            this.grounded = true;
        // Check if can jump and enable jump
        if (this.grounded) {
            this.vSpeed = 0;
            if (this.mPressed)
                this.jumping = true;
        }
        // Stop jumping if mouse is released and player is past the min jump height
        if (this.jumping && this.mReleased && this.y < this.minJumpHeight) {
            this.jumping = false;
        }
        // Stop jumping if player reaches max height
        if (this.y < this.jumpHeight) {
            this.jumping = false;
        }
        // Change the speed if player is jumping
        if (this.jumping) {
            this.grounded = false;
            this.vSpeed += this.acceleration;
            if (this.vSpeed > this.jumpSpeed)
                this.vSpeed = this.jumpSpeed;
        }
        // Change the speed if player is not jumping
        if (!this.jumping) {
            this.vSpeed -= this.acceleration;
            if (this.vSpeed < this.gravity)
                this.vSpeed = this.gravity;
        }
        // Move the player based on its speed
        this.y -= this.vSpeed;
        // Makes sure player doesn't go below the ground
        if (this.y > this.ground - this.height) {
            this.y = this.ground - this.height;
        }
    };
    // Changes the input variables
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
var Test = /** @class */ (function () {
    function Test() {
        // Hier initializeren je stuff
        this.mijnvalue = true;
        this.update();
        console.log("ik ben een test");
    }
    Test.prototype.update = function () {
        //Hier loop je stuff
        console.log("doe iets");
    };
    return Test;
}());
var Trash = /** @class */ (function () {
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
