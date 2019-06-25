const xfn = t => 0.00001 * pow(t - 1, 3) + 1;
const yfn = t => -0.5 * t;

class Bubble {
  constructor(x, y, t, ttl) {
    this.x = x;
    this.y = y;
    this.startTime = t;
    this.ttl = ttl;
  }

  draw() {
    if (this.ttl + (this.startTime / 60) < (frameCount / 60)) {
      return false;
    }
    const x = xfn(frameCount - this.startTime) + this.x;
    const y = yfn(frameCount - this.startTime) + this.y;
    push();
    translate(x, y);
    noStroke();
    const c = color(255, 255, 255, 15);
    specularMaterial(c);
    sphere(40);
    pop();
    return true;
  }
}

let bubbles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

function draw() {
  background('#829cbc');
  directionalLight(250, 250, 250, 10, 10, 1);
  bubbles = bubbles.filter(b => b.draw());
}

function mousePressed() {
  bubbles.push(new Bubble(
    mouseX - (width / 2),
    mouseY - (height / 2),
    frameCount,
    Math.floor(Math.random() * 8) + 1,
  ));
}