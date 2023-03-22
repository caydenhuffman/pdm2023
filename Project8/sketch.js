let strokeSize = 10;
let progress = 0; //Lets say the canvas is filled when progress is 2000 or 2500. 

let sampler, sounds;
let on = false; 
let fmSynth;
let loop;
let melody;




function setup() {
    createCanvas(600, 400).parent('sketchHolder');
    background(255);
    fmSynth = new Tone.FMSynth().toDestination();


    loop = new Tone.Loop(time => {
        fmSynth.triggerAttackRelease("E3", "8n", time);
    }, "3n");
    // 


    melody = new Tone.Sequence((time, note) => {
        fmSynth.triggerAttackRelease(note, "4n", time);
    }, ["B1", "A1", "G1"]);


    sampler = new Tone.Sampler({
        urls: {
            A3: "assets/colored.mp3",
        }
    }).toDestination();
    sounds = new Tone.Players({
        "erase": "assets/erase.wav",
        "decrease": "assets/decrease.wav",
        "increase": "assets/increase.wav",
        "colored": "assets/colored.mp3",
        "draw": "assets/draw.wav"
    }).toDestination();



}

function draw() {
    pallet();
    fmSynth.harmonicity.value = 0.002 * progress + 0.5;  //we want inbetween 0.5 and 5/ With 0 equal 0.5 and 5 when 2500
    strokeWeight(strokeSize);
    if (mouseIsPressed === true) {
        if(on){
        line(mouseX, mouseY, pmouseX, pmouseY);

        if (progress < 2500) {
            progress++;
        }
        sounds.player("draw").start();
        console.log("progress: " + progress);
    }
    }
}

function pallet() {
    push();
    strokeWeight(1);
    stroke("black"); //makes outlines of squares color of page. 
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
    fill("white");
    rect(0, 300, 30);
    rect(0, 330, 30);
    rect(0, 360, 30);
    textSize(30);
    fill("black");
    text("+", 6, 325);
    text("-", 10, 354);
    text("X", 5, 386);
    pop();

}

function mousePressed() {
    if(on){
    if (mouseX <= 30) {

        if (mouseY < 30) {
            sampler.triggerAttackRelease("A3", 0.8);
            stroke("red");
        } else if (mouseY < 60) {
            stroke("orange");
            sampler.triggerAttackRelease("B3", 0.8);
        } else if (mouseY < 90) {
            stroke("yellow");
            sampler.triggerAttackRelease("C3", 0.8);
        } else if (mouseY < 120) {
            stroke("#00ff00");
            sampler.triggerAttackRelease("D3", 0.8);
        } else if (mouseY < 150) {
            stroke("cyan");
            sampler.triggerAttackRelease("E3", 0.8);
        } else if (mouseY < 180) {
            stroke("blue");
            sampler.triggerAttackRelease("F3", 0.8);
        } else if (mouseY < 210) {
            stroke("#ff00ff");
            sampler.triggerAttackRelease("G3", 0.8);
        } else if (mouseY < 240) {
            stroke("#964B00");
            sampler.triggerAttackRelease("G4", 0.8);
        } else if (mouseY < 270) {
            stroke("white");
            sampler.triggerAttackRelease("F4", 0.8);
        } else if (mouseY < 300) {
            stroke("black");
            sampler.triggerAttackRelease("E4", 0.8);
        } else if (mouseY < 330) {
            if (strokeSize < 30) {
                strokeSize += 2;
                sounds.player("increase").start();
            }
            console.log("Stroke Size: " + strokeSize);
        } else if (mouseY < 360) {
            if (strokeSize > 2) {
                strokeSize -= 2;
                sounds.player("decrease").start();
            }
            console.log("Stroke Size: " + strokeSize);
        } else if (mouseY < 390) {
            background("white");
            sounds.player("erase").start();
            progress = 0;
            console.log("Playing Erase!");

        }
    }
}
}

function keyPressed() {
    // melody.start();
    on = true; 
    Tone.Transport.start();
    console.log("Starting");
    //Scheduled Start Up Noise. 
    fmSynth.triggerAttackRelease("C4", "8n", 0);
    fmSynth.triggerAttackRelease("E4", "8n", "4n");
    fmSynth.triggerAttackRelease("D4", "8n", "2n");
    fmSynth.triggerAttackRelease("F4", "8n", "6n");
    fmSynth.triggerAttackRelease("G4", "8n", "8n");
    loop.start();
    melody.start();
} 
