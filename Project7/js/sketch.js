let nb = false;
let filt = true;
let color = 'black';
const noise = new Tone.Noise("brown"); //needs to start
const autoFilter = new Tone.AutoFilter({
  frequency: "2n",
  baseFrequency: 1,
  octaves: 8
}).toDestination();


const loop = new Tone.Loop((time) => {
  // triggered every eighth note. 
  console.log(time);
}, "8n").start(0);
Tone.Transport.start();

noise.connect(autoFilter);
autoFilter.start();

function setup() {
  createCanvas(400, 400);
}

function draw() {
  text('pink: filter, white: unfilter', 100, 100);
  background(color);
}

function keyPressed() {
  if (keyCode === 32) {
    if (nb) {
      noise.stop();
      console.log("Off");
      nb = false;
      color = "black";
      autoFilter.stop();
    } else {
      filt ? color = "pink" : color = "lightgrey";
      noise.start();
      nb = true;
      console.log("True");
    }
  }
  if (keyCode === 49) {
    console.log("Noise: " + nb + "\nFilter: " + filt);
  }
}
function mousePressed() {
  console.log('pressed');
  if (nb) {
    if (filt) {
      color = "pink";
      autoFilter.start();
      filt = false;
    } else {
      color = "LightGrey";
      filt = true;
      autoFilter.stop();
    }
  }

}