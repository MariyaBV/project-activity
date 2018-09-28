//земля
function drawEarth(ctx, width, height) {
    const earthSky = 0.2;

    ctx.fillStyle = '#6aa84f';
    ctx.fillRect(0, (1 - earthSky) * height, width, height);
}

//солнце
// function drawSun(ctx, xSun, ySun, widthSun){
//     ctx.fillStyle = '#ffe599';
//     ctx.beginPath();
//     ctx.arc(xSun, ySun, widthSun, 0, 2 * Math.PI);
//     ctx.fill();
// }

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

function Сloud({
    startX,
    startY
}) {
    this.x = startX;
    this.y = startY;
}

Сloud.RADIUS = 105;
Сloud.SPEED = 300;

//небо
function drawSky(ctx, boxWidth, boxHeight) {   
    ctx.fillStyle = '#3c78d8';
    ctx.fillRect(0, 0, boxWidth, boxHeight);
}

function drawСloud(ctx, cloud){
    ctx.fillStyle = '#cfe2f3';
    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, 70, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(cloud.x + 35, cloud.y + 35, 70, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(cloud.x - 35, cloud.y + 35, 70, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function redraw({ctx, boxWidth, boxHeight, clouds}) {
    drawSky({ctx, boxWidth, boxHeight});
    for (const cloud of clouds) {
        drawСloud({ctx, cloud});
    }
}

function moveСloud({cloud, boxWidth, dt}) {
    cloud.x -= Сloud.SPEED * dt;

    if (cloud.x < (- (Сloud.RADIUS * 2))) {
        cloud.x = boxWidth + Сloud.RADIUS * 2;
    }
}

function update({clouds, dt, boxWidth}) {
    for (const cloud of clouds) {
        moveСloud({cloud, boxWidth, dt});
    }
}

function createCloud(boxWidth,  boxHeight) {
    const startX = boxWidth + 2 * Сloud.RADIUS;
    const startY = Math.random() * boxHeight * 0.3 + 100; // random[0,1)*150px + 100px
    return new Cloud({
        startX,
        startY,
    });
};

function main() {
    const canvas = document.getElementById('canvas');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight
    const ctx = canvas.getContext('2d');

    const xTopOfRoof = 550;
    const yTopOfRoof = 150;

    const clouds = [];
    const MAX_CLOUDS = 3;
    for (let i = 0; i < MAX_CLOUDS; ++i) {
        clouds.push(createCloud({
            boxWidth: width,
            boxHeight: height,
        }));
    }

    redraw({ctx, width, height, clouds: [cloud]});

    drawEarth(ctx, width, height) 
    drawHome(ctx, xTopOfRoof, yTopOfRoof);

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update({
            clouds: [cloud],
            boxWidth: width,
            boxHeight: height,
            dt: deltaTime,
        });
        redraw({
            clouds: [cloud],
            boxWidth: width,
            boxHeight: height,
            ctx,
        });
        requestAnimationFrame(animateFn);
    }
    animateFn();
} 

window.onload = function() {
    main();
};