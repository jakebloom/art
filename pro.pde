float angle = 0;
float theta = 22.5;
int x;
int y;

class State {
  int xPos, yPos;
  float currAngle;

  State(int x, int y, float angle) {
    xPos = x;
    yPos = y;
    currAngle = angle;
  }
}

ArrayList stack = new ArrayList();

void setup(){
  size(window.innerWidth, window.innerHeight);
  strokeWeight(1);
  frameRate(1);
  background(#FFFFFF);
  noiseSeed(millis());
}

int N = 6;

// Main draw loop
void draw(){
  // Compute the grammar
  String grammar = "F";
  x = random(width);
  y = height;

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
      float x1 = x + 10 * sin(radians(angle));
      float y1 = y - 10 * cos(radians(angle));

      line(x, y, x1, y1);
      x = x1;
      y = y1;
    } else if (grammar.charAt(i).equals("+")) {
      // turn
      angle = (angle + theta) % 360;
    } else if (grammar.charAt(i).equals("-")) {
      // turn
      angle -= theta;
      if (angle < 0) {
        angle += 360;
      }
    } else if (grammar.charAt(i).equals("[")) {
      stack.add(new State(x, y, angle));
    } else if (grammar.charAt(i).equals("]")) {
      State s = (State) stack.get(stack.size() - 1);
      stack.remove(stack.size() - 1);
      x = s.xPos;
      y = s.yPos;
      angle = s.currAngle;
    }
  }
  exit();
}

