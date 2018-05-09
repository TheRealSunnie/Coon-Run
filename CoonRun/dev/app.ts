var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;


// Frame event
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "#D3D3D3";
    ctx.fillRect(0, 0, 1280, 720);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.lineWidth = 5;
    ctx.fillRect(0, 0, 100, 620);
    ctx.stroke();
 }
 
 // Initialize event
 window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    gameLoop();
 }