float lambda = 22.5;
HashMap rules = new HashMap();
rules.put("A", "![&F[!!FA]LA][^FLA][\\++FLA]");

class Cyl {
  float radius, height;
  int sides = 50;

  Cyl(float radius, float height) {
    this.radius = radius;
    this.height = height;
  }

  void draw() {
    float angle = 360 / sides;
    color(#b5aa9d)
    // draw the bottom face
    noStroke();
    beginShape();
    for (int i = 0; i < sides; i++) {
      float x = this.radius * sin(radians(i * angle));
      float z = this.radius * cos(radians(i * angle));
      vertex(x, 0, z);
    }
    endShape(CLOSE);

    // draw the top face
    beginShape();
    for (int i = 0; i < sides; i++) {
      float x = this.radius * sin(radians(i * angle));
      float z = this.radius * cos(radians(i * angle));
      vertex(x, -1 * height, z);
    }
    endShape(CLOSE);

    // Draw the outside
    beginShape(TRIANGLE_STRIP);
    for (int i = 0; i <= sides; i++) {
      float x = this.radius * sin(radians(i * angle));
      float z = this.radius * cos(radians(i * angle));
      vertex(x, 0, z);
      vertex(x, -1 * height, z);
    }
    endShape(CLOSE);
  }
}

class Tree {
  String grammar;

  Tree(String grammar) {
    this.grammar = grammar;
  }

  void draw() {
    for (int i = 0; i < grammar.length(); i++) {
      if (grammar.charAt(i).equals("+")) {
        // rotate about Y axis
        rotateY(radians(lambda));
      } else if (grammar.charAt(i).equals("-")) {
        // rotate about Y axis
        rotateY(-1 * radians(lambda));
      } else if (grammar.charAt(i).equals("&")) {
        // rotate about X axis
        rotateX(radians(lambda));
      } else if (grammar.charAt(i).equals("^")) {
        // rotate about X axis
        rotateX(-1 * radians(lambda));
      } else if (grammar.charAt(i).equals("\\")) {
        // rotate about z axis
        rotateZ(radians(lambda));
      } else if (grammar.charAt(i).equals("/")) {
        // rotate about z axis
        rotateZ(-1 * radians(lambda));
      } else if (grammar.charAt(i).equals("|")) {
        // rotate y axis 180º
        rotateY(radians(180));
      } else if (grammar.charAt(i).equals("F")) {
        // Draw a trunk
        (new Cyl(10, 200)).draw();
        translate(0, -200, 0);
      } else if (grammar.charAt(i).equals("L")) {
        // sphere(20);
      } else if (grammar.charAt(i).equals("!")) {
        // decrement radius
        scale(0.8, 0.8, 0.8);
      } else if (grammar.charAt(i).equals("'")) {
        // change colour
      } else if (grammar.charAt(i).equals("[")) {
        pushMatrix();
      } else if (grammar.charAt(i).equals("]")) {
        popMatrix();
      }
    }
  }
}


String iterateGrammar(String start, int N) {
  for (int i = 0; i < N; i++) {
    String newGrammar = "";
    for (int j = 0; j < start.length(); j++) {
      if (rules.containsKey(start.charAt(j))) {
        newGrammar = newGrammar.concat(rules.get(start.charAt(j)));
      } else {
        newGrammar = newGrammar.concat(start.charAt(j));
      }
    }
    start = newGrammar;
  }
  return start;
}

void setup() {
  size(window.innerWidth, window.innerHeight, OPENGL);
  lights();
  background(#829cbc);
  String grammar = iterateGrammar("A", 6);
  translate(width / 2, height * 9 / 10 , 0);
  rotateY(radians(90));
  (new Tree(grammar)).draw();
}

void draw() {
  exit();
}