float angle = 0;
float theta = 22.5;
int x;
int y;
float weight;
int N = 6;
ArrayList stack = new ArrayList();

class State {
  int xPos, yPos;
  float currAngle, currWeight;

  State(int x, int y, float angle, float weight) {
    xPos = x;
    yPos = y;
    currAngle = angle;
    currWeight = weight;
  }
}

void setup(){
  size(window.innerWidth, window.innerHeight);
  strokeWeight(1);
  frameRate(1);
  background(#4ba3c3);
  stroke(#053b06);
  noiseSeed(millis());

  // Compute the grammar
  String grammar = "F";
  x = 0;
  y = height * (7/8);
  angle = 45;
  weight = 5;

  for (int i = 0; i < N; i++) {
    String newGrammar = new String();
    for (int j = 0; j < grammar.length(); j++) {
      if (grammar.charAt(j).equals("F")) {
        newGrammar = newGrammar.concat("FF+[+F-F-F]-[-F+F+F]");
      } else {
        newGrammar = newGrammar.concat(grammar.charAt(j));
      }
    }
    grammar = newGrammar;
  }

  // Draw it
  for (int i = 0; i < grammar.length(); i++) {
    if (grammar.charAt(i).equals("F")) {
      float x1 = x + 7 * sin(radians(angle));
      float y1 = y - 7 * cos(radians(angle));
      strokeWeight(weight);
      line(x, y, x1, y1);
      x = x1;
      y = y1;
    } else if (grammar.charAt(i).equals("+")) {
      angle = (angle + theta) % 360;
    } else if (grammar.charAt(i).equals("-")) {
      angle -= theta;
      if (angle < 0) {
        angle += 360;
      }
    } else if (grammar.charAt(i).equals("[")) {
      stack.add(new State(x, y, angle, weight));
      weight *= 0.8
    } else if (grammar.charAt(i).equals("]")) {
      State s = (State) stack.get(stack.size() - 1);
      stack.remove(stack.size() - 1);
      x = s.xPos;
      y = s.yPos;
      angle = s.currAngle;
      weight = s.currWeight;
    }
  }
}

void draw() {
  exit();
}

