 /*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 5;

// other variables can be in here too
// here's some examples for colors used

const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)

  // SLIDER DEFAULTS
  this.skin_value = 2; // Range; 0-2 [3 values]
  this.hair_value = 1; // Range; 0-2 [3 values]
  this.tilt_value = 0; // Range; ? [? values]
  this.color_value = 1;
  this.g_value = 1;

  // FACIAL FEATURE VARIABLES
  this.inner_browY = map(this.eyeBHead, 0, 100, -0.2, 0.2);
  this.outer_browY = map(this.eyeBEnd, 0, 100, 0, 0.4);
  this.inner_eyeY = map(this.eyeInner, 0, 100, -0.1, 0.1);
  this.outer_eyeY = map(this.eyeOuter, 0, 100, -0.1, 0);
  this.upper_eyeY = map(this.upperEye, 0, 100, -0.1, 0.1);
  this.lower_eyeY = map(this.lowerEye, 0, 100, -0.3, 0.3);
  
  this.cornerX = map(this.mouthWidth, 0, 100, -0.2, 0.1);
  this.cornerY = map(this.mouthCorners, 0, 100, 0, 0.4);
  this.upperL = map(this.upperLip, 0, 100, -0.5, 0);
  this.lowerL = map(this.lowerLip, 0, 100, -1, 0);
  this.chinY = 1.3;
 
  // MASK COLOURS
  this.STone_1 = color('#e6e6e6');
  this.STone_2 = color('#808080');
  this.STone_3 = color('#454545');

  colorOptions = [this.STone_1, this.STone_2, this.STone_3]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   *    left_eyebrow, right_eyebrow, left_eye, right_eye, 
   *    nose_bridge, nose_tip, bottom_lip, top_lip, chin
   */  

  this.draw = function(positions) {
    angleMode(DEGREES);
    rotate(this.tilt_value);

    this.chin = positions.chin[8];
    this.noseY = positions.nose_bridge[3];

    // BACKING MASK
    push();
    translate(this.noseY[0], this.noseY[1]);
    noStroke();
    fill(0);    
    beginShape();
      vertex(-2, -2);
        bezierVertex(
          0, -1.7, 
          0, -1.7, 
          2, -2
        ); // TLeft->TRight
        bezierVertex(
          1.9, 0.2, 
          1.9, 0.2, 
          1.9, 0.2
        ); // TRight->BRight *
        bezierVertex(
          1.7, 1.9, 
          0.9, 1.7, 
          0, 2
        ); // BRight->BMiddle %
        bezierVertex(
          -0.9, 1.7, 
          -1.7, 1.9, 
          -1.9, 0.2
        ); // BMiddle->BLeft %
        bezierVertex(
          -1.9, 0.2,
          -1.9, 0.2, 
          -2, -1.9
        ); // BLeft->TLeft *
    endShape();

    // MAIN MASK
    noStroke();
    fill(colorOptions[this.color_value]);
    beginShape();
      vertex(-1.9, -1.9);
        bezierVertex(
          0, -1.6, 
          0, -1.6, 
          1.9, -1.9
        ); // TLeft->TRight
        bezierVertex(
          1.8, 0.2, 
          1.8, 0.2, 
          1.8, 0.2
        ); // TRight->BRight *
        bezierVertex(
          1.6, 1.9, 
          0.8, 1.6, 
          0, 1.9
        ); // BRight->BMiddle %
        bezierVertex(
          -0.8, 1.6, 
          -1.6, 1.9, 
          -1.8, 0.2
        ); // BMiddle->BLeft %
        bezierVertex(
          -1.8, 0.2, 
          -1.8, 0.2, 
          -1.9, -1.9
        ); // BLeft->TLeft *this.
    endShape();
    pop();

    // NOSE
    push();
    translate(this.noseY[0], this.noseY[1]);
    noStroke();
    fill(0);
    beginShape();
      vertex(-0.55, 0.15); 
        bezierVertex(
          -0.2, -0.06, 
          -0.18, 0.08, 
          0, 0.1 // Upper nose tip
        );
        bezierVertex(
          0.18, 0.08, 
          0.2, -0.06, 
          0.55, 0.15 
        );
        bezierVertex(
          0.2, 0.1, 
          0.18, 0.2, 
          0, 0.2 // Lower nose tip
        );
        bezierVertex(
          -0.18, 0.2, 
          -0.2, 0.1, 
          -0.55, 0.15
        );
    endShape();
    pop();

    // EYEBROWS & EYES; drawn based on 1 of 3 skin tones
    if(this.skin_value == 0){ // Draw 'happy' eyebrows/eyes
      push();
      translate(this.noseY[0], this.noseY[1]);

      strokeWeight(0.25);
      noStroke();
      fill(0);
      this.eyeBHead = -0.1;
      this.eyeBEnd = 0;
      this.eyeInner =  -0.05;
      this.eyeOuter =  -0.1;
      this.upperEye =  -0.1; 
      this.lowerEye = -0.528;
      this.inner_browY = this.eyeBHead;
      this.outer_browY = this.eyeBEnd;
      this.inner_eyeY = this.eyeInner;
      this.outer_eyeY = this.eyeOuter;
      this.upper_eyeY = this.upperEye;
      this.lower_eyeY = this.lowerEye;

      // LEFT BROW
      beginShape();
        vertex(-0.2, (this.inner_browY -1.2));
          bezierVertex(
            -0.4, (this.inner_browY -0.6), 
            -1.2, (this.outer_browY -1.6), 
            -1.6, (this.outer_browY -1)
          );
          bezierVertex(
            -1.2, (this.outer_browY -1.4), 
            -0.4, (this.inner_browY -0.5), 
            -0.2, (this.inner_browY -1.2)
          );
      endShape();

      // LEFT EYE 
      beginShape();
      vertex(-0.35, (this.inner_eyeY -0.45));
        bezierVertex(
          -0.8, (this.upper_eyeY -0.8), 
          -1, (this.upper_eyeY -0.8), 
          -1.35, this.outer_eyeY-0.4
        );
        bezierVertex(
          -1, (this.lower_eyeY -0.5), 
          -0.8, (this.lower_eyeY -0.5), 
          -0.35, this.inner_eyeY-0.45
        );
      endShape();
      
      // RIGHT BROW
      beginShape();
        vertex(0.2, (this.inner_browY-1.2));
          bezierVertex(
            0.4, (this.inner_browY -0.6), 
            1.2, (this.outer_browY -1.6), 
            1.6, (this.outer_browY -1)
          );
          bezierVertex(
            1.2, (this.outer_browY -1.4), 
            0.4, (this.inner_browY -0.5), 
            0.2, (this.inner_browY -1.2)
          );
      endShape();

     // RIGHT EYE
      beginShape();
        vertex(0.35, (this.inner_eyeY -0.45));
          bezierVertex(
            0.8, (this.upper_eyeY -0.8), 
            1, (this.upper_eyeY -0.8), 
            1.35, (this.outer_eyeY -0.4)
          );
          bezierVertex(
            1, (this.lower_eyeY -0.5),
            0.8, (this.lower_eyeY -0.5), 
            0.35, (this.inner_eyeY -0.45)
          );
      endShape();

      pop();

    } else if(this.skin_value == 1){ // Draw 'sad' eyebrows/eyes
      push();
      translate(this.noseY[0], this.noseY[1]);

      strokeWeight(0.25);
      noStroke();
      fill(0);
      this.eyeBHead = -0.2;
      this.eyeBEnd = 0.4;
      this.eyeInner = 0.1;
      this.eyeOuter = 0;
      this.upperEye = 0.1; 
      this.lowerEye = 0.042;
      this.inner_browY = this.eyeBHead;
      this.outer_browY = this.eyeBEnd;
      this.inner_eyeY = this.eyeInner;
      this.outer_eyeY = this.eyeOuter;
      this.upper_eyeY = this.upperEye;
      this.lower_eyeY = this.lowerEye;

      // LEFT BROW
      beginShape();
        vertex(-0.2, (this.inner_browY -1.2));
          bezierVertex(-0.4, (this.inner_browY -0.6), -1.2, (this.outer_browY -1.6), -1.6, (this.outer_browY -1));
          bezierVertex(-1.2, (this.outer_browY -1.4), -0.4, (this.inner_browY -0.5), -0.2, (this.inner_browY -1.2));
      endShape();

      // LEFT EYE 
      beginShape();
      vertex(-0.35, (this.inner_eyeY -0.45));
        bezierVertex(-0.8, (this.upper_eyeY -0.8), -1, (this.upper_eyeY -0.8), -1.35, this.outer_eyeY-0.4);
        bezierVertex(-1, (this.lower_eyeY -0.5), -0.8, (this.lower_eyeY -0.5), -0.35, this.inner_eyeY-0.45);
      endShape();
      
      // RIGHT BROW
      beginShape();
        vertex(0.2, (this.inner_browY-1.2));
          bezierVertex(0.4, (this.inner_browY -0.6), 1.2, (this.outer_browY -1.6), 1.6, (this.outer_browY -1));
          bezierVertex(1.2, (this.outer_browY -1.4), 0.4, (this.inner_browY -0.5), 0.2, (this.inner_browY -1.2));
      endShape();

     // RIGHT EYE
      beginShape();
        vertex(0.35, (this.inner_eyeY -0.45));
          bezierVertex(0.8, (this.upper_eyeY -0.8), 1, (this.upper_eyeY -0.8), 1.35, (this.outer_eyeY -0.4));
          bezierVertex(1, (this.lower_eyeY -0.5), 0.8, (this.lower_eyeY -0.5), 0.35, (this.inner_eyeY -0.45));
      endShape();

      pop();

    } else if(this.skin_value == 2){ // Draw 'angry' eyebrows/eyes
      push();
      translate(this.noseY[0], this.noseY[1]);

      strokeWeight(0.25);
      noStroke();
      fill(0);
      this.eyeBHead = 0.2
      this.eyeBEnd = 0
      this.eyeInner = 0.1
      this.eyeOuter = -0.1
      this.upperEye = 0.1
      this.lowerEye = 0.342
      this.inner_browY = this.eyeBHead;
      this.outer_browY = this.eyeBEnd;
      this.inner_eyeY = this.eyeInner;
      this.outer_eyeY = this.eyeOuter;
      this.upper_eyeY = this.upperEye;
      this.lower_eyeY = this.lowerEye;

      // LEFT BROW
      beginShape();
        vertex(-0.2, (this.inner_browY -1.2));
          bezierVertex(-0.4, (this.inner_browY -0.6), -1.2, (this.outer_browY -1.6), -1.6, (this.outer_browY -1));
          bezierVertex(-1.2, (this.outer_browY -1.4), -0.4, (this.inner_browY -0.5), -0.2, (this.inner_browY -1.2));
      endShape();

      // LEFT EYE 
      beginShape();
      vertex(-0.35, (this.inner_eyeY -0.45));
        bezierVertex(-0.8, (this.upper_eyeY -0.8), -1, (this.upper_eyeY -0.8), -1.35, this.outer_eyeY-0.4);
        bezierVertex(-1, (this.lower_eyeY -0.5), -0.8, (this.lower_eyeY -0.5), -0.35, this.inner_eyeY-0.45);
      endShape();
      
      // RIGHT BROW
      beginShape();
        vertex(0.2, (this.inner_browY-1.2));
          bezierVertex(0.4, (this.inner_browY -0.6), 1.2, (this.outer_browY -1.6), 1.6, (this.outer_browY -1));
          bezierVertex(1.2, (this.outer_browY -1.4), 0.4, (this.inner_browY -0.5), 0.2, (this.inner_browY -1.2));
      endShape();

     // RIGHT EYE
      beginShape();
        vertex(0.35, (this.inner_eyeY -0.45));
          bezierVertex(0.8, (this.upper_eyeY -0.8), 1, (this.upper_eyeY -0.8), 1.35, (this.outer_eyeY -0.4));
          bezierVertex(1, (this.lower_eyeY -0.5), 0.8, (this.lower_eyeY -0.5), 0.35, (this.inner_eyeY -0.45));
      endShape();

      pop();

    }

    // MOUTH; drawn based on 1 of 3 hair tones
    if(this.hair_value == 0){ // Draw 'happy' mouth
      push();
      translate(this.noseY[0], this.noseY[1]);
      noStroke(0);
      fill(0);
      this.mouthWidth = 0.1;
      this.mouthCorners = 0;
      this.upperLip = -0.5;
      this.lowerLip = 0;
      this.cornerX = this.mouthWidth;
      this.cornerY = this.mouthCorners;
      this.upperL = this.upperLip;
      this.lowerL = this.lowerLip;

      beginShape();
        vertex(-(this.cornerX +0.8), (this.cornerY +0.6));
          bezierVertex(
            0, (this.upperL +0.8), 
            0, (this.upperL +0.8), 
            (this.cornerX +0.8), (this.cornerY +0.6)
          );
          bezierVertex(
            0, (this.lowerL +1.8), 
            0, (this.lowerL +1.8), 
            -(this.cornerX +0.8), (this.cornerY +0.6)
          );
      endShape();
      
      // Smile Lines * Left to Right
      beginShape();
        vertex(-0.6, 0.5);
          bezierVertex(-(this.cornerX +1), (this.cornerY +0.45), -(this.cornerX +1), (this.cornerY +0.7), -(this.cornerX +0.8), (this.cornerY +0.9));
          bezierVertex(-(this.cornerX +0.9), (this.cornerY +0.7), -(this.cornerX +0.9), (this.cornerY +0.45), -0.6, 0.5);
      endShape();
  
      beginShape();
        vertex(0.6, 0.5);
          bezierVertex((this.cornerX +1), (this.cornerY +0.45), (this.cornerX +1), (this.cornerY +0.7), (this.cornerX +0.8), (this.cornerY +0.9));
          bezierVertex((this.cornerX +0.9), (this.cornerY +0.7), (this.cornerX +0.9), (this.cornerY +0.45), 0.6, 0.5);
      endShape();

      pop();

    } else if(this.hair_value == 1){ // Draw 'sad' mouth
      push();
      translate(this.noseY[0], this.noseY[1]);
      noStroke(0);
      fill(0);
      this.mouthWidth = 0.007;
      this.mouthCorners = 0.4;
      this.upperLip = -0.5;
      this.lowerLip = -1;
      this.cornerX = this.mouthWidth;
      this.cornerY = this.mouthCorners;
      this.upperL = this.upperLip;
      this.lowerL = this.lowerLip;

      beginShape();
        vertex(-(this.cornerX +0.8), (this.cornerY +0.6));
          bezierVertex(0, (this.upperL +0.8), 0, (this.upperL +0.8), (this.cornerX +0.8), (this.cornerY +0.6));
          bezierVertex(0, (this.lowerL +1.8), 0, (this.lowerL +1.8), -(this.cornerX +0.8), (this.cornerY +0.6));
      endShape();
      
      // Smile Lines * Left to Right
      beginShape();
        vertex(-0.6, 0.5);
          bezierVertex(-(this.cornerX +1), (this.cornerY +0.45), -(this.cornerX +1), (this.cornerY +0.7), -(this.cornerX +0.8), (this.cornerY +0.9));
          bezierVertex(-(this.cornerX +0.9), (this.cornerY +0.7), -(this.cornerX +0.9), (this.cornerY +0.45), -0.6, 0.5);
      endShape();
  
      beginShape();
        vertex(0.6, 0.5);
          bezierVertex((this.cornerX +1), (this.cornerY +0.45), (this.cornerX +1), (this.cornerY +0.7), (this.cornerX +0.8), (this.cornerY +0.9));
          bezierVertex((this.cornerX +0.9), (this.cornerY +0.7), (this.cornerX +0.9), (this.cornerY +0.45), 0.6, 0.5);
      endShape();

      pop();

    } else if(this.hair_value == 2){ // Draw 'angry' mouth
      push();
      translate(this.noseY[0], this.noseY[1]);
      noStroke(0);
      fill(0);
      this.mouthWidth = 0.1;
      this.mouthCorners = 0.3;
      this.upperLip = -0.25;
      this.lowerLip = -0.02;
      this.cornerX = this.mouthWidth;
      this.cornerY = this.mouthCorners;
      this.upperL = this.upperLip;
      this.lowerL = this.lowerLip;
  
      beginShape();
        vertex(-(this.cornerX +0.8), (this.cornerY +0.6));
          bezierVertex(0, (this.upperL +0.8), 0, (this.upperL +0.8), (this.cornerX +0.8), (this.cornerY +0.6));
          bezierVertex(0, (this.lowerL +1.8), 0, (this.lowerL +1.8), -(this.cornerX +0.8), (this.cornerY +0.6));
      endShape();
      
      // Smile Lines * Left to Right
      beginShape();
        vertex(-0.6, 0.5);
          bezierVertex(-(this.cornerX +1), (this.cornerY +0.45), -(this.cornerX +1), (this.cornerY +0.7), -(this.cornerX +0.8), (this.cornerY +0.9));
          bezierVertex(-(this.cornerX +0.9), (this.cornerY +0.7), -(this.cornerX +0.9), (this.cornerY +0.45), -0.6, 0.5);
      endShape();
  
      beginShape();
        vertex(0.6, 0.5);
          bezierVertex((this.cornerX +1), (this.cornerY +0.45), (this.cornerX +1), (this.cornerY +0.7), (this.cornerX +0.8), (this.cornerY +0.9));
          bezierVertex((this.cornerX +0.9), (this.cornerY +0.7), (this.cornerX +0.9), (this.cornerY +0.45), 0.6, 0.5);
      endShape();

      pop();

    }

    // CHIN DETAIL; not drawn if lower lip/mouth corners are too far down.
    if(this.mouthCorners == 0.4 && this.lowerLip <= -0.48){
    push();
    translate(this.noseY[0], this.noseY[1]);
    noStroke(0);
    fill(0);

    beginShape();
      vertex(0, this.chinY); 
        bezierVertex(0.12, (this.chinY +0.1), 0.12, (this.chinY +0.2), 0, (this.chinY +0.3));
        bezierVertex(0.2, (this.chinY +0.2), 0.2, (this.chinY +0.1), 0, this.chinY);
    endShape();

    pop();

    } else if(this.mouthCorners <= 0.38 && this.lowerLip <= -0.32) {
      push();
      translate(this.noseY[0], this.noseY[1]);
      noStroke(0);
      fill(0);

      beginShape();
        vertex(0, this.chinY); 
          bezierVertex(0.12, (this.chinY +0.1), 0.12, (this.chinY +0.2), 0, (this.chinY +0.3));

          bezierVertex(0.2, (this.chinY +0.2), 0.2, (this.chinY +0.1), 0, this.chinY);
      endShape();

      pop();

    }

  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.skin_value = int(map(settings[0], 0, 100, 0, 2));
    this.hair_value = int(map(settings[1], 0, 100, 0, 2));
    this.tilt_value = map(settings[2], 0, 100, -4, 4);
    this.color_value = int(map(settings[3], 0, 100, 0, 2));
    this.g_value = int(map(settings[4], 0, 100, 0, 3));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = int(map(this.skin_value, 0, 2, 0, 100));
    settings[1] = int(map(this.hair_value, 0, 2, 0, 100));
    settings[2] = map(this.tilt_value, -4, 4, 0, 100);
    settings[3] = int(map(this.color_value, 0, 2, 0, 100));
    settings[4] = int(map(this.g_value, 0, 3, 0, 100));
    return settings;
  }
}

// Shock Face
// 0,
// 25,
// 100,
// 100,
// 100,
// 100,
// 0,
// 66,
// null,
// 53,
// 60,
// 0
