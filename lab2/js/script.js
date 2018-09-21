function drawBackground(ctx, maxWidth, maxHeight) {
    const earthSky = maxHeight / 5;
    ctx.fillStyle = '#3c78d8';
    ctx.fillRect(0, 0, maxWidth, maxHeight);

    ctx.fillStyle = '#6aa84f';
    ctx.fillRect(0, (4 * earthSky), maxWidth, earthSky);
}

//солнце
function drawSun(ctx, xSun, ySun, widthSun){
    ctx.fillStyle = '#ffe599';
    ctx.beginPath();
    ctx.arc(xSun, ySun, widthSun, 0, 2 * Math.PI);
    ctx.fill();
}

//лучи
function drawBeam(ctx, xSun, ySun, deg){
    const rad = deg * Math.PI / 180;
    ctx.fillStyle = '#ffe599';
    ctx.rotate(rad);
    ctx.beginPath();
    ctx.moveTo(xSun, ySun);
    ctx.lineTo(200, ySun);
    ctx.stroke();
}

function drawHome(ctx, xTopOfRoof, yTopOfRoof){
    //дом
    ctx.fillStyle = '#bf9000';
    ctx.fillRect(xTopOfRoof - 150, yTopOfRoof + 50, 300, 270);

    //труба
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.moveTo(xTopOfRoof + 50, yTopOfRoof + 50);
    ctx.lineTo(xTopOfRoof + 50, yTopOfRoof - 50);
    ctx.lineTo(xTopOfRoof + 100, yTopOfRoof - 50);
    ctx.lineTo(xTopOfRoof + 100, yTopOfRoof + 50);
    ctx.fill();

    //крыша
    ctx.fillStyle = '#cc0000';
    ctx.beginPath();
    ctx.moveTo(xTopOfRoof - 150, yTopOfRoof + 50);
    ctx.lineTo(xTopOfRoof, yTopOfRoof - 50);
    ctx.lineTo(xTopOfRoof + 150, yTopOfRoof + 50);
    ctx.lineTo(xTopOfRoof - 150, yTopOfRoof + 50);
    ctx.fill();

    //окно
    ctx.fillStyle = '#ffd966';
    ctx.fillRect(xTopOfRoof - 75, yTopOfRoof + 120, 150, 130);
    //рама
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.moveTo(xTopOfRoof, yTopOfRoof + 120);
    ctx.lineTo(xTopOfRoof, yTopOfRoof + 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xTopOfRoof - 75, yTopOfRoof + 185);
    ctx.lineTo(xTopOfRoof + 75, yTopOfRoof + 185);
    ctx.stroke();
}

function drawСloud(ctx, x, y){
    ctx.fillStyle = '#cfe2f3';
    ctx.beginPath();
    ctx.ellipse(x, y, 70, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(x+35, y+35, 70, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(x-35, y+35, 70, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function draw() {
    const canvas = document.getElementById('canvas');
    const maxWidth = canvas.offsetWidth;
    const maxHeight = canvas.offsetHeight;
    
    canvas.width = maxWidth;
    canvas.height = maxHeight;
    const ctx = canvas.getContext('2d');

    const xTopOfRoof = 550;
    const yTopOfRoof = 150;

    const xCloud1 = 250;
    const yCloud1 = 100;

    const xCloud2 = 550;
    const yCloud2 = 50;

    const xCloud3 = 850;
    const yCloud3 = 100;

    const xSun = 0;
    const ySun = 0;
    const widthSun = 100;

    const deg1 = 0;
    const deg2 = 15;

    
    drawBackground(ctx, maxWidth, maxHeight);
    drawSun(ctx, xSun, ySun, widthSun);
    drawСloud(ctx, xCloud1, yCloud1);
    drawСloud(ctx, xCloud2, yCloud2);
    drawСloud(ctx, xCloud3, yCloud3);
    drawHome(ctx, xTopOfRoof, yTopOfRoof);
}

window.onload = function() {
    draw();
};