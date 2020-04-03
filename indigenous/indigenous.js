const TRI_WIDTH = 100;
const TRI_HEIGHT = 100;

class Star {
  constructor(x, y) {
    line(x, y, x + TRI_WIDTH / 2, y - TRI_HEIGHT);
    line(x + TRI_WIDTH / 2, y - TRI_HEIGHT, x + TRI_WIDTH, y);
    line(x + TRI_WIDTH, y, x, y);

    const downY = y + 30
    line(x, downY - TRI_HEIGHT, x + TRI_WIDTH / 2, downY);
    line(x + TRI_WIDTH / 2, downY, x + TRI_WIDTH, downY - TRI_HEIGHT);
    line(x + TRI_WIDTH, downY - TRI_HEIGHT, x, downY - TRI_HEIGHT);
  }
}

function drawWave() {
  [5.5, 5, 4.5, 4, 3.5, 3, 1].forEach(n => {
    drawLine(n);
    translate(5, 0);
  });
}

function drawLine(diff) {
  for(let y = 0; y < height; y+= diff) {
    x = 10 * sin(y / 30) + 100;
    circle(x, y, 1.2);
  }
}

function setup() {
  createCanvas(1000, 1000);
  stroke('#ffffff');
  background('#067bc2');
  noLoop();
}

function draw() {
  fill('#000000');
  noStroke();
  triangle(0, height, width, 0, width, height);

  stroke('#ffffff');
  for(let y = 0; y < height + TRI_HEIGHT; y += (TRI_HEIGHT + 35)) {
    for(let x = 0; x < TRI_WIDTH * 2; x += (TRI_WIDTH + 10)) {
      new Star(x, y);
    }
  }
  noStroke();

  fill('#d5a021');
  textSize(24);
  text('Who are you to tell us', 400, 300);


  push();
  translate(width - 300, 0);
  noStroke();
  fill('#944332');
  drawWave();
  fill(255);
  drawWave();
  fill('#97673e');
  drawWave();
  fill('#944332');
  drawWave();
  fill(255);
  drawWave();
  fill('#97673e');
  drawWave();
  pop();

  fill('#d5a021');
  text('we are not indigenous', width - 500, height - 300);
}