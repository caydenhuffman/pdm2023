const synth = new Tone.Synth();
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



let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5',
  // 'q': 'C2',
  // 'w': 'D2',
  // 'e': 'E2',
  // 'r': 'F2',
  // 'u': 'G2',
  // 'i': 'A2',
  // 'o': 'B2',
}

function setup() {
  createCanvas(400, 400);

  slider = new Nexus.Slider("#slider");
  slider.colorize("accent", "#FF69B4")
  synth.toDestination();
  drum.toDestination();
  metal.toDestination();
  synth.resonance = 0.8;

  slider.on('change', (v) => {
    reverb.roomSize.value = v;
    console.log("v: " + Math.round(v * 100) / 100);
  })


}



function draw() {
  background("#FF69B4");
  textSize(28);
  fill(0, 102, 153);
  text("C | D | E | F | G | A | B | C | *", 30, 30);
  text("a | s", 30, 60);
  text("_", 28 * 5 + 16, 30);
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