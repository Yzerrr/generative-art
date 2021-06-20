var song
var img
var fft
var particles = []
var  mic = 0

let ra=0, rb=0, startT, deltaT = 20120, doit = false;
let w = 200, h = 200;


function preload() {
  song = loadSound('djvt - Sterrenstof.mp3')

}

function setup() {
  
  mic = new p5.AudioIn()
  mic.start()
  
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  imageMode(CENTER)
  rectMode(CENTER)
  fft = new p5.FFT(0.3)
  noLoop()
  
    startT=millis();
  
}


function myTimer() {
  if (millis() > startT + deltaT) {
    startT = millis()
    doit = true;
    rb=1;                  // repeats second circle as loop
    
  }
}




function draw() {
  
  
  
  //black
  background(0)
  translate(width / 2, height / 2)

  fft.analyze()
  amp = fft.getEnergy(20, 200)

  push()
  if (amp > 230) {
    rotate(random(-0.5, 0.5))
  }

      ra++;
  (stroke(this.color = [random(247, 255), random(227, 14), random(247, 61),]));
  // fill(2, 0, 0);
  ellipse(w / 200, h / 20, ra, ra);
  
  //later, this new circle appear
  if (doit) {
    rb++; 
    stroke(this.color = [random(247, 255), random(227, 14), random(247, 61),]);
      // fill(0);
    
    ellipse(w / 200, h / 20, rb, rb);
  }
   
  
  
  myTimer();
  var alpha = map(amp, 0, 255, 180, 150)
  fill(0, alpha)
  noStroke()
  rect(0, 0, width, height)
  stroke(255)
  strokeWeight(3)
  noFill()

  
  
 
  
  
  
  
  var wave = fft.waveform()
//half circles
  for (var t = -1; t <= 1; t += 2) {
    beginShape()
    for (var i = 0; i <= 200; i += 0.5) {
      var index = floor(map(i, 0, 180, 0, wave.length - 1))
  
      var r = map(wave[index], -1, 1, 150, 350)
      
      var x = r * sin(i) * t
      var y = r * cos(i)
      vertex(x, y)
    }
    endShape()
  }
  
  
  
 
  
  //input dots
  
  var vol = mic.getLevel()
 fill( this.color = [random(247, 255), random(227, 14), random(247, 61),])
ellipse( -100, -50, vol * 900, vol * 1000)
  
  ellipse( 100, -80, vol * 800, vol * 600)
   ellipse( -30, 100, vol * 9000, vol * 1000)
  
  
  var p = new Particle()
  particles.push(p)


  
  for (var i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230)
      particles[i].show()
    } else {
      particles.splice(i, 1)
    }
    
  }
  
 
  
  
}
//start / paused - mouseclicked
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause()
    noLoop()
  } else {
    song.play()
    loop()
  }
}


//moving dots
class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = createVector(0, 0)
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001))
    
    //size
    this.w = random(1, 15, 90)
   

    this.color = [random(200, 255), random(200, 255), random(200, 255),]
  }
  update(cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  
  
  
  edges() {
    if (this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2) {
      return true
    } else {
      return false
    }
  }
  show() {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.w)
  }
}