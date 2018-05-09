"use strict";
var canvas;
var ctx;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "#D3D3D3";
    ctx.fillRect(0, 0, 1280, 720);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.lineWidth = 5;
    ctx.fillRect(0, 0, 100, 100);
    ctx.stroke();
}
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    gameLoop();
};
//# sourceMappingURL=main.js.map