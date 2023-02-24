let sounds = new Tone.Players({

  "Fearless": "sounds/Fearless.m4a",
  "sigh": "sounds/sighing.wav",
  "Singing": "sounds/queen.mov", 
  "yass": "sounds/yass.m4a", 


})

const delay = new Tone.FeedbackDelay("8n", 0.0);
const dist = new Tone.Distortion(0.9);

let soundNames = ["Fearless", "sigh", "Singing", "yass"];
let buttons = [];

let dSlider;
let fSlider;

function setup() {
  
  sounds.connect(delay);

  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(10, index*30 + 10 );
    buttons[index].mousePressed( () => buttonSound(word))
  })
  createCanvas(400, 400);
  dSlider = createSlider(0., 1., 0.0, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.0, 0.05);
  fSlider.mouseReleased( () => {
    delay.wet.value = fSlider.value();
    // delay.distortion.value = fSlider.value(); 
    // sounds.playBackRate.value = fSlider.value();
  })


}

function draw() {
  background(220, 120, 180);
  fill("white");
  text('Press the buttons for a corresponding sound', 10, 150);
  text('The first slider determines the delay time', 10, 170);
  text('The second slider determines the feedback value', 10, 190);

}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}