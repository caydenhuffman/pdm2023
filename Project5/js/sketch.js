// let sound1 = new Tone.Player("sounds/chicken.wav");

let sounds = new Tone.Players({

  "blame": "sounds/Queen.m4a",
  "sigh": "sounds/sighing.wav",
  "queen": "sounds/queen.mov", 
  "yass": "sounds/yass.m4a"

})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["blame", "sigh", "queen", "yass"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index*50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })


}

function draw() {
  background(220, 120, 180);
  text('press the buttons for sound', 0, 150)

}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}