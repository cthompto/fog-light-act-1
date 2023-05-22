let bgImages = []; // array to store background images
let currentBgIndex = 0; // index of the current background image
let bgOpacity = 0.5; // initial opacity of the backgrounds
let fadeOutTimer = 0; // timer for fading out the text
let fadeInTimer = 0; // timer for fading in the text
let currentTextIndex = 0; // index of the current text
let texts = [
  'ACT 1',
  '...and it is mostly only by fogs that it plays a part.',
  '...we were compassed round by a very thick fog.',
  'The fog was peopled with phantoms.',
  'A sudden breeze stirred the fog.',
  'His head swam; the fog and smoke stupefied him.',
  'Could see nothing in fog.',
  'Still fog, which the sunrise cannot pierce.',
  'Come in, or the fog will get into the house.',
  '...fogs militate against observation by aircraft',
  '...while from the fog others rose up, swept past and were engulfed.',
  'I can only trust in God and wait till the fog clears.',
  'the fog of battle, with its absorbing interests and distractions',
  'Here the fog prevents the enemy from being discovered in time...',
  '...now distinct, now vague, now blotted out in a puff of fog.',
  '..the effect of a fog gives to things exaggerated dimensions and an unnatural appearance.',
  'The fog had now buried all heaven.',
  'A telegraphic signal, improperly interpreted, owing to the fog, was the cause of this error.',
  '‘We will be all butchered in this fog,’ murmured another.',
  '...the trembling immateriality, the mistlike transience, of this seemingly so solid body...'
  ];
let textOpacity = 255; // opacity of the text
let textFadeTimer = 0; // timer for fading the text

let fadeInDuration = 3000; // 3 seconds
let fadeOutDuration = 3000; // 3 seconds
let stayDuration = 7000; // 10 seconds
let currentAlpha = 0;
let startTime = 0;

function preload() {
  bgImages.push(loadImage('bg3.jpg'));
  bgImages.push(loadImage('bg2.jpg'));
}

function setup() {
  createCanvas(480, 320);
  frameRate(30);
  textAlign(CENTER, CENTER);
  fadeOutTimer = random(7000, 13000);
  fadeInTimer = 0;
  textFadeTimer = 0;
  imageMode(CENTER);
  startTime = millis();
}

function draw() {
  // draw white background
  background(255);
 // calculate smooth random movement for the images
  let x = noise(frameCount * 0.002) * width/2;
  let y = noise(frameCount * 0.003) * height/2;
  let x2 = noise(frameCount * 0.003) * width/2;
  let y2 = noise(frameCount * 0.004) * height/2;
  let t =  (noise(frameCount * 0.001) * 255)+10;
  let t2 =  noise(frameCount * 0.003) * 255;
  
  // draw the two background images
  tint(255, t);
  image(bgImages[currentBgIndex], x, y, width * 2, height * 2);
  tint(255,t2);
  image(bgImages[(currentBgIndex + 1) % bgImages.length], x2, y2, width * 2, height * 2);
  let s = second();
  
 // update text opacity based on fade timers
  // if (fadeInTimer > 0) {
  //   textOpacity = map(fadeInTimer, 3000, 0, 0, 255);
  //   fadeInTimer -= deltaTime;
  // } else if (fadeOutTimer > 0) {
  //   textOpacity = map(fadeOutTimer, 7000, 4000, 255, 0);
  //   fadeOutTimer -= deltaTime;
  //   if (textFadeTimer === 0) {
  //     textFadeTimer = 3000;
  //   }
  // } else if (textFadeTimer > 0) {
  //   textOpacity = map(textFadeTimer, 3000, 0, 0, 255);
  //   textFadeTimer -= deltaTime;
  // } else {
  //   // reset timers and choose new text
  //   textOpacity = 0;
  //   //fadeOutTimer = random(10000, 13000);
  //   fadeOutTimer = 10000;
  //   fadeInTimer = 3000;
  //   textFadeTimer = 0;
  // }
  
  let elapsedTime = millis() - startTime;

  if (elapsedTime < fadeInDuration) {
    currentAlpha = map(elapsedTime, 0, fadeInDuration, 0, 255);
  } else if (elapsedTime < fadeInDuration + stayDuration) {
    currentAlpha = 255;
  } else if (elapsedTime < fadeInDuration + stayDuration + fadeOutDuration) {
    let fadeOutStartTime = fadeInDuration + stayDuration;
    let fadeOutElapsedTime = elapsedTime - fadeOutStartTime;
    currentAlpha = map(
      fadeOutElapsedTime,
      0,
      fadeOutDuration,
      255,
      0
    );
  } else {
    currentTextIndex = int(random(texts.length));
    startTime = millis(); // restart the animation
  }
 
  
  print(currentTextIndex);
  
  if (currentAlpha == 2) {
    //currentTextIndex = (currentTextIndex + 1) % texts.length;
    // currentTextIndex = int(random(texts.length));
  }
  
  // draw the text with the current opacity
  if (currentTextIndex === 0) {
    background (0);
    fill(255, currentAlpha);
    textSize(30);
  } else {
    fill(0, currentAlpha);
    textSize(20);
  }
  textStyle(BOLD);
  text(texts[currentTextIndex], width*0.1, height*0.1, width*0.8, height*0.8);
}