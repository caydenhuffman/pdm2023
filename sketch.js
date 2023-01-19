function setup() {
    createCanvas(200, 200);
    noLoop();
  }
  
  function draw() {
    opaque();
  }
  function opaque(){
    strokeWeight(0);
    // background("yellow");
    // fill("#ffaaa9");
    let x = 80; 
    fill(255, 0, 0, x);
   // blendMode(ADD);
    // setAlpha(120);
    circle(100, 66, 100);
    fill(0, 255, 0, x);
    circle(132, 127, 100);
    fill(0, 0, 255, x);
    circle(68, 127, 100);
  }

  function third(){
    //200 x 100
    background("black");
    strokeWeight(0);
    fill("#fff84a");
    arc(50, 50, 80, 80, PI + QUARTER_PI, PI - QUARTER_PI );
    fill("#ea412c");
    //circle(150, 50, 80);
    rect(110, 10, 80, 80, 100, 100, 0);
    fill("white");
    circle(130, 50, 25);
    circle(170, 50, 25);
    fill("blue");
    circle(130, 50, 15);
    circle(170, 50, 15);
  }
  function first(){
    //200 x 100
    background("#77f23b");
    circle(50, 50, 80);
    square(110, 10, 80);
  }

  function star(){
    //200 x 200
    background("#00007f");
    fill("green");
    stroke("white");
    strokeWeight(3);
    circle(100, 100, 100);
    fill("red");
    beginShape();
    vertex(100, 50);//Start point
    vertex(88, 85);//2nd left
    vertex(52, 85)//3rd left
    vertex(82, 106);//4th left
    vertex(70, 140);
    vertex(100, 120);
    //right sides
    vertex(130, 140);
    vertex(118, 106);//4th right
    vertex(148, 85);//3rd left
    vertex(112, 85);//2nd right
    vertex(100, 50);//end point
    endShape(CLOSE);
  }