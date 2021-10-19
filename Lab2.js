var canvas = document.getElementById("KacperCanvas");
var c = canvas.getContext("2d");

// Player properties
var playerSize = 60;
var lives = 6;

// Bullet properties
var bulletRadius = 15;

// Enemy properties
var enemySpeed = 1;
var enemyCount = 0;
var enemiesDestroyed = 0;

// Keys
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

// Booleans
var shot = false;

// Player's score
var score = 0;

class Actor {
    constructor(x, y, size, color, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
    }

    drawRectangle() {
        c.beginPath();
        c.rect(this.x, this.y, this.size, this.size);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    drawArc() {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.drawArc();
        this.y = this.y - this.velocity;
    }
}

// Create the player
var player = new Actor(canvas.width / 2 - playerSize / 2, canvas.height - playerSize, playerSize, "#00C91C", 3);

function menu() {
    clearScreen();
    c.fillStyle = "#666666";
    c.font = "24px Arial";
    c.textAlign = "center";
    c.fillText("NACISNIJ MYSZKA NA EKRAN ABY ROZPOCZAC GRE", canvas.width / 2, canvas.height / 2);
    c.font = '18px Arial';
    c.fillText("Poruszanie: lewa i prawa strzalka. Spacja strzal", canvas.width / 2, (canvas.height / 4) * 3);
    // Start the game on a click
    canvas.addEventListener("click", startGame);
}

var timeoutID = null;
var enemiesSpawRate = 3000;

function startGame() {
    timeoutId = setInterval(spawnEnemy, enemiesSpawRate);
    setTimeout(spawnEnemy, 1000);
    animate();
    canvas.removeEventListener("click", startGame);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 32) {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 32) {
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

function clearScreen() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}


function animate() {
    clearScreen();

    // Draw the player
    player.drawRectangle();


    window.requestAnimationFrame(animate);
}

menu();