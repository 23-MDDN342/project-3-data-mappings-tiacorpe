/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 12;

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
  this.eyeBEnd = 0.2;
  this.eyeInner = 0;
  this.eyeOuter = -0.05;
  this.upperEye = 0;
  this.lowerEye = 0;
  this.mouthWidth = 0;
  this.mouthCorners = 0.2;
  this.upperLip = -0.3;
  this.lowerLip = -0.6;
  this.tilt_value = 0;
  this.color_value = 1

  // color_value

  // Colours
  this.Brown_1 = color('#ffa257');
  this.Brown_2 = color('#d17d38');
  this.Brown_3 = color('#994f12');
  this.Brown_4 = color('#823b00');
  this.Brown_5 = color('#9c673b');

  colorOptions = [this.Brown_1, this.Brown_2, this.Brown_3, this.Brown_4, this.Brown_5]

  // Mask Vertex Variables
  // Top left
    this.x1 = -1.9;
    this.y1 = -1.9;
  // Top right
    this.x2 = 1.9;
    this.y2 = -1.9;
  // Bottom right
    this.x3 = 1.8;
    this.y3 = 0.2;
  // Bottom middle
    this.x4 = 0;
    this.y4 = 1.9;
  // Bottom left
    this.x5 = -1.8;
    this.y5 = 0.2;

  // Variables for the upper, vertical sides of the mask/face.
    this.vert_X = 1.8;
    this.vert_Y1 = 0.2;
    this.vert_Y2 = 0.2;

  // Variables for the lower, angled sides of the mask/face.
    this.angle_X1 = 1.6;
    this.angle_Y1 = 1.9;
    this.angle_X2 = 0.8;
    this.angle_Y2 = 1.6;

    this.chinY = 1.3;


  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  

  this.draw = function(positions) {
    // Tilt Value
    angleMode(DEGREES);
    rotate(this.tilt_value);

    // Black Backing Mask
    noStroke();
    fill(0);
    beginShape();
      vertex((this.x1 -0.1), (this.y1 -0.1));
        bezierVertex(0, -1.7, 0, -1.7, (this.x2 +0.1), (this.y2 -0.1)); // TLeft->TRight
        bezierVertex((this.vert_X +0.1), this.vert_Y1, (this.vert_X +0.1), this.vert_Y2, (this.x3 +0.1), this.y3); // TRight->BRight *
        bezierVertex((this.angle_X1 +0.1), this.angle_Y1, (this.angle_X2 +0.1), (this.angle_Y2 +0.1), this.x4, (this.y4 +0.1)); // BRight->BMiddle %
        bezierVertex(-(this.angle_X2 +0.1), (this.angle_Y2 +0.1), -(this.angle_X1 +0.1), this.angle_Y1, (this.x5 -0.1), this.y5); // BMiddle->BLeft %
        bezierVertex(-(this.vert_X +0.1), this.vert_Y2, -(this.vert_X +0.1), this.vert_Y1, (this.x1 -0.1), this.y1); // BLeft->TLeft *
    endShape();

    // Face Mask
    noStroke();
    fill(colorOptions[this.color_value]);

    beginShape();
      vertex(this.x1, this.y1);
        bezierVertex(0, -1.6, 0, -1.6, this.x2, this.y2); // TLeft->TRight
        bezierVertex(this.vert_X, this.vert_Y1, this.vert_X, this.vert_Y2, this.x3, this.y3); // TRight->BRight *
        bezierVertex(this.angle_X1, this.angle_Y1, this.angle_X2, this.angle_Y2, this.x4, this.y4); // BRight->BMiddle %
        bezierVertex(-this.angle_X2, this.angle_Y2, -this.angle_X1, this.angle_Y1, this.x5, this.y5); // BMiddle->BLeft %
        bezierVertex(-this.vert_X, this.vert_Y2, -this.vert_X, this.vert_Y1, this.x1, this.y1); // BLeft->TLeft *this.
    endShape();

    ///////// NOSE /////////
    noStroke();
    fill(0);

    beginShape();
      vertex(-0.55, 0.15); 
        bezierVertex(-0.2, -0.06, -0.18, 0.08, 0, 0.1);
        bezierVertex(0.18, 0.08, 0.2, -0.06, 0.55, 0.15);
        bezierVertex(0.2, 0.1, 0.18, 0.2, 0, 0.2);
        bezierVertex(-0.18, 0.2, -0.2, 0.1, -0.55, 0.15);
    endShape();

    ///////// EYEBROWS /////////
    // * Left to Right
    strokeWeight(0.25);
    fill(0);
    this.inner_browY = this.eyeBHead;
    this.outer_browY = this.eyeBEnd;

    beginShape();
      vertex(-0.2, (this.inner_browY -1.2));
        bezierVertex(-0.4, (this.inner_browY -0.6), -1.2, (this.outer_browY -1.6), -1.6, (this.outer_browY -1));
        bezierVertex(-1.2, (this.outer_browY -1.4), -0.4, (this.inner_browY -0.5), -0.2, (this.inner_browY -1.2));
    endShape();
    
    beginShape();
      vertex(0.2, (this.inner_browY-1.2));
        bezierVertex(0.4, (this.inner_browY -0.6), 1.2, (this.outer_browY -1.6), 1.6, (this.outer_browY -1));
        bezierVertex(1.2, (this.outer_browY -1.4), 0.4, (this.inner_browY -0.5), 0.2, (this.inner_browY -1.2));
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
      vertex(-0.35, (this.inner_eyeY -0.45));
        bezierVertex(-0.8, (this.upper_eyeY -0.8), -1, (this.upper_eyeY -0.8), -1.35, this.outer_eyeY-0.4);
        bezierVertex(-1, (this.lower_eyeY -0.5), -0.8, (this.lower_eyeY -0.5), -0.35, this.inner_eyeY-0.45);
    endShape();

    beginShape();
      vertex(0.35, (this.inner_eyeY -0.45));
        bezierVertex(0.8, (this.upper_eyeY -0.8), 1, (this.upper_eyeY -0.8), 1.35, (this.outer_eyeY -0.4));
        bezierVertex(1, (this.lower_eyeY -0.5), 0.8, (this.lower_eyeY -0.5), 0.35, (this.inner_eyeY -0.45));
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

    // Chin Detail * not drawn if lower lip/mouth corners are too far down.
    if(this.mouthCorners == 0.4 && this.lowerLip <= -0.48){
      noStroke(0);
      fill(0);

      beginShape();
        vertex(0, this.chinY); 
          bezierVertex(0.12, (this.chinY +0.1), 0.12, (this.chinY +0.2), 0, (this.chinY +0.3));
          bezierVertex(0.2, (this.chinY +0.2), 0.2, (this.chinY +0.1), 0, this.chinY);
      endShape();
    }

    else if(this.mouthCorners <= 0.38 && this.lowerLip <= -0.32) {
      noStroke(0);
      fill(0);

      beginShape();
        vertex(0, this.chinY); 
          bezierVertex(0.12, (this.chinY +0.1), 0.12, (this.chinY +0.2), 0, (this.chinY +0.3));

          bezierVertex(0.2, (this.chinY +0.2), 0.2, (this.chinY +0.1), 0, this.chinY);
      endShape();
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.eyeBHead = map(settings[0], 0, 100, -0.2, 0.2);
    this.eyeBEnd = map(settings[1], 0, 100, 0, 0.4);
    this.eyeInner = map(settings[2], 0, 100, -0.1, 0.1);
    this.eyeOuter = map(settings[3], 0, 100, -0.1, 0);
    this.upperEye = map(settings[4], 0, 100, -0.1, 0.1);
    this.lowerEye = map(settings[5], 0, 100, -0.3, 0.3);
    this.mouthWidth = map(settings[6], 0, 100, -0.2, 0.1);
    this.mouthCorners = map(settings[7], 0, 100, 0, 0.4);
    this.upperLip = map(settings[8], 0, 100, -0.5, 0);
    this.lowerLip = map(settings[9], 0, 100, -1, 0);
    this.tilt_value = map(settings[10], 0, 100, -4, 4);
    this.color_value = int(map(settings[11], 0, 100, 0, 4));

  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
  
    settings[0] = map(this.eyeBHead, -0.2, 0.2, 0, 100);
    settings[1] = map(this.eyeBEnd, 0, 0.4, 0, 100);
    settings[2] = map(this.eyeInner, -0.1, 0.1, 0, 100);
    settings[3] = map(this.eyeOuter, -0.1, 0, 0, 100);
    settings[4] = map(this.upperEye, -0.1, 0.1, 0, 100);
    settings[5] = map(this.lowerEye, -0.3, 0.3, 0, 100);
    settings[6] = map(this.mouthWidth, -0.2, 0.1, 0, 100);
    settings[7] = map(this.mouthCorners, 0, 0.4, 0, 100);
    settings[8] = map(this.upperLip, -0.5, 0, 0, 100);
    settings[9] = map(this.lowerLip, -1, 0, 0, 100);
    settings[10] = map(this.tilt_value, -4, 4, 0, 100);
    settings[11] = int(map(this.color_value, 0, 4, 0, 100));

    return settings;
  }
}

// colorChoice

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