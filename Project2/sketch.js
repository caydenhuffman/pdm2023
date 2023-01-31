function setup() {
    createCanvas(600, 400);
    background(255);
    // noLoop();
    //frameRate(30);
    strokeWeight(10);

}

function draw() {
    // stroke(255);

    fill("blue");
    pallet();
    if (mouseIsPressed === true) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}


function pallet() {
    push();
    strokeWeight(1);
    stroke("#f5f5dc"); //makes outlines of squares color of page. 
    fill("#FF0000"); //sets fill to red. 
    rect(0, 0, 30); //Creates the red box. 
    fill("#ffa500"); //orange
    rect(0, 30, 30);
    fill("yellow");
    rect(0, 60, 30);
    fill("#00ff00");//green
    rect(0, 90, 30);
    fill("cyan");
    rect(0, 120, 30);
    fill("blue");
    rect(0, 150, 30);
    fill("#ff00ff"); //purple
    rect(0, 180, 30);
    fill("#964B00");
    rect(0, 210, 30);
    fill("white");
    rect(0, 240, 30);
    fill("black");
    rect(0, 270, 30);
    pop();
}

function mousePressed() {
    if (mouseX <= 30) {
        if (mouseY < 30) {
            stroke("red");
        } else if (mouseY < 60) {
            stroke("orange");
        } else if (mouseY < 90) {
            stroke("yellow");
        } else if (mouseY < 120) {
            stroke("#00ff00");
        } else if (mouseY < 150) {
            stroke("cyan");
        } else if (mouseY < 180) {
            stroke("blue");
        } else if (mouseY < 210) {
            stroke("#ff00ff");
        } else if (mouseY < 240) {
            stroke("#964B00");
        } else if (mouseY < 270) {
            stroke("white");
        } else if (mouseY < 300) {
            stroke("black");
        } 
    }
}
