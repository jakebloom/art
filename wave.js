function setup() {
  createCanvas(300, window.innerHeight);
  background(0);
  noStroke();
  fill('#944332');
  drawWave();
  fill(255);
  drawWave();
  fill('#97673e');
  drawWave();
}

function drawWave() {
  [5.5, 5, 4.5, 4, 3.5, 3, 1].forEach(n => {
    drawLine(n);
    translate(5, 0, 0);
  });
}

function drawLine(diff) {
  for(let y = 0; y < height; y+= diff) {
    x = 10 * sin(y / 30) + 100;
    circle(x, y, 1.2);
  }
}