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

//Road line properties
var roadLineWidth = 10;
var roadLineHeight = 75;

// Road
var road = new Actor(100, 0, canvas.width - 200, canvas.height, "#A8A8A8", 0);

var roadLines = [];

function drawRoadLines() {
    roadLines.push(new Actor(canvas.width / 2 - roadLineWidth / 2, 0, roadLineWidth, roadLineHeight, "#FFFFFF", 1));
}

function animate() {
    window.requestAnimationFrame(animate);
    road.drawRectangle();

    roadLines.forEach(function (roadLine) {
            roadLine.drawRectangle();
            roadLine.update();
    });



}

animate();
setInterval(drawRoadLines, 4);