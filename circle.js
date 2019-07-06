// TODO: colour, paths, depth?

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  fill(255);
  noStroke();
  let coords = (new Array(10)).fill(null).map(_ => drawBillabong());

  stroke(255);
  let c = coords.shift();
  while (coords.length) {
    coords = coords.sort((p1, p2) => calcDistance(c, p1) - calcDistance(c, p2));
    line(c[0], c[1], coords[0][0], coords[0][1]);
    c = coords.shift();
  }
}

function drawCircle(dots) {
  for (let i = 0; i < dots; i++) {
    const x = dots * sin(Math.PI * 2 * i / dots);
    const y = dots * cos(Math.PI * 2 * i / dots);
    circle(x, y, 2);
  }
}

function drawBillabong() {
  const x = random(23, width - 23);
  const y = random(23, height - 23);
  push();
  translate(x, y);
  [5, 10, 17, 23].forEach(n => drawCircle(n));
  pop();
  return [x, y];
}

function calcDistance(p1, p2) {
  return sqrt(pow(p1[0] - p2[0], 2) + pow(p1[1] - p2[1], 2));
}