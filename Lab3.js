var canvas = document.getElementById("KacperCanvas");
var c = canvas.getContext("2d");

// Class for actors in game
class Actor {
    constructor(x, y, width, height, color, velocity) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
    }

    drawRectangle() {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    drawArc() {
        c.beginPath();
        c.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.y = this.y + this.velocity;
    }
}

//Road properties
roadX = 100;
roadY = 0;
roadWidth = canvas.width - 200;
roadHeight = canvas.height;

//Road line properties
var roadLineWidth = 10;
var roadLineHeight = 75;

//Player properties
var playerWidth = 40;
var playerHeight = 80;

// Keys
rightPressed = false;
leftPressed = false;

// Road
var road = new Actor(roadX, roadY, roadWidth, roadHeight, "#A8A8A8", 0);
//Player
var player = new Actor(canvas.width/2 - playerWidth/2, canvas.height - playerHeight - 30, playerWidth, playerHeight, "#AF0000", 5);

var roadLine = new Actor(canvas.width / 2 - roadLineWidth / 2, 0, roadLineWidth, roadLineHeight, "#FFFFFF", 1)

var roadLines = [];

function drawRoadLines() {
    roadLines.push(new Actor(canvas.width / 2 - roadLineWidth / 2, -100, roadLineWidth, roadLineHeight, "#FFFFFF", 3));
}

addEventListener('keydown', function(e) {
    e.preventDefault();
    if (e.keyCode === 39) {
        rightPressed = true;
    }
    if (e.keyCode === 37) {
        leftPressed = true;
    }
});

addEventListener('keyup', function(e) {
    e.preventDefault();
    if (e.keyCode === 39) {
        rightPressed = false;
    }
    if (e.keyCode === 37) {
        leftPressed = false;
    }
});

function clearScreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}


function animate() {
    clearScreen();
    
    window.requestAnimationFrame(animate);
    road.drawRectangle();



    roadLines.forEach(function (roadLine, i) {
        roadLine.drawRectangle();
        roadLine.update();
        if(roadLine.y > canvas.height + 100)
        {
            roadLines.splice(i, 1);
        }
    });

    if (rightPressed && player.x < roadX + roadWidth - player.width) {
        player.x += player.velocity;
    } else if (leftPressed && player.x > roadX) {
        player.x -= player.velocity;
    }

    player.drawRectangle();


}

animate();
setInterval(drawRoadLines, 800);