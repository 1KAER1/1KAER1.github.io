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
        this.drawArc();
        this.y = this.y - this.velocity;
    }
}



// Road
var road = new Actor(100, 0, canvas.width - 200, canvas.height, "#A8A8A8", 0);



function animate()
{
    window.requestAnimationFrame(animate);
    road.drawRectangle();

}

animate();