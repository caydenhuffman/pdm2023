let port;
let writer;
let sliderr, sliderg, sliderb;
let red, green, blue;
const encoder = new TextEncoder();
let reader;


function setup() {
    createCanvas(windowWidth, windowHeight);



    if ("serial" in navigator) {

        let button = createButton("Connect");
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
    // red = round(map(mouseX,0, width, 0, 255));
    // green = round(map(mouseY,0, height, 0, 255));

    red = sliderr.value();
    blue = sliderb.value();
    green = sliderg.value();
}

async function serialRead() {
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // Allow the serial port to be closed later.
          reader.releaseLock();
          break;
        }
        // value is a Uint8Array.
        console.log(value);
      }
}



function draw() {
    background(0);
    if (reader) {
        serialRead();
    }

    if (writer) {
        writer.write(encoder.encode(red + "," + green + "," + blue + "\n"));
        // console.log(red+","+green+","+blue+"\n");
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
