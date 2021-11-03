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
roadX = 150;
roadY = 0;
roadWidth = canvas.width - 300;
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

var gameOver = false;
var destroy = false;
var score = 0;
var bonusCount = 0;

// Road
var road = new Actor(roadX, roadY, roadWidth, roadHeight, "#A8A8A8", 0);
//Player
var player = new Actor(canvas.width / 2 - playerWidth / 2, canvas.height - playerHeight - 30, playerWidth, playerHeight, "#AF0000", 4);

var roadLine = new Actor(canvas.width / 2 - roadLineWidth / 2, 0, roadLineWidth, roadLineHeight, "#FFFFFF", 1)
var roadLines = [];

function drawRoadLines() {
    roadLines.push(new Actor(canvas.width / 2 - roadLineWidth / 2, -100, roadLineWidth, roadLineHeight, "#FFFFFF", 3));
}

var sideSquares = [];
var sideSquareWidth = 30;
var sideSquareHeight = 30;

function drawSideSquares() {
    sideSquares.push(new Actor(120, -100, sideSquareWidth, sideSquareHeight, "#FF0000", 3));
    sideSquares.push(new Actor(120, -100 - sideSquareHeight, sideSquareWidth, sideSquareHeight, "#FFFFFF", 3));
    sideSquares.push(new Actor(650, -100, sideSquareWidth, sideSquareHeight, "#FF0000", 3));
    sideSquares.push(new Actor(650, -100 - sideSquareHeight, sideSquareWidth, sideSquareHeight, "#FFFFFF", 3));
}

addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.keyCode === 39) {
        rightPressed = true;
    }
    if (e.keyCode === 37) {
        leftPressed = true;
    }
});

addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 39) {
        rightPressed = false;
    }
    if (e.keyCode === 37) {
        leftPressed = false;
    }
});

var obstacles = [];

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var obstacleWidth = 120;
var obstacleHeight = 20;

function spawnObstactle() {
    var obstacleX = getRandomNumber(220, 480);

    obstacles.push(new Actor(obstacleX, -100, obstacleWidth, obstacleHeight, "#000000", 3));
    console.log("New obstacle")
}

var bonuses = [];
var bonusWidth = 30;
var bonusHeight = 30;

function spawnBonus() {
    var bonusX = getRandomNumber(200, 500);

    bonuses.push(new Actor(bonusX, -100, bonusWidth, bonusHeight, "#00FF2E", 3));
    console.log("New Bonus")
}

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
        if (roadLine.y > canvas.height + 100) {
            roadLines.splice(i, 1);
        }
    });

    sideSquares.forEach(function (sideSquare, i) {
        sideSquare.drawRectangle();
        sideSquare.update();
        if (sideSquare.y > canvas.height + 100) {
            sideSquares.splice(i, 1);
        }
    });

    obstacles.forEach(function (obstacle, i) {
        obstacle.drawRectangle();
        obstacle.update();
        const distance = Math.hypot((player.x + player.width / 2) - (obstacle.x + obstacle.width / 2), (player.y + player.height / 2) - (obstacle.y + obstacle.height / 2));
        if (obstacle.y > canvas.height + 100) {
            obstacles.splice(i, 1);
        } else if (distance - player.width * 2 < 1) {
            obstacles.splice(i, 1);
            gameOver = true;
            console.log(gameOver);
        }
    });

    bonuses.forEach(function (bonus, i) {
        bonus.drawRectangle();
        bonus.update();
        const distance = Math.hypot((bonus.x + bonus.width / 2) - (player.x + player.width / 2), (bonus.y + player.height / 2) - (player.y + player.height / 2));
        if (bonus.y > canvas.height + 100) {
            bonuses.splice(i, 1);
        } else if (distance - bonus.width < 1) {
            bonuses.splice(i, 1);
            score += 5;
            bonusCount += 1;
        }
    });

    if (rightPressed && player.x < roadX + roadWidth - player.width) {
        player.x += player.velocity;
    } else if (leftPressed && player.x > roadX) {
        player.x -= player.velocity;
    }

    player.drawRectangle();

    c.fillStyle = "#000000";
    c.font = "22px Arial";
    c.textAlign = "left";
    c.fillText("BONUSES:", 1, 200);
    c.fillStyle = "#FF0000";
    c.fillText(bonusCount, 1, 230);
    c.fillStyle = "#000000";
    c.fillText("SCORE:", 1, 280);
    c.fillStyle = "#FF0000";
    c.fillText(score, 1, 310);


}

animate();
setInterval(drawSideSquares, 80);
setInterval(drawRoadLines, 800);
setInterval(spawnObstactle, 1000);
setInterval(spawnBonus, 2300);