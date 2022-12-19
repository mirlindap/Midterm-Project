let currentProgram = 1;
let h1;
let img;
let offset = 0;
let easing = 0.005;

let imgSnow;
let system;

let button, greeting;
let img1;
let img2;
let img3;

let canvas;

let endImg;
let vid;
let theta = 0;
let bg;


function setup() {
  canvas = createCanvas(800, 550);
  
  img = loadImage('https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gN743DWoxr-8EQMBnv6kM77IuCRN48-DDPPyQTeH716aP-WlRjszOjD88pcoe5RYyFoxtlenRr-dOzZn28tFRi1MwMYAw=w2880-h1372');       

  imgSnow = loadImage('https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gMd9UCbS7BPm1qjaPevc7hk9KXgdLA6YEECQ8aMnhqAQqn-fD7V-cTBXG_n4g49ET55sj17wBX_HqLZ85XCgL9NIkfs=w2880-h1372'); 
  
  img1 = loadImage('https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gOCw0glkjLfBWz0scaLU600R2EPyGJltkuSHTPQF5JIK6uXnR6M5Zs9oBexTHkVqV-Ir5bJwbu7mNSGmLM7vr1cB3lo-w=w2880-h1372'); 
  img2 = loadImage('https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gM2Vs_nbGnprHddEYbO_bM-DjP1IfLzergH80mX5paq8KC43Skmeo5_aPki8_srRysxaAF2q1QZvhLjLcAJ9RXKq5mgPQ=w2880-h1372');
  img3 = loadImage('https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gNyEfxbq-YOTgikSqoYGq6OocSGv_Io0V4ClV0KgnPDAh88l6HJShB2WQYxUDKlwMPlsCTBxDvMMzEHeq1IzNK7xcMG=w2880-h1372');

  endImg = loadImage('https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gP_Vb7Us22YzUIRCn5PqSjzG1MYFBXv5KAABWmShiB48Vg-GMyP97OJAMR7aDo_Xd4V3AG5OcGQYtRBTX5ODAFuGrTU=w2880-h1372');

  h1 = createElement('h1', 'My plan for the holidays is to go to Kosovo');
  h1.position(50, 20);
  h1.style('color: grey; font-size: 36px; text-align:center;');

  button1 = createButton('Add decoration');
  button1.hide();
  button2 = createButton('Add guests');
  button2.hide();


  system = new ParticleSystem(createVector(width / 2, -50));
  setTimeout(increaseProgram, 2000);
  setTimeout(increaseProgram, 4000);
  setTimeout(increaseProgram, 8000);
}

function draw() {
  if (currentProgram == 1) {
    planeFunc();
  } else if (currentProgram == 2) {
    snowFunc();
  } else if (currentProgram == 3) {
    partyFunc();
  } else if (currentProgram == 4) {
    endFunc();
  }
}

function planeFunc() {
  image(img, offset, 0, 800,550); // Display at full opacity
  let dx = mouseX + img.width / 2 + offset;
  offset += dx * easing;
  tint(255, 40); // Display at half opacity
  image(img, 0, 0, 800,550);

}

function snowFunc() {
  img = image(imgSnow, 0, 0, 800, 550);
  h1.html('I hope it snows during my stay there :)')
  system.addParticle();
  system.run();
}

function partyFunc(){
  h1.html('My family will have a big feast with guests over. Click the buttons to see everyone! ')
  
  button1.show();
  button1.position(20,380, 65);
  button1.mousePressed(addDecoration);
  textAlign(CENTER);
  textSize(50);

  h1.style('color: black; font-size: 36px; text-align:center;');
  image(img1, 0, 0, img1.width/2.5, img1.height/1.8);
}

function endFunc(){
  button1.hide();
  button2.hide();
  canvas.remove();
  h1.html('Thank you for watching my story!');


  createCanvas(900, 550, WEBGL);
  background(250);
  translate(-300, 0, 0);
  push();
  pop();
  translate(200, 0, 0);
  push();
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  texture(endImg);
  box(300, 300, 300);
  pop();
  theta += 0.05;
  
  setTimeout(text1,500);
}

function text1(){
  greeting = createElement('h1', 'THE END');

  greeting.position(300, 200);
  push();
  fill(random(255), 255, 255);
  translate(random(width), random(height));
  rotate(random(2 * PI));
  text('THE END', 300,300);
  pop();
}


function addDecoration() {
  img1 = img2;
  button2.show();
  button2.position(150,380, 65);
  button2.mousePressed(addGuests);
}

function addGuests() {
  img1=img3;
}

function increaseProgram(){
  currentProgram += 1;
}


// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-3, 3), random(-1, 1));
  this.position = position.copy();
  this.lifespan = 400;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(255, this.lifespan);
  strokeWeight(2);
  fill(255, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
