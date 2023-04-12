let port;
let writer, reader;
let slider;
let red, green, blue;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();
let bgc = 0;
let activationState = { active: false };

function setup() {
    createCanvas(windowWidth, windowHeight);




    if ("serial" in navigator) {
        // The Web Serial API is supported.
        let button = createButton("connect");
        button.position(0, 0);
        button.mousePressed(connect);


        sliderr = createSlider(0, 255, 0);
        sliderr.position((windowWidth - 380) / 2, windowHeight / 2);
        sliderr.style('width', '380px');
        sliderb = createSlider(0, 255, 0);
        sliderb.position((windowWidth - 380) / 2, windowHeight / 2 + 40);
        sliderb.style('width', '380px');

        sliderg = createSlider(0, 255, 0);
        sliderg.position((windowWidth - 380) / 2, windowHeight / 2 + 20);
        sliderg.style('width', '380px');
    }
}



function mouseMoved() {

    red = sliderr.value();
    blue = sliderb.value();
    green = sliderg.value();
}

function draw() {
    let c = color(255, bgc, 0);
    background(c);

    if (reader) {
        serialRead();
    }
    if (writer) {
        writer.write(encoder.encode(red + "," + green + "," + blue + "\n"));
        // console.log(red+","+green+","+blue+"\n");
    }
}


async function serialRead() {
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            reader.releaseLock();
            break;
        }
        console.log(value);
        bgc = value; 
        // sensorData = JSON.parse(value);
    }
}

async function connect() {
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