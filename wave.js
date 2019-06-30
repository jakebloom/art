function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  fill(0);
  drawWave();
  drawWave();
  drawWave();
}

function draw() {}

function drawWave() {
  [10, 9, 8, 7, 6, 4, 3, 1].forEach(n => {
    drawLine(n);
    translate(5, 0, 0);
  });
}

function drawLine(diff) {
  for(let y = 0; y < height; y+= diff) {
    x = 10 * sin(y / 30) + 100;
    circle(x, y, 1);
  }
}