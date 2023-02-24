let sounds = new Tone.Players({
    "sigh": "sounds/sighing.wav",
    "yass": "sounds/yass.m4a",
    "business": "sounds/Business.m4a"
  })
  
  let button1, button2, button3;
  
  
  
  function setup() {
    createCanvas(400, 400);
  
    sounds.toDestination();
    // sound1.toDestination();
  
    // button1 = createButton('Yas');
    // button1.position(800, 50);
    // button1.mousePressed(() => buttonSound("sigh"));
  
    // button2 = createButton('Water');
    // button2.position(50, 100);
    // button2.mousePressed(() => buttonSound("drop"));
  
    // button3 = createButton('How will we fix these shoes?');
    // button3.position(50, 150);
    // button3.mousePressed(() => buttonSound("duct"));
  }
  
  function draw() {
    background("pink");
  }
  
  // function keyPressed() {
  //   if(key === "1") {
  //     sound1.playbackRate = (mouseY /200) + 0.01;
  //     sound1.start();
  //   }
  // }
  
  // function buttonSound(whichSound) {
  //   if(whichSound === "sigh") {
  //     console.log("button Clicked");
  //     sounds.player("business").start();
  //   }
  // }
  
  function mousePressed() {
    // sounds.player("business").playbackRate = 3; 
    sounds.player("business").playbackRate = (mouseX /200) + 0.5;
    // console.log("Playback Rate: " + ((mouseX /200)+0.01)) ;
    console.log("click");
    sounds.player("business").start();
  }
  
  /* 
  FeedbackDelay is different from other things. 
  They can have different properties. 
    */