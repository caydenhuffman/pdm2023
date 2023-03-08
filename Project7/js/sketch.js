let pat = false;
let bool = false;
let rc;
// function preload() {
//   rc = loadImage('/Project7/pictures/rockCoin.jpg');
// }


function setup() {
  // createCanvas(400, 400);

}



let synth = new Tone.MonoSynth().toDestination();
synth.volume.value = -30;

const osc = new Tone.Oscillator(300, "sine").toDestination();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 1,
  decay: 0.2,
  sustain: .1,
  release: .1
}).connect(pan);
osc.connect(ampEnv);
osc.volume.value = -25;

//So patterns are ran by the synths. 
let pattern = new Tone.Pattern(function (time, note) {
  synth.triggerAttackRelease(note, 0.8, time);
}, ['C5', "A3", 'D4', 'E2', 'E3', 'A2', 'D#3', 'Fb4']);


//This section is dedicated to my pink noise & filter.  
const noise = new Tone.Noise("pink"); //needs to start
const autoFilter = new Tone.AutoFilter({
  frequency: "1n",
  baseFrequency: 1,
  octaves: 8
}).toDestination();
noise.connect(autoFilter);


const synth2 = new Tone.AMSynth().toDestination();
const loop = new Tone.Loop(time => {
  synth2.triggerAttackRelease("E2", "16n", time);
}, "3n");

let duoSynth = new Tone.DuoSynth().toDestination();



const melody = new Tone.Sequence((time, note) => {
  duoSynth.triggerAttackRelease(note, "10n", time);
}, ["B2", ["A1", "A2", "A3", "A4", "A5"], "G2"]);
duoSynth.volume.value = -30;

function draw() {
  // background("pink");

  if ((frameCount % 10) === 0) {
    osc.frequency.setValueAtTime(random(100, 300));
  }
  // image(rc, -300,0);

  // push()

  // scale(0.7);
  // image(rc, 0, 0);
  // pop();
}

function keyPressed() {
  if (keyCode === 32) {
    if (pat) {
      pat = false;
      pattern.stop();
      noise.stop();
      autoFilter.stop();
      osc.stop();
      melody.stop();
      loop.stop(); 
      console.log("Pattern Stopped.");
    } else {
      pat = true;
      pattern.start();
      console.log("Pattern Started.");
      Tone.Transport.start();
      noise.start();
      autoFilter.start();
      melody.start();
      loop.start();
      osc.start();
    }
  }
}
