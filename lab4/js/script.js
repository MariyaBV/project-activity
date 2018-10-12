const EARTH_TO_SKY = 0.2;
const CLOUD_RADIUS = 105;
const SUN_RADIUS = 50;
const SUN_SPEED = Math.PI / 12;
const SUN_ORBIT = 350;
const SKY_SHADE = 240;
const MAX_TIME = 10; // для максимальной скорости
const TIME_CONSTANT = 0.5; // на сколько увеличивается скорость
const MIN_TIME = 1; // для минимальной скорости
let timeСhange = 0.5; // изменение скорости при нажатии
let spaceNotPress = true;
let windowColor = "#ffd966";

//земля
function drawEarth(ctx, width, height) {
    ctx.fillStyle = "#6aa84f";
    ctx.fillRect(0, (1 - EARTH_TO_SKY) * height, width, height);
}

function drawHome(ctx, xTopOfRoof, yTopOfRoof, windowColor){
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
    ctx.fillStyle = windowColor;
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

function moveSun({sun, boxWidth, boxHeight, dt, timeСhange}){
    deltaAngle = SUN_SPEED * dt * timeСhange;
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
    ctx.ellipse(cloud.x + 35, cloud.y + 25, 70, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(cloud.x - 35, cloud.y + 25, 70, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function moveСloud({cloud, boxWidth, dt, timeСhange}) {
    const distance = cloud.moveSpeed * dt * timeСhange;
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

function updateSky({sky, sun}) {
    sky.color.l = 100 - (Math.sin(sun.angle) + 1) * 50;
}

function update({sky, sun, clouds, boxWidth, boxHeight, dt, timeСhange}) {
    moveSun({sun, boxWidth, boxHeight, dt, timeСhange});
    for (const cloud of clouds) {
        moveСloud({cloud, boxWidth, dt, timeСhange});
    }
    updateSky({sky, sun});
}

function redraw({sky, sun, clouds, boxWidth, boxHeight, ctx, windowColor}) {
    const xTopOfRoof = 500;
    const yTopOfRoof = 170;

    drawSky({ctx, sky, boxWidth, boxHeight});
    drawSun({ctx, sun});
    for (const cloud of clouds) {
        drawСloud({ctx, cloud});
    };
    drawEarth(ctx, boxWidth, boxHeight);
    drawHome(ctx, xTopOfRoof, yTopOfRoof, windowColor);
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

    addEventListener("keydown", function(event) {
        if ((event.keyCode == 187) && (timeСhange <= MAX_TIME)) {
            timeСhange += TIME_CONSTANT;
        } else if ((event.keyCode == 189) && (timeСhange >= MIN_TIME)) {
            timeСhange -= TIME_CONSTANT;
        } else if ((event.keyCode == 32) && (spaceNotPress)) {
            spaceNotPress = false;
        } else if  ((event.keyCode == 32) && (!spaceNotPress)) {
            spaceNotPress = true;
        }
    });

    canvas.addEventListener("click", function(event) {
        if ((event.offsetX >= 425) && (event.offsetX <= 575) && (event.offsetY >= 290) && (event.offsetY <= 420)) {
            if (windowColor == '#ffd966'){
                windowColor = '#2b2a2a';
            } else {
                windowColor = '#ffd966';
            }
        }
    });

    redraw({
        sky,
        sun,
        clouds, 
        width, 
        height, 
        ctx,
        windowColor
    });

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;

        if (spaceNotPress){
            update({
                sky,
                sun,
                clouds,
                boxWidth: width,
                boxHeight: height,
                dt: deltaTime,
                timeСhange,
                windowColor
            });
        }
        
        redraw({
            sky,
            sun,
            clouds,
            boxWidth: width,
            boxHeight: height,
            ctx,
            windowColor
        });
        requestAnimationFrame(animateFn);
    }
    animateFn();
};

main();