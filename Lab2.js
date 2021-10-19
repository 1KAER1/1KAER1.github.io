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
        c.rect(this.x, this.y, this.size, this.size / 2);
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

var bullets = [];
var enemies = [];

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function spawnEnemy() {
    var enemyRadius = getRandomNumber(30, 50);
    var enemyX = getRandomNumber(enemyRadius, canvas.width - enemyRadius);
    var enemyY = getRandomNumber(enemyRadius + 50, 200);

    enemies.push(new Actor(enemyX, enemyY, enemyRadius, "#BB2100", 3));
    enemyCount++;
    lives--;
}

function isColliding(bullet, enemy, ei, bi) {
    const distance = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
    if (distance - enemy.size - bullet.size < 1) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score += 5;
        enemiesDestroyed++;
        enemyCount--;
        if (lives < 6) {
            lives++;
        }
    }

    return true;
}

function menu() {
    clearScreen();
    c.fillStyle = "#FA0000";
    c.font = "24px Arial";
    c.textAlign = "center";
    c.fillText("NACISNIJ MYSZKA NA EKRAN ABY ROZPOCZAC GRE", canvas.width / 2, canvas.height / 2);
    c.fillStyle = "#666666";
    c.font = '18px Arial';
    c.fillText("Poruszanie: lewa i prawa strzalka. Strzelanie: SPACJA", canvas.width / 2 - 25, (canvas.height / 4) * 2.5);
    c.font = '18px Arial';
    c.fillText("Nie pozwol wrogom sie rozmnozyc! 6 wrogow na ekranie oznacza koniec!", canvas.width / 2 - 25, (canvas.height / 4) * 3);
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

function endGame() {
    clearInterval(timeoutID);

    clearScreen();
    c.fillStyle = "#666666";
    c.font = "24px Arial";
    c.textAlign = "center";
    c.fillText("Game Over. Final Score: " + score, canvas.width / 2, canvas.height / 2);
}

addEventListener('keydown', function(e) {
    e.preventDefault();
    if (e.keyCode === 39) {
        rightPressed = true;
    }
    if (e.keyCode === 37) {
        leftPressed = true;
    }
    if (e.keyCode === 32) {
        bullets.push(new Actor(player.x + playerSize / 2, player.y + playerSize / 2, 10, "#3A3A3A", 3));
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

// Main loop
function animate() {
    clearScreen();

    // Draw the enemy
    enemies.forEach(function(enemy) {
        enemy.drawArc();
    });

    // Player controls
    if (rightPressed && player.x < canvas.width - player.size) {
        player.x += player.velocity;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.velocity;
    }

    // Draw the player
    player.drawRectangle();

    // Shoot the bullet
    bullets.forEach(bullet => {
        bullet.update();
    });

    // Check if the bullet collided with enemy
    enemies.forEach(function(enemy, ei) {
        bullets.forEach((bullet, bi) => {
            if (isColliding(bullet, enemy, ei, bi)) {}
        });
    });

    // Draw the score
    c.fillStyle = "#009900";
    c.font = "24px Arial";
    c.textAlign = "left";
    c.fillText("Score: " + score, 1, 25);

    c.fillStyle = "#990000";
    c.font = "24px Arial";
    c.textAlign = "right";
    c.fillText("    Lives: " + lives + "    Enemies: " + enemyCount, canvas.width / 2, 25);

    c.fillStyle = "#000099";
    c.font = "24px Arial";
    c.textAlign = "right";
    c.fillText("Enemies destroyed: " + enemiesDestroyed, canvas.width, 25);

    // End or continue the game
    if (lives == 0) {
        endGame();
    } else {
        window.requestAnimationFrame(animate);
    }

}

menu();
canvas.focus();