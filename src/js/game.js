var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function drawSquares(n) {
    var startX = 20;
    var startY = 20;
    var width = 75;
    var height = 75;

    canvas.width = width * n + startX * 2;
    canvas.height = height + startY * 2;

    for (var i = 0; i < n; i++) {
        ctx.rect(startX + i * width, startY, width, height);    
    }
}

// ctx.rect(20, 20, 150, 100);
drawSquares(8)
ctx.stroke();