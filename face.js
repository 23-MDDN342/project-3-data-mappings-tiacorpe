/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

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

  this.eyeBHead = 0;
  this.eyeBEnd = 1;
  this.eyeInner = 0;
  this.eyeOuter = -0.25;
  this.upperEye = 0;
  this.lowerEye = 0;
  this.mouthWidth = 0;
  this.mouthCorners = 1;
  this.upperLip = -1.5;
  this.lowerLip = -3;
  this.tilt_value = 0;


  // Colours
  this.Brown_1 = color('#ffa257');
  this.Brown_2 = color('#d17d38');
  this.Brown_3 = color('#994f12');
  this.Brown_4 = color('#823b00');
  this.Brown_5 = color('#9c673b');

  colorOptions = [this.Brown_1, this.Brown_2, this.Brown_3, this.Brown_4, this.Brown_5]

  // Mask Vertex Variables
  // Top left
    this.x1 = -9.5;
    this.y1 = -9.5;
  // Top right
    this.x2 = 9.5;
    this.y2 = -9.5;
  // Bottom right
    this.x3 = 9;
    this.y3 = 1;
  // Bottom middle
    this.x4 = 0;
    this.y4 = 9.5;
  // Bottom left
    this.x5 = -9;
    this.y5 = 1;

  // Variables for the upper, vertical sides of the mask/face.
    this.vert_X = 9;
    this.vert_Y1 = 1;
    this.vert_Y2 = 1;

  // Variables for the lower, angled sides of the mask/face.
    this.angle_X1 = 8;
    this.angle_Y1 = 9.5;
    this.angle_X2 = 4;
    this.angle_Y2 = 8;

    this.chinY = 6.5;


  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    push();
    scale(0.2);

    // Tilt Value
    angleMode(DEGREES);
    rotate(this.tilt_value);

    // Black Backing Mask
    noStroke();
    fill(0);
    beginShape();
      vertex((this.x1 -0.5), (this.y1 -0.5));
        bezierVertex(0, -8.5, 0, -8.5, (this.x2 +0.5), (this.y2 -0.5)); // TLeft->TRight
        bezierVertex((this.vert_X +0.5), this.vert_Y1, (this.vert_X +0.5), this.vert_Y2, (this.x3 +0.5), this.y3); // TRight->BRight *
        bezierVertex((this.angle_X1 +0.5), this.angle_Y1, (this.angle_X2 +0.5), (this.angle_Y2 +0.5), this.x4, (this.y4 +0.5)); // BRight->BMiddle %
        bezierVertex(-(this.angle_X2 +0.5), (this.angle_Y2 +0.5), -(this.angle_X1 +0.5), this.angle_Y1, (this.x5 -0.5), this.y5); // BMiddle->BLeft %
        bezierVertex(-(this.vert_X +0.5), this.vert_Y2, -(this.vert_X +0.5), this.vert_Y1, (this.x1 -0.5), this.y1); // BLeft->TLeft *
    endShape();

    // Face Mask
    noStroke();
    fill(colorOptions[this.color_value]);

    beginShape();
      vertex(this.x1, this.y1);
        bezierVertex(0, -8, 0, -8, this.x2, this.y2); // TLeft->TRight
        bezierVertex(this.vert_X, this.vert_Y1, this.vert_X, this.vert_Y2, this.x3, this.y3); // TRight->BRight *
        bezierVertex(this.angle_X1, this.angle_Y1, this.angle_X2, this.angle_Y2, this.x4, this.y4); // BRight->BMiddle %
        bezierVertex(-this.angle_X2, this.angle_Y2, -this.angle_X1, this.angle_Y1, this.x5, this.y5); // BMiddle->BLeft %
        bezierVertex(-this.vert_X, this.vert_Y2, -this.vert_X, this.vert_Y1, this.x1, this.y1); // BLeft->TLeft *this.
    endShape();

    ///////// NOSE /////////
    noStroke();
    fill(0);

    beginShape();
      vertex(-2.75, 0.75); 
        bezierVertex(-1, -0.3, -0.9, 0.4, 0, 0.5);
        bezierVertex(0.9, 0.4, 1, -0.3, 2.75, 0.75);
        bezierVertex(1, 0.5, 0.9, 1, 0, 1);
        bezierVertex(-0.9, 1, -1, 0.5, -2.75, 0.75);
    endShape();

    ///////// EYEBROWS /////////
    // * Left to Right
    strokeWeight(0.25);
    fill(0);
    this.inner_browY = this.eyeBHead;
    this.outer_browY = this.eyeBEnd;

    beginShape();
      vertex(-1, (this.inner_browY -6));
        bezierVertex(-2, (this.inner_browY -3), -6, (this.outer_browY -8), -8, (this.outer_browY -5));
        bezierVertex(-6, (this.outer_browY -7), -2, (this.inner_browY -2.5), -1, (this.inner_browY -6));
    endShape();
    
    beginShape();
      vertex(1, (this.inner_browY-6));
        bezierVertex(2, (this.inner_browY -3), 6, (this.outer_browY -8), 8, (this.outer_browY -5));
        bezierVertex(6, (this.outer_browY -7), 2, (this.inner_browY -2.5), 1, (this.inner_browY -6));
    endShape();


    ///////// EYES /////////
    // * Left to Right
    strokeWeight(0.25);
    fill(0);
    this.inner_eyeY = this.eyeInner;
    this.outer_eyeY = this.eyeOuter;
    this.upper_eyeY = this.upperEye;
    this.lower_eyeY = this.lowerEye;

    beginShape();
      vertex(-1.75, (this.inner_eyeY -2.25));
        bezierVertex(-4, (this.upper_eyeY -4), -5, (this.upper_eyeY -4), -6.75, this.outer_eyeY-2);
        bezierVertex(-5, (this.lower_eyeY -2.5), -4, (this.lower_eyeY -2.5), -1.75, this.inner_eyeY-2.25);
    endShape();

    beginShape();
      vertex(1.75, (this.inner_eyeY -2.25));
        bezierVertex(4, (this.upper_eyeY -4), 5, (this.upper_eyeY -4), 6.75, (this.outer_eyeY -2));
        bezierVertex(5, (this.lower_eyeY -2.5), 4, (this.lower_eyeY -2.5), 1.75, (this.inner_eyeY -2.25));
    endShape();

    ///////// MOUTH /////////
    noStroke(0);
    fill(0);
    this.cornerX = this.mouthWidth;
    this.cornerY = this.mouthCorners;
    this.upperL = this.upperLip;
    this.lowerL = this.lowerLip;
    
    // Mouth
    beginShape();
      vertex(-(this.cornerX +4), (this.cornerY +3));
        bezierVertex(0, (this.upperL +4), 0, (this.upperL +4), (this.cornerX +4), (this.cornerY +3));
        bezierVertex(0, (this.lowerL +9), 0, (this.lowerL +9), -(this.cornerX +4), (this.cornerY +3));
    endShape();
    
    // Smile Lines * Left to Right
    beginShape();
      vertex(-3, 2.5);
        bezierVertex(-(this.cornerX +5), (this.cornerY +2.25), -(this.cornerX +5), (this.cornerY +3.5), -(this.cornerX +4), (this.cornerY +4.5));
        bezierVertex(-(this.cornerX +4.5), (this.cornerY +3.5), -(this.cornerX +4.5), (this.cornerY +2.25), -3, 2.5);
    endShape();   this.

    beginShape();
      vertex(3, 2.5);
        bezierVertex((this.cornerX +5), (this.cornerY +2.25), (this.cornerX +5), (this.cornerY +3.5), (this.cornerX +4), (this.cornerY +4.5));
        bezierVertex((this.cornerX +4.5), (this.cornerY +3.5), (this.cornerX +4.5), (this.cornerY +2.25), 3, 2.5);
    endShape();

    // Chin Detail * not drawn if lower lip/mouth corners are too far down.
    if(mouthCorners == 2 && lowerLip <= -2.4){
      noStroke(0);
      fill(0);

      beginShape();
        vertex(0, this.chinY); 
          bezierVertex(0.6, (this.chinY +0.5), 0.6, (this.chinY +1), 0, (this.chinY +1.5));
          bezierVertex(1, (this.chinY +1), 1, (this.chinY +0.5), 0, this.chinY);
      endShape();
    }

    else if(mouthCorners <= 1.90 && lowerLip <= -1.6) {
      noStroke(0);
      fill(0);

      beginShape();
        vertex(0, this.chinY); 
          bezierVertex(0.6, (this.chinY +0.5), 0.6, (this.chinY +1), 0, (this.chinY +1.5));
          bezierVertex(1, (this.chinY +1), 1, (this.chinY +0.5), 0, this.chinY);
      endShape();
    }
    pop();
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.eyeBHead = map(settings[0], 0, 100, -1, 1);
    this.eyeBEnd = map(settings[1], 0, 100, 0, 2);
    this.eyeInner = map(settings[2], 0, 100, -0.5, 0.5);
    this.eyeOuter = map(settings[3], 0, 100, -0.5, 0);
    this.upperEye = map(settings[4], 0, 100, -0.5, 0.5);
    this.lowerEye = map(settings[5], 0, 100, -1.5, 1.5);
    this.mouthWidth = map(settings[6], 0, 100, -1, 0.5);
    this.mouthCorners = map(settings[7], 0, 100, 0, 2);
    this.upperLip = map(settings[8], 0, 100, -2.5, 0);
    this.lowerLip = map(settings[9], 0, 100, -5, 0);
    this.tilt_value = map(settings[10], 0, 100, -20, 20);

  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
  
    settings[0] = map(this.eyeBHead, -1, 1, 0, 100);
    settings[1] = map(this.eyeBEnd, 0, 2, 0, 100);
    settings[2] = map(this.eyeInner, -0.5, 0.5, 0, 100);
    settings[3] = map(this.eyeOuter, -0.5, 0, 0, 100);
    settings[4] = map(this.upperEye, -0.5, 0.5, 0, 100);
    settings[5] = map(this.lowerEye, -1.5, 1.5, 0, 100);
    settings[6] = map(this.mouthWidth, -1, 0.5, 0, 100);
    settings[7] = map(this.mouthCorners, 0, 2, 0, 100);
    settings[8] = map(this.upperLip, -2.5, 0, 0, 100);
    settings[9] = map(this.lowerLip, -5, 0, 0, 100);
    settings[10] = map(this.tilt_value, -20, 20, 0, 100);

    return settings;
  }
}


  // this.detailColour = [204, 136, 17];
  // this.mainColour = [51, 119, 153];
  // this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  // this.eye_shift = -1;   // range is -10 to 10
  // this.mouth_size = 1;  // range is 0.5 to 8

  // this.chinColour = [153, 153, 51]
  // this.lipColour = [136, 68, 68]
  // this.eyebrowColour = [119, 85, 17]

 //   console.log()
  //   // head
  //   ellipseMode(CENTER);
  //   stroke(stroke_color);
  //   fill(this.mainColour);
  //   ellipse(segment_average(positions.chin)[0], 0, 3, 4);
  //   noStroke();


  //   // mouth
  //   fill(this.detailColour);
  //   ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

  //   // eyebrows
  //   fill( this.eyebrowColour);
  //   stroke( this.eyebrowColour);
  //   strokeWeight(0.08);
  //   this.draw_segment(positions.left_eyebrow);
  //   this.draw_segment(positions.right_eyebrow);

  //   // draw the chin segment using points
  //   fill(this.chinColour);
  //   stroke(this.chinColour);
  //   this.draw_segment(positions.chin);

  //   fill(100, 0, 100);
  //   stroke(100, 0, 100);
  //   this.draw_segment(positions.nose_bridge);
  //   this.draw_segment(positions.nose_tip);

  //   strokeWeight(0.03);

  //   fill(this.lipColour);
  //   stroke(this.lipColour);
  //   this.draw_segment(positions.top_lip);
  //   this.draw_segment(positions.bottom_lip);

  //   let left_eye_pos = segment_average(positions.left_eye);
  //   let right_eye_pos = segment_average(positions.right_eye);

  //   // eyes
  //   noStroke();
  //   let curEyeShift = 0.04 * this.eye_shift;
  //   if(this.num_eyes == 2) {
  //     fill(this.detailColour);
  //     ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
  //     ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

  //     // fill(this.mainColour);
  //     // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
  //     // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
  //   }
  //   else {
  //     let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
  //     let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

  //     fill(this.detailColour);
  //     ellipse(eyePosX, eyePosY, 0.45, 0.27);

  //     fill(this.mainColour);
  //     ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
  //   }
  //  // fill(0)
  //  //ellipse(0,0, 0.5,0.5) center point
  //  //rect(-2,-2,4.5,4) sizing debug 
  // }

  // // example of a function *inside* the face object.
  // // this draws a segment, and do_loop will connect the ends if true
  // this.draw_segment = function(segment, do_loop) {
  //   for(let i=0; i<segment.length; i++) {
  //       let px = segment[i][0];
  //       let py = segment[i][1];
  //       ellipse(px, py, 0.1);
  //       if(i < segment.length - 1) {
  //         let nx = segment[i+1][0];
  //         let ny = segment[i+1][1];
  //         line(px, py, nx, ny);
  //       }
  //       else if(do_loop) {
  //         let nx = segment[0][0];
  //         let ny = segment[0][1];
  //         line(px, py, nx, ny);
  //       }
  //   }


    // this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    // this.eye_shift = map(settings[1], 0, 100, -2, 2);
    // this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
    // settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    // settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    // settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);