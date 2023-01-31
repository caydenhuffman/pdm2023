let singer1, singer2, singer3, singer4, singer5, singer6, singer7, singer8;
let singerArray;
let x = 500;
let y = 250;
let r = 0;
let i = -1 ;

function preload() {
    singer1 = loadImage("assets/singer/frame1.png");
    singer2 = loadImage("assets/singer/frame2.png");
    singer3 = loadImage("assets/singer/frame3.png");
    singer4 = loadImage("assets/singer/frame4.png");
    singer5 = loadImage("assets/singer/frame5.png");
    singer6 = loadImage("assets/singer/frame6.png");
    singer7 = loadImage("assets/singer/frame7.png");
    singer8 = loadImage("assets/singer/frame8.png");
}

function setup() {
    createCanvas(1000, 500);
    imageMode(CENTER); //This will set cordinates of image to be from center. 
    angleMode(DEGREES);
    frameRate(10);
    singerArray = [singer1, singer2, singer3, singer4, singer5, singer6, singer7, singer8];
}

function draw() {
    background(255);
    translate(x, y);
    // rotate(r);//its important that translate happens before the rotation. 
    // r += 5; 
    // scale(-0.4); //flips the image can specify x and y as well.
    scale(-0.4, 0.4);

    if( i > 6){
        i = -1; 
       
    }
    i++; 
    console.log("i: " + i);
    image(singerArray[i], 0, 0);
    //Use push and pop to make sure the rest of the screen isnt transformed. 
    //You can set the width of image by: "0.25 * singer1.width"; 
}