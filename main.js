var canvas = document.getElementById("KacperCanvas");
var c = canvas.getContext("2d");
var ballRadius = 40;

var x = canvas.width / 2;
var y = canvas.height - 30;

// Velocity
var dx = 2;
var dy = -5;

// Rectangle settings
var rectangleHeight = 50;
var rectangleWidth = 50;
var rectangleX = (canvas.width - rectangleWidth) / 2;
var rectangleY = canvas.height - rectangleHeight;

// Circle settings
var circleX = rectangleX + rectangleWidth / 2;
var circleY = rectangleY;
var circleRadius = 10

var bullet = false;

// Keys
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    else if (e.keyCode == 32) {
        spacePressed = false;
    }
}

function drawRectangle() {
    c.beginPath();
    c.rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
    c.fillStyle = "#c40000";
    c.fill();
    c.closePath();
}

function shoot() {
    c.beginPath();
    c.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    c.fillStyle = "#0095DD";
    c.fill();
    c.closePath();

    circleY += dy;
}


function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle();

    if (rightPressed && rectangleX < canvas.width - rectangleWidth) {
        rectangleX += 7;
    }
    else if (leftPressed && rectangleX > 0) {
        rectangleX -= 7;
    }

    if (bullet == true) {
        shoot();
    }

    if (spacePressed) {
        circleX = rectangleX + rectangleWidth / 2;
        bullet = true;
        spacePressed = false;
    }


}


setInterval(draw, 10);

