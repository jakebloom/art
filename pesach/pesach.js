const LENGTH = 200;
const DOOR_WIDTH = 50;

class House {
  constructor(x, y, blood) {
    stroke('#000000');
    strokeWeight(7);
    
    // Front outline
    line(x, y, x, y + LENGTH);
    line(x, y + LENGTH, x + LENGTH, y + LENGTH);
    line(x + LENGTH, y + LENGTH, x + LENGTH, y);
    triangle(x, y, x + (LENGTH / 2), y - (LENGTH / 2), x + LENGTH, y);

    // 3D woah dude
    // line(x + LENGTH, y - (LENGTH / 2), x + LENGTH * (3/2), y);

    // door
    rect(x + LENGTH / 2 - DOOR_WIDTH / 2, y + LENGTH - 100, DOOR_WIDTH, 100);

    if (blood) {
      // lambs blood
      stroke('#ff0000');
      const topLeft = {x: x + LENGTH / 2 - DOOR_WIDTH / 2, y: y + LENGTH - 100};
      line(topLeft.x, topLeft.y, topLeft.x + DOOR_WIDTH, topLeft.y);
      line(topLeft.x + DOOR_WIDTH, topLeft.y, topLeft.x + DOOR_WIDTH, topLeft.y + 50)
      stroke('#000000');
    }

    // Draw the front
    strokeWeight(1);
    rect(x + 25, y + 25, 50, 50);
    rect(x + LENGTH - 75, y + 25, 50, 50);
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop();
}

function draw() {
  let x = 0, y = 100, bloodCount = 0;
  while (x < width) {
    while (y < height) {
      new House(x, y, x === 0 && y === 700);
      y += 300;
    }
    y = 100;
    x += 200;
  }
}