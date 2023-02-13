let canvas;
let preFrame;
let radius;
let scaler = 4;
let startX = 0;
let button1;
let button2;
let treshold;
let slider1;
let slider2;



function setup() {
  canvas =createCanvas(700, 480);
  canvas.parent("sketch-container");
  frameRate(60);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / scaler, height / scaler);
  video.hide();
  preFrame = createImage(video.width, video.height);
  
  slider1 = createSlider(1, 100, 100);
  slider1.position(30, 400);
  slider1.addClass("mySliders");
  
  slider2 = createSlider(0, 255, 100);
  slider2.position(30, 450);
  slider2.addClass("mySliders");
  addGUI();
}

function draw() {
  
  background(0);
  video.loadPixels();
  preFrame.loadPixels();
  
  let flames = slider1.value();
  let color = slider2.value();

  
  let totalMotion = 0;
  
  for (let x = 0; x < video.width; x += 1) {
    for (let y = 0; y < video.height; y += 1) {
      let index = (x + y * video.width) * 4
      
      let reed = video.pixels[index ];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (reed + g + b) / 3;
      
      let pr = preFrame.pixels[index + 0];
      let pg = preFrame.pixels[index + 1];
      let pb = preFrame.pixels[index + 2];
      let pbright = (pr + pg + pb) / 3;
      
      let xran = 0;
      let yran = 0;
      
      xran = random(-radius / 5,radius / 5);
      yran = random(-radius / 5,radius / 5);
      
      let diff = dist(reed, g, b, pr, pg, pb);
      totalMotion += diff;
      
      let avgMotion = totalMotion / (video.width * video.height); 

      radius = avgMotion * 2;
      treshold = 20;
      
      if (diff < treshold){
        fill(0);
      } else {
        fill(255, radius * 7, color);
      }
      noStroke();
      ellipse((x + xran) * scaler, (y + yran) * scaler, scaler * radius * flames / 100, scaler * radius * flames / 100);
   }    
  }

    preFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

  
}

function addGUI()
{
  button1 = createButton("Flames");
  button1.position(-43, 355);

  button2 = createButton("Color");
  button2.position(-50, 410);


  button1.addClass("button");
  button1.parent("gui-container");
  button2.addClass("button");
  button2.parent("gui-container");

}