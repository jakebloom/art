const rules = {
  "A": "![&F[!!FA]LA][^FLA][\\++FLA]",
};
const lambda = 22.5;

function Cyl(radius, height) {
  const sides = 50;

  function drawCircle(radius, height) {
    const angle = 360 / sides;
    beginShape();
    for (var i = 0; i < sides; i++) {
      var x = radius * sin(i * angle);
      var z = radius * cos(i * angle);
      vertex(x, -1 * height, z);
    }
    endShape(CLOSE);
  }

  function drawOutside(radius, height) {
    const angle = 360 / sides;
    beginShape(TRIANGLE_STRIP);
    for (var i = 0; i <= sides; i++) {
      var x = radius * sin(i * angle);
      var z = radius * cos(i * angle);
      vertex(x, 0, z);
      vertex(x, -1 * height, z);
    }
    endShape(CLOSE);
  }

  noStroke();
  ambientMaterial(250);
  drawCircle(radius, 0);
  drawCircle(radius, height);
  drawOutside(radius, height);
}

function iterateGrammar(start, N) {
  for (var i = 0; i < N; i++) {
    var newGrammar = "";
    for (var j = 0; j < start.length; j++) {
      if (start[j] in rules) {
        newGrammar += rules[start[j]];
      } else {
        newGrammar += start[j];
      }
    }
    start = newGrammar;
  }
  return start;
}

function Tree(grammar) {
  for (var i = 0; i < grammar.length; i++) {
    if (grammar[i] === "+") {
      // rotate about Y axis
      rotateY(radians(lambda));
    } else if (grammar[i] === "-") {
      // rotate about Y axis
      rotateY(radians(-1 * lambda));
    } else if (grammar[i] === "&") {
      // rotate about X axis
      rotateX(radians(lambda));
    } else if (grammar[i] === "^") {
      // rotate about X axis
      rotateX(radians(-1 * lambda));
    } else if (grammar[i] === "\\") {
      // rotate about z axis
      rotateZ(radians(lambda));
    } else if (grammar[i] === "/") {
      // rotate about z axis
      rotateZ(radians(-1 * lambda));
    } else if (grammar[i] === "|") {
      // rotate y axis 180º
      rotateY(radians(180));
    } else if (grammar[i] === "F") {
      // Draw a trunk
      Cyl(10, 200);
      translate(0, -200, 0);
    } else if (grammar[i] === "L") {
      // sphere(20);
    } else if (grammar[i] === "!") {
      // decrement radius
      scale(0.8, 0.8, 0.8);
    } else if (grammar[i] === "'") {
      // change colour
    } else if (grammar[i] === "[") {
      push();
    } else if (grammar[i] === "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  background('#000000');//background("#829cbc");
  directionalLight(250, 250, 250, 1, 1, -1);
  ambientMaterial(250);
  const grammar = iterateGrammar("A", 4);
  translate(0, (height / 2) * 9 / 10, 0);
  sphere(50);
  rotateY(radians(90));
  Tree(grammar);
}

function draw() {}