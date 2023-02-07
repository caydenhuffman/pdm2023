let singerArray;
let background;
let sprites;
function preload() {
    singer1 = loadImage("assets/singer/frame1.png");
    singer2 = loadImage("assets/singer/frame2.png");
    singer3 = loadImage("assets/singer/frame3.png");
    singer4 = loadImage("assets/singer/frame4.png");
    singer5 = loadImage("assets/singer/frame5.png");
    singer6 = loadImage("assets/singer/frame6.png");
    singer7 = loadImage("assets/singer/frame7.png");
    singer8 = loadImage("assets/singer/frame8.png");
    singerStill = loadImage("assets/singer/frame0.png");
    background = loadImage("assets/background.png");
    singerArray = [singerStill, singer1, singer2, singer3, singer4, singer5, singer6, singer7, singer8];
    spelunkerArray = [loadImage("assets/spelunker/frame0.png"), loadImage("assets/spelunker/frame1.png"), loadImage("assets/spelunker/frame2.png"), loadImage("assets/spelunker/frame3.png"), loadImage("assets/spelunker/frame4.png"), loadImage("assets/spelunker/frame5.png"), loadImage("assets/spelunker/frame6.png"), loadImage("assets/spelunker/frame7.png"), loadImage("assets/spelunker/frame8.png"),];
}

function setup() {
    createCanvas(1260 * .5, 1000 * .5);
    imageMode(CENTER); //This will set cordinates of image to be from center. 
    frameRate(10);
    // Rejects: new Sprite(singerArray, 0.4, 100, 110)
    sprites = [new Sprite(singerArray, 0.35, 500, 350), new Sprite(spelunkerArray, 1, 300, 150)];
}

function draw() {
    // background(255);
    push();
    translate(1260 * .25, 250);
    scale(0.5);
    image(background, 0, 0);
    pop();
    sprites[0].draw();
    sprites[1].draw();
}
function keyPressed() {
    // sprites.forEach(e => e.keyPressed());
    sprites[0].keyPressed();
    sprites[1].keyPressed();
}

function keyReleased() {
    // sprites.foreEach(e => e.keyReleased());
    sprites[0].keyReleased();
    sprites[1].keyReleased();
}

class Sprite {
    spriteArray;
    scale;
    x;
    y;
    step;
    constructor(spriteArray, scaleOfSprite, xOffset, yOffset) {
        this.spriteArray = spriteArray;
        this.scale = scaleOfSprite;
        this.movingR = false;
        this.movingL = false;
        this.x = xOffset; //
        this.y = yOffset; //
        this.facingL = true;
        this.step = 1;
    }

    keyPressed() {
        if (keyCode === LEFT_ARROW) {
            this.movingL = true;
        } else if (keyCode === RIGHT_ARROW) {
            this.movingR = true;
        }
    }
    keyReleased() {
        if (keyCode === LEFT_ARROW) {
            this.movingL = false;
            this.facingL = true;
            this.step = 1;  //Make sure you need this. 
        } else if (keyCode === RIGHT_ARROW) {
            this.movingR = false;
            this.facingL = false;
            this.step = 1; //Make sure you need this. 
        }
    }

    draw() {
        if (this.movingL === this.movingR) {
            this.standing();
        }
        else {
            this.step++;
            if (this.step >= this.spriteArray.length) {
                this.step = 1;
            }
            if (this.movingL) {
                if (this.x === 0) {
                    this.x = 1000;
                }
                this.x -= 15;
                this.walkingLeft(this.step);
            } else if (this.movingR) {
                this.x += 15;
                if (this.x === 1000) {
                    this.x = 0;
                }
                this.walkingRight(this.step);
            }
        }

    }
    standing() {
        push()
        translate(this.x, this.y);
        if (this.facingL) {
            scale(this.scale);
        } else {
            scale(-this.scale, this.scale);
        }
        image(this.spriteArray[0], 0, 0);
        pop();
    }
    walkingLeft(step) {
        push();
        translate(this.x, this.y);
        scale(this.scale);
        image(this.spriteArray[step], 0, 0);
        pop();
    }
    walkingRight(step) {
        push();
        translate(this.x, this.y);
        scale(-this.scale, this.scale);
        image(this.spriteArray[step], 0, 0);
        pop();
    }

}