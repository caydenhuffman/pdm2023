let spriteSheet;
let chronoSheet;

let walkingAnimation;
let walkingAnimation2;
let chronoAnimation;

let goodCount; //This will be a random number of good butterflies that are generated. 
let speedUpdate = 0; 
let catchCount = 0; 

let spriteSheetFilenames = ["butterflySpriteJar.png", "butterflySpriteEvil.png"]; //"numberSprite.png,
// let spriteSheetFilenames = ["numberSprite.png"];
let spriteSheets = [];
let animations = [];

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 15, state: GameState.Start, targetSprite: 0 };

function preload() {
  for (let i = 0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}

function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = random(10, 30);
  catchCount = 0; 

  animations = [];
  
  // for (let i = 0; i < game.totalSprites; i++) {
   
  //   animations[i] = new WalkingAnimation(random(spriteSheets), 32, 32, random(20, 380), random(100, 300), 10, random(0.5, 1),10, random([0, 1]));
  // }

  goodCount = Math.floor(random(game.totalSprites * 0.40, game.totalSprites * 0.7)); //determines the number of good butterflies. 
  for (let i = 0; i < goodCount; i++){
    animations[i] = new WalkingAnimation(spriteSheets[0], 32, 32, random(20, 380), random(100, 300), 10, random(0.5, 1),10, random([0, 1]));
  }
  for( let i = goodCount; i < game.totalSprites; i++){
    animations[i] = new WalkingAnimation(spriteSheets[1], 32, 32, random(20, 380), random(100, 300), 10, random(0.5, 1),10, random([0, 1]));

  }
}

function draw() {

  switch (game.state) {
    case GameState.Playing:
      background("limegreen");
      for (let i = 0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score, 20, 40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 300, 40);
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0)
        game.state = GameState.GameOver;
      break;

    case GameState.GameOver:
      game.maxScore = max(game.score, game.maxScore);
      background("#FF69B4");
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over!!", 200, 100);
      textSize(35);
      text("Score: " + game.score, 200, 170);
      text("Best Score: " + game.maxScore, 200, 220);
      fill("limegreen");
      stroke(255);
      rect(120, 260, 160, 60); // This is the start button. 
      fill(255);
      textSize(30);
      text("Start Over", 200, 300);
      break;

    case GameState.Start:
      background("#FF69B4");
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Catching Butterflies", 200, 200);
      fill("limegreen");
      stroke(255);
      rect(150, 260, 100, 60); // This is the start button. 
      fill(255);
      textSize(30);
      text("Start", 200, 300);
      break;
  }

}


function mousePressed() {
  switch (game.state) {
    case GameState.Playing:
      for (let i = 0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX, mouseY);
        if(animations[i].speed < 4){
        animations[i].speed += speedUpdate; 
        }
        if (contains) {
          if (animations[i].moving != 0) {
            if (animations[i].spritesheet === spriteSheets[game.targetSprite]){
              game.score += 1;
              animations[i].stop();
              speedUpdate = random(0.2, 0.4); 
              if(catchCount === goodCount){
                game.state = GameState.GameOver;
              }
          
            }
            else{
              game.score -= 1;
              speedUpdate = 0; 
            }
          }
          else { 
           speedUpdate = 0; 
          }
        }
      }
      break;
    case GameState.GameOver:
      if (mouseY >= 260 && mouseY <= 320 && mouseX >=120 && mouseX <= 280) { //Checks to see if user clicks the start over button. 
        reset(); 
        game.state = GameState.Playing;
      }  
      break;
    case GameState.Start:
      if (mouseY >= 260 && mouseY <= 320 && mouseX >=150 && mouseX <= 250) {
        game.state = GameState.Playing;
      }
      break;
  }

}
// new WalkingAnimation(random(spriteSheets),32 ,32,random(100,300),random(100,300),10,random(0.5,1),6,random([0,1]));
class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate * speed;
    this.vertical = vertical;
  }

  draw() {

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.dx, this.dy);
    if (this.vertical)
      rotate(90);
    scale(this.xDirection, 1);

    image(this.spritesheet, 0, 0, this.sw, this.sh, this.u * this.sw + this.offsetX, this.v * this.sh + this.offsetY, this.sw, this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }

    if (this.vertical) {
      this.dy += this.moving * this.speed;
      this.move(this.dy, this.sw / 4, height - this.sw / 4);
    }
    else {
      this.dx += this.moving * this.speed;
      this.move(this.dx, this.sw / 4, width - this.sw / 4);
    }
  }

  move(position, lowerBounds, upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  updateSpeed() {
    this.speed += this.speed + 1; 
  }

  contains(x, y) {
    let insideX = x >= this.dx - 16 && x <= this.dx + 16;
    let insideY = y >= this.dy - 16 && y <= this.dy + 16;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    catchCount++; 
    this.u = 10;
    this.v = 0;
  }
}