let bgImages = []; // array to store background images
let currentBgIndex = 0; // index of the current background image
let bgOpacity = 0.5; // initial opacity of the backgrounds
let currentTextIndex = 0; // index of the current text
let texts = [
  'ACT 1:  Fog of War',
  '...and it is mostly only by fogs that it plays a part.',
  '...we were compassed round by a very thick fog.',
  'Could see nothing in fog.',
  'Still fog, which the sunrise cannot pierce.',
  '...fogs militate against observation by aircraft',
  'The fog of battle, with its absorbing interests and distractions',
  'Here the fog prevents the enemy from being discovered in time...',
  '..the effect of a fog gives to things exaggerated dimensions and an unnatural appearance.',
  'The fog had now buried all heaven.',
  'A telegraphic signal, improperly interpreted, owing to the fog, was the cause of this error.',
  '...while from the fog, close at hand, came cries and groans and crashing volleys.',
  'What good will it do when smoke, fog, darkness, long range, excitement, the lack of coolness, forbid clear sight?'
  ];

let fadeInDuration = 3000; // 3 seconds
let fadeOutDuration = 3000; // 3 seconds
let stayDuration = 7000; // 10 seconds
let currentAlpha = 0;
let startTime = 0;

let myFont;

function preload() {
  bgImages.push(loadImage('bg3.jpg'));
  bgImages.push(loadImage('bg2.jpg'));
  myFont = loadFont('assets/Heebo-Medium.ttf');
}

function setup() {
  createCanvas(640, 480);
  frameRate(30);
  noCursor();
  textAlign(CENTER, CENTER);
  textFont(myFont);
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
  
  // draw the text with the current opacity
  if (currentTextIndex === 0) {
    if (millis() < 5000) {
      background(0);
    } else {
      background (0, currentAlpha); 
    }
    fill(255, currentAlpha);
    textSize(40);
  } else {
    fill(0, currentAlpha);
    textSize(28);
  }
  textStyle(BOLD);
  text(texts[currentTextIndex], width*0.05, height*0.05, width*0.9, height*0.9);
}