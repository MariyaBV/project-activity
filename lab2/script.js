function drawBackground(ctx, maxWidth, maxHeight) {
    
    ctx.fillStyle = '#3c78d8';
    ctx.fillRect(0, 0, maxWidth, maxHeight/5);

    ctx.fillStyle = '#6aa84f';
    ctx.fillRect(0, (4*maxHeight)/5, maxWidth, maxHeight/5);
}

function draw() {
    const canvas = document.getElementById('canvas');
    const maxWidth = canvas.offsetWidth;
    const maxHeight = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    drawBackground(ctx, maxWidth, maxHeight);
}

window.onload = function() {
    //const maxWidth = canvas.offsetWidth;
    //const maxHeight = canvas.offsetHeight;

    draw();
};