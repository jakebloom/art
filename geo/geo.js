const TRI_WIDTH = 100;
const TRI_HEIGHT = 100;
const PERP_HEIGHT = Math.sqrt(Math.pow(TRI_WIDTH, 2) - Math.pow(TRI_HEIGHT / 2, 2));

class Triangle {
  constructor(x, y, startColor, endColor) {
    for(let i = 0; i < TRI_WIDTH; i += 0.5) {
      const dist = Math.sqrt(Math.pow(y, 2) + Math.pow(window.innerWidth - x, 2));
      const inter = map(dist, 0, window.innerWidth, 1, 0);
      const c = lerpColor(startColor, endColor, inter);
      stroke(c);
      line(x + i, y, x + (Math.sqrt(3) / 2) * i, y - i);
    }
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  background('#eec584');
  noLoop();
}

function draw() {
  const START_COLOR = color('#a6a68c');
  const END_COLOR = color('#eec584');

  for(let row = 0, y = 0; y < window.innerHeight; row += 1, y += TRI_HEIGHT) {
    const start = (row * - 1 * PERP_HEIGHT) % TRI_WIDTH;
    for(let x = start; x < window.innerWidth; x += TRI_WIDTH) {
      new Triangle(x, y, START_COLOR, END_COLOR);
    }
  }
}