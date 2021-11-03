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
var player = new Actor(canvas.width / 2 - playerWidth / 2, canvas.height - playerHeight - 30, playerWidth, playerHeight, "#AF0000", 5);

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
}

var bonuses = [];
var bonusWidth = 30;
var bonusHeight = 30;

function spawnBonus() {
    var bonusX = getRandomNumber(200, 500);

    bonuses.push(new Actor(bonusX, -100, bonusWidth, bonusHeight, "#00FF2E", 3));
}

function clearScreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

var timeoutID1 = null;
var timeoutID2 = null;
var timeoutID3 = null;
var timeoutID4 = null;

function menu() {
    clearScreen();
    c.fillStyle = "#FA0000";
    c.font = "28px Arial";
    c.textAlign = "center";
    c.fillText("NACISNIJ MYSZKA NA EKRAN ABY ROZPOCZAC GRE", canvas.width / 2, canvas.height / 2);
    c.fillStyle = "#666666";
    c.font = '26px Arial';
    c.fillText("Poruszanie: lewa i prawa strzalka", canvas.width / 2 - 25, (canvas.height / 4) * 2.5);
    c.font = '26px Arial';
    c.fillText("Unikaj czarnych przeszkod. Zbieraj zielone bonusy!", canvas.width / 2 - 25, (canvas.height / 4) * 3);
    // Start the game on a click
    canvas.addEventListener("click", startGame);
}

function endGame() {
    clearInterval(timeoutID1);
    clearInterval(timeoutID2);
    clearInterval(timeoutID3);
    clearInterval(timeoutID4);
    clearScreen();
    gameOver = false;
    c.fillStyle = "#FF4A4A";
    c.font = "24px Arial";
    c.textAlign = "center";
    c.fillText("Game Over. Final Score:", canvas.width / 2 - 20, canvas.height / 2 - 100);
    c.font = "80px Arial";
    c.fillText(score, canvas.width / 2 - 20, canvas.height / 2);
    c.font = "30px Arial";
    c.fillStyle = "#666666";
    c.fillText("Click on screen to play again", canvas.width / 2 - 20, canvas.height / 2 + 100);

    canvas.addEventListener("click", startGame);
}

function startGame() {

    timeoutID1 = setInterval(drawSideSquares, 80);
    timeoutID2 = setInterval(drawRoadLines, 800);
    timeoutID3 = setInterval(spawnObstactle, 1000);
    timeoutID4 = setInterval(spawnBonus, 2300);
    // New game setup
    bonuses = [];
    obstacles = [];
    score = 0;
    bonusCount = 0;

    animate();
    canvas.removeEventListener("click", startGame);
}


function animate() {
    clearScreen();

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
    c.font = "35px Arial";
    c.fillText(bonusCount, 40, 235);
    c.fillStyle = "#000000";
    c.font = "22px Arial";
    c.fillText("SCORE:", 1, 280);
    c.fillStyle = "#FF0000";
    c.font = "35px Arial";
    c.fillText(score, 40, 315);

    if (gameOver) {
        endGame();
    } else {
        window.requestAnimationFrame(animate);
    }
}

menu();