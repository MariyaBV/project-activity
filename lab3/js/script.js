const EARTH_TO_SKY = 0.2;
const CLOUD_RADIUS = 105;
const SUN_RADIUS = 50;
const SUN_SPEED = Math.PI / 12;
const SUN_ORBIT = 300;
const SKY_SHADE = 240;

//земля
function drawEarth(ctx, width, height) {
    ctx.fillStyle = "#6aa84f";
    ctx.fillRect(0, (1 - EARTH_TO_SKY) * height, width, height);
}

function drawHome(ctx, xTopOfRoof, yTopOfRoof){
    //дом
    ctx.fillStyle = "#bf9000";
    ctx.fillRect(xTopOfRoof - 150, yTopOfRoof + 50, 300, 270);

    //труба
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.moveTo(xTopOfRoof + 50, yTopOfRoof + 50);
    ctx.lineTo(xTopOfRoof + 50, yTopOfRoof - 50);
    ctx.lineTo(xTopOfRoof + 100, yTopOfRoof - 50);
    ctx.lineTo(xTopOfRoof + 100, yTopOfRoof + 50);
    ctx.fill();

    //крыша
    ctx.fillStyle = "#cc0000";
    ctx.beginPath();
    ctx.moveTo(xTopOfRoof - 150, yTopOfRoof + 50);
    ctx.lineTo(xTopOfRoof, yTopOfRoof - 50);
    ctx.lineTo(xTopOfRoof + 150, yTopOfRoof + 50);
    ctx.lineTo(xTopOfRoof - 150, yTopOfRoof + 50);
    ctx.fill();

    //окно
    ctx.fillStyle = "#ffd966";
    ctx.fillRect(xTopOfRoof - 75, yTopOfRoof + 120, 150, 130);
    //рама
    ctx.fillStyle = "#666";
    ctx.beginPath();
    ctx.moveTo(xTopOfRoof, yTopOfRoof + 120);
    ctx.lineTo(xTopOfRoof, yTopOfRoof + 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xTopOfRoof - 75, yTopOfRoof + 185);
    ctx.lineTo(xTopOfRoof + 75, yTopOfRoof + 185);
    ctx.stroke();
}

function Sun({
    startX,
    startY,
    angle,
}) {
    this.x = startX;
    this.y = startY;
    this.angle = angle;
}

function Cloud({
    startX,
    startY,
    moveSpeed,
}) {
    this.x = startX;
    this.y = startY;
    this.moveSpeed = moveSpeed;
}

function Sky({
    color
}) {
    this.color = color;
}

function HslColor({
    hue,
    saturation,
    lightness,
}) {
    this.h = hue;
    this.s = saturation;
    this.l = lightness;

    this.toFillStyle = function () {
        const h = SKY_SHADE;
        const s = this.s;
        const l = this.l;
        return "hsl(" + h + "," + s + "%," + l + "%)";
    }
}

//солнце
function drawSun({ctx, sun}){
    ctx.fillStyle = '#ffe599';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, SUN_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
}

function moveSun({sun, boxWidth, boxHeight, dt}){
    deltaAngle = SUN_SPEED * dt;
    sun.angle += deltaAngle;
    sun.angle %= 2 * Math.PI; 
    sun.x = SUN_ORBIT * Math.cos(sun.angle) + boxWidth / 2;
    sun.y = SUN_ORBIT * Math.sin(sun.angle) + (1 - EARTH_TO_SKY) * boxHeight;
}

//облака
function drawСloud({ctx, cloud}){
    ctx.fillStyle = "#cfe2f3";
    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, 70, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(cloud.x + 35, cloud.y + 35, 70, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(cloud.x - 35, cloud.y + 35, 70, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function moveСloud({cloud, boxWidth, dt}) {
    const distance = cloud.moveSpeed * dt;
    cloud.x -= distance;

    if (cloud.x < (- (CLOUD_RADIUS * 2))) {
        cloud.x = boxWidth + CLOUD_RADIUS * 2;
    }
}

function createCloud({boxWidth,  boxHeight}) {
    const startX = boxWidth + 2 * CLOUD_RADIUS;
    const startY = Math.random() * boxHeight * 0.3 + 50; // random[0,1)*150px + 50px
    const moveSpeed = Math.random() * 500 + 10;
    return new Cloud({
        startX,
        startY,
        moveSpeed,
    });
};

//небо
function drawSky({ctx, sky, boxWidth, boxHeight}) {
    ctx.fillStyle = sky.color.toFillStyle();
    ctx.fillRect(0, 0, boxWidth, boxHeight);
}

function moveSky({sky, sun}) {
    const lightness = 100 - (Math.sin(sun.angle) + 1) * 50;
    sky.color.l = lightness;
}

function update({sky, sun, clouds, boxWidth, boxHeight, dt}) {
    moveSun({sun, boxWidth, boxHeight, dt});
    for (const cloud of clouds) {
        moveСloud({cloud, boxWidth, dt});
    }
    moveSky({sky, sun});
}

function redraw({sky, sun, clouds, boxWidth, boxHeight, ctx}) {
    const xTopOfRoof = 500;
    const yTopOfRoof = 170;

    drawSky({ctx, sky, boxWidth, boxHeight});
    drawSun({ctx, sun});
    for (const cloud of clouds) {
        drawСloud({ctx, cloud});
    };
    drawEarth(ctx, boxWidth, boxHeight);
    drawHome(ctx, xTopOfRoof, yTopOfRoof);
}

function main() {
    const canvas = document.getElementById('canvas');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const sun = new Sun({
        startX: width * 0.8, 
        startY: height * (1 - EARTH_TO_SKY),
        angle: Math.PI
    });
    const clouds = [];
    const MAX_CLOUD = 3;
    for (let i = 1; i <= MAX_CLOUD; ++i) {
        clouds.push(createCloud({
            boxWidth: width,
            boxHeight: height,
        }));
    }
    const hsl = new HslColor({
        hue: SKY_SHADE, 
        saturation: 100, 
        lightness: 50
    });
    const sky = new Sky({
        color: hsl
    });

    redraw({
        sky,
        sun,
        clouds, 
        width, 
        height, 
        ctx
    });

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        update({
            sky,
            sun,
            clouds,
            boxWidth: width,
            boxHeight: height,
            dt: deltaTime,
        });
        redraw({
            sky,
            sun,
            clouds,
            boxWidth: width,
            boxHeight: height,
            ctx,
        });
        requestAnimationFrame(animateFn);
    }
    animateFn();
};

main();