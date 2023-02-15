
// let sound1 = new Tone.Player("sounds/sighing.wav");
let sound1 = new Tone.Player("/sounds/sighing.wav");
// let player = new Tone.Player("/Users/Cayden/Documents/pdm2023/Project5/sounds/sighing.wav");






function setup() {
  createCanvas(400, 400);
  sound1.toDestination(); 
}

function draw() {
  background("#FF69B4");
  
}

function keyPressed() {
  // sound1.playbackrate = 0.5; 
  // player.toDestination();  
  sound1.start(); 
}