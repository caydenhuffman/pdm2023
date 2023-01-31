let x = 200;
let y = 200;
let size = 50;
let dragging = false;

let dragStartX = -1;
let dragStartY = -1;
let characterStartX = -1;
let characterStartY = -1;

let characterOne, charTwo; 

function setup() {
    createCanvas(400, 400);
    characterOne = new Character(100, 100, 50); 
    charTwo = new Character(170, 20, 50);
    
}

function draw() {
    background("pink");

    if (keyIsDown(LEFT_ARROW)) {
        x -= 3;
    } else if (keyIsDown(RIGHT_ARROW)) {
        x += 3;
    }
    characterOne.x = x; 
    characterOne.y = y; 
    characterOne.draw(); 
    charTwo.x = x +70; 
    charTwo.y = y - 80; 
    charTwo.draw();

}

function mouseDragged() {
    if (dragging) {
        // x += mouseX - pmouseX; 
        // y += mouseY - pmouseY; 
        x = characterStartX + (mouseX - dragStartX);
        y = characterStartY + (mouseY - dragStartY);
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {

    }
}

function mousePressed() {
    let insideX = mouseX >= x && mouseY <= x + size;
    let insideY = mouseY >= y && mouseY <= y + size;
    let inside = insideY && insideX;
    //We can also use the distance function for when it is a circle. 
    //let d = dist(mouseX, mouseY, x, y);
    if (inside) {
        dragging = true;
        dragStartX = mouseX;
        dragStartY = mouseY;
        characterStartX = x;
        characterStartY = y;
    }
}

function mouseReleased() {
    dragging = false;
}


class Character {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw() {
        fill("White");
        square(this.x, this.y, this.size);
        fill(0);
        circle(this.x + 10, this.y + 10, 10);
        circle(this.x + this.size - 10, this.y + 10, 10);
        stroke(0);
        line(this.x + size / 4, this.y + size - 15, this.x + this.size - this.size / 4, this.y + this.size - 15);
    }
}