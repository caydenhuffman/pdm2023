

const synth = new Tone.FMSynth();
const drum = new Tone.MembraneSynth();
const metal = new Tone.MetalSynth({
  "frequency": 45,
  "envelope": {
    "attack": 0.001,
    "decay": 0.4,
    "release": 0.2
  },
  "harmonicity": 8.5,
  "modulationIndex": 40,
  "resonance": 300,
  "octaves": 1.5,
})
const reverb = new Tone.JCReverb(0.4).toDestination();
synth.connect(reverb);
drum.connect(reverb);
metal.connect(reverb);
const osc = new Tone.OmniOscillator("C#4", "pwm").start();


let notes = {
  'a': 'C3',
  's': 'D3',
  'd': 'E3',
  'f': 'F3',
  'g': 'G3',
  'h': 'A3',
  'j': 'B3',
  'k': 'C4',
}

function setup() {
  createCanvas(400, 400);
 
  slider = new Nexus.Slider("#slider");
  slider.colorize("accent", "#FF69B4")
  synth.toDestination();
  drum.toDestination();
  metal.toDestination();
  // synth.resonance = 0.2;
// synth.harmonicity.value = 2;

  slider.on('change', (v) => {
    // reverb.roomSize.value = v;
    console.log("v: " + Math.round(v * 100) / 100);
    // if (v === 1) {
    //   synth.harmonicity.value = 0.5;
    // } else if(v === 0){
    //   // console.log("true"); 
    //     synth.harmonicity.value = 1; 
    // } else { 
    //   synth.harmonicity.value = 2;
    // }

    synth.harmonicity.value = v * 1.5 + 0.5; 

  })


}



function draw() {
  background("#FF69B4");
  textSize(28);
  fill(0, 102, 153);
  text("C | D | E | F | G | A | B | C | *", 30, 30);
  text("_", 28 * 5 + 16, 30);
  text("_", 28 * 10 + 5, 30);
}

function keyPressed() {
  let whatNote = notes[key]
  console.log(whatNote);
  const now = Tone.now();
  // synth.harmonicity.value = 0.5;a
  synth.triggerAttackRelease(whatNote, "8n");


  // metal.triggerAttackRelease(whatNote, "8n");
  // metal.triggerAttackRelease(whatNote, "8n", now + 0.2);
}

