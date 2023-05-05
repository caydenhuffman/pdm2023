let connectButton;
let port;
let writer, reader;
let sliderLED;
let sliderBlue;
let red, green, blue;
let joySwitch;
let sensorData = {};

let count = 0;
let swap = true;
let xNow;
let yNow;
let xPrev;
let yPrev;

let color;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function setup() {
    createCanvas(600, 400).parent('sketchHolder');
    background(255);
    fmSynth = new Tone.FMSynth().toDestination();

    color = "black";
    loop = new Tone.Loop(time => {
        fmSynth.triggerAttackRelease("E3", "8n", time);
    }, "3n");


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


    if ("serial" in navigator) {
        // The Web Serial API is supported
        connectButton = document.getElementById("connectButton");

    }

    red = "255";
    green = "255";
    blue = "255";
    color = "white"; 
    joySwitch = 0;
    // sliderLED.value = 0; 
}




function draw() {
    // background(255);

    if (reader) {
        serialRead();
    }

    if (writer) {
        writer.write(encoder.encode(red + "," + green + "," + blue + "," + joySwitch + "\n"));
        writer.write(new Uint8Array([0]));
    }
    push();
    // artCall();
    pallet();
    pop();

    push();
    // noFill();

    xNow = map(sensorData.Xaxis, 0, 255, 0, width);
    yNow = map(sensorData.Yaxis, 0, 255, 0, height);
    // stroke("none"); 
    strokeWeight(10);

    if (sensorData.Switch === 0 && swap) {
        console.log("True");
        swap = false;
        color = nextColor();

    } else if (sensorData.Switch === 1) {
        console.log("False");
        swap = true;
    }
    stroke(color);
    line(xPrev, yPrev, xNow, yNow);
    pop();

    xPrev = xNow;
    yPrev = yNow;

    // if(sensorData.Switch )
    // console.log(": " + g); 


}

function artCall() {
    pallet();
    fmSynth.harmonicity.value = 0.002 * progress + 0.5;  //we want inbetween 0.5 and 5/ With 0 equal 0.5 and 5 when 2500
    // strokeWeight(strokeSize);
    // if (mouseIsPressed === true) {
    //     if (on) {
    //         line(mouseX, mouseY, pmouseX, pmouseY);

    //         if (progress < 2500) {
    //             progress++;
    //         }
    //         sounds.player("draw").start();
    //         console.log("progress: " + progress);
    //     }
    // }
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
    fill("black");
    pop();

}

function nextColor() {
    if (count === 0) {
        count++;
        red = "255";
        blue = "0";
        green = "0";
        sampler.triggerAttackRelease("A3", 0.8);
        return "red";
    } else if (count === 1) {
        count++;
        green = "30";
        sampler.triggerAttackRelease("B3", 0.8);
        return "orange";
    } else if (count === 2) {
        count++;
        green = "170";
        sampler.triggerAttackRelease("C3", 0.8);
        return "yellow";
    } else if (count === 3) {
        count++;
        red = "0";
        green = "255";
        sampler.triggerAttackRelease("D3", 0.8);
        return "#00ff00";
    } else if (count === 4) {
        count++;
        blue = "255";
        sampler.triggerAttackRelease("E3", 0.8);
        return "cyan";
    } else if (count === 5) {
        count++;
        green = "0";
        sampler.triggerAttackRelease("F3", 0.8);
        return "blue";
    } else if (count === 6) {
        count++;
        red = "255";
        sampler.triggerAttackRelease("G3", 0.8);
        return "#ff00ff";
    } else if (count === 7) {
        count++;
        red = "150";
        green = "75";
        blue = "0";
        sampler.triggerAttackRelease("G4", 0.8);
        return "#964B00";
    } else if (count === 8) {
        count++;
        red = "255";
        green = "255";
        blue = "255";
        sampler.triggerAttackRelease("F4", 0.8);
        return "white";
    } else if (count === 9) {
        count = 0;
        red = "0";
        blue = "0";
        green = "0";
        sampler.triggerAttackRelease("E4", 0.8);
        return "black";
    }
}



async function serialRead() {
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            reader.releaseLock();
            break;
        }
        //  console.log(value);
        sensorData = JSON.parse(value);
    }
}


async function connect() {

    //Music start
    // on = true;
    // Tone.Transport.start();
    // console.log("Starting");
    // //Scheduled Start Up Noise. 
    // fmSynth.triggerAttackRelease("C4", "8n", 0);
    // fmSynth.triggerAttackRelease("E4", "8n", "4n");
    // fmSynth.triggerAttackRelease("D4", "8n", "2n");
    // fmSynth.triggerAttackRelease("F4", "8n", "6n");
    // fmSynth.triggerAttackRelease("G4", "8n", "8n");
    // loop.start();
    // melody.start();

    //Music end

    port = await navigator.serial.requestPort();


    await port.open({ baudRate: 9600 });


    writer = port.writable.getWriter();


    reader = port.readable
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TransformStream(new LineBreakTransformer()))
        .getReader();
}


class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.chunks = "";
    }

    transform(chunk, controller) {
        // Append new chunks to existing chunks.
        this.chunks += chunk;
        // For each line breaks in chunks, send the parsed lines out.
        const lines = this.chunks.split("\n");
        this.chunks = lines.pop();
        lines.forEach((line) => controller.enqueue(line));
    }

    flush(controller) {
        // When the stream is closed, flush any remaining chunks out.
        controller.enqueue(this.chunks);
    }
}