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

  this.skin_value = 0 // Range; 0-3 [4 values]
  this.hair_value = 2 // Range; 0-3 [4 values]
  this.vibe_value = 1 // Range; 0-1 [2 values]
 
  // SKIN TONE Mask Colours
    this.STone_1 = color('#FFA257');
    this.STone_2 = color('#D17D38');
    this.STone_3 = color('#994F12');
    this.STone_4 = color('#823B00');

    colorOptions = [this.STone_1, this.STone_2, this.STone_3, this.STone_4]
    // (colorOptions[this.skin_value])

  // HAIR DARKNESS Backing Colours
    this.HDark_1 = color('#DF8E4C');
    this.HDark_2 = color('#9D5E2A');
    this.HDark_3 = color('#733B0E');
    this.HDark_4 = color('#622C00');

    hairOptions = [this.HDark_1, this.HDark_2, this.HDark_3, this.HDark_4]
    // (hairOptions[this.hair_value])

  // MASCULINE VS. FEMININE Accent Colours
    this.fem = color('#FFD0A7');
    this.masc = color('#C97510');

    mascVfemOptions = [this.fem, this.masc]

  /*
   * Draw the face with position lists that include:
   *    left_eyebrow, right_eyebrow, left_eye, right_eye, 
   *    nose_bridge, nose_tip, bottom_lip, top_lip, chin
   */  

  this.draw = function(positions) {

    // Tilt Value
    angleMode(DEGREES);
    rotate(this.tilt_value);

    this.chin = positions.chin[8];
    this.Left_maskpoint1 = positions.chin[0]
    this.Left_maskpoint2 = positions.chin[4]
    this.Lmid_maskpoint = positions.chin[6]

    this.Mid_maskpoint = positions.chin[8]

    this.Rmid_maskpoint = positions.chin[10]
    this.Right_maskpoint1 = positions.chin[12]
    this.Right_maskpoint2 = positions.chin[16]

    // Backing Mask
    noStroke();
    fill((hairOptions[this.hair_value]));
    
    beginShape();
      vertex(this.Left_maskpoint1[0] -0.5, this.Left_maskpoint1[1] -1.1);
        bezierVertex(
          0, -1.85, 
          0, -1.85, 
          this.Right_maskpoint2[0] +0.5, this.Right_maskpoint2[1] -1.1
          ); // TLeft->TRight

        bezierVertex(
          this.Right_maskpoint1[0] +0.48, this.Right_maskpoint1[1] -0.35, 
          this.Right_maskpoint1[0] +0.45, this.Right_maskpoint1[1] -0.25, 
          this.Right_maskpoint1[0] +0.4, this.Right_maskpoint1[1]
          ); // TRight->BRight *
        bezierVertex(
          this.Rmid_maskpoint[0] +0.3, this.Rmid_maskpoint[1] +0.25, 
          this.Rmid_maskpoint[0] +0.2, this.Rmid_maskpoint[1] +0.35, 
          this.Mid_maskpoint[0], this.Mid_maskpoint[1] +0.1
          ); // BRight->BMiddle %

        bezierVertex(
          this.Lmid_maskpoint[0] -0.2, this.Lmid_maskpoint[1] +0.35, 
          this.Lmid_maskpoint[0] -0.3, this.Lmid_maskpoint[1] +0.25, 
          this.Left_maskpoint2[0] -0.4, this.Left_maskpoint2[1]
          ); // BMiddle->BLeft %
        bezierVertex(
          this.Left_maskpoint2[0] -0.45, this.Left_maskpoint2[1] -0.25, 
          this.Left_maskpoint2[0] -0.48, this.Left_maskpoint2[1] -0.35, 
          this.Left_maskpoint1[0] -0.5, this.Left_maskpoint1[1] -1          
          ); // BLeft->TLeft *this.
    endShape();

    // Face Mask
    noStroke();
    fill(colorOptions[this.skin_value]);

    beginShape();
      vertex(this.Left_maskpoint1[0] -0.4, this.Left_maskpoint1[1] -1);
        bezierVertex(
          0, -1.75, 
          0, -1.75, 
          this.Right_maskpoint2[0] +0.4, this.Right_maskpoint2[1] -1
          ); // TLeft->TRight

        bezierVertex(
          this.Right_maskpoint1[0] +0.38, this.Right_maskpoint1[1] -0.25, 
          this.Right_maskpoint1[0] +0.35, this.Right_maskpoint1[1] -0.15, 
          this.Right_maskpoint1[0] +0.3, this.Right_maskpoint1[1]
          ); // TRight->BRight *
        bezierVertex(
          this.Rmid_maskpoint[0] +0.2, this.Rmid_maskpoint[1] +0.15, 
          this.Rmid_maskpoint[0] +0.1, this.Rmid_maskpoint[1] +0.25, 
          this.Mid_maskpoint[0], this.Mid_maskpoint[1]
          ); // BRight->BMiddle %

        bezierVertex(
          this.Lmid_maskpoint[0] -0.1, this.Lmid_maskpoint[1] +0.25, 
          this.Lmid_maskpoint[0] -0.2, this.Lmid_maskpoint[1] +0.15, 
          this.Left_maskpoint2[0] -0.3, this.Left_maskpoint2[1]
          ); // BMiddle->BLeft %
        bezierVertex(
          this.Left_maskpoint2[0] -0.35, this.Left_maskpoint2[1] -0.15, 
          this.Left_maskpoint2[0] -0.38, this.Left_maskpoint2[1] -0.25, 
          this.Left_maskpoint1[0] -0.4, this.Left_maskpoint1[1] -1          
          ); // BLeft->TLeft *this.
    endShape();

    ///////// NOSE /////////
    noStroke();
    fill(0);

    // Nose height & subtle direction indicator
      this.noseY = segment_average([positions.nose_bridge[1], positions.top_lip[2]]);
      this.noseTipX = positions.nose_tip[2]

    beginShape();
      vertex(-0.55, (this.noseY[0] +0.15)); 
        bezierVertex(
          -0.2, (this.noseY[0] -0.06), 
          -0.18, (this.noseY[0] +0.08), 
          (this.noseTipX[0])/2, (this.noseY[0] +0.1) // Upper nose tip
        );
        bezierVertex(
          0.18, (this.noseY[0] +0.08), 
          0.2, (this.noseY[0] -0.06), 
          0.55, (this.noseY[0] +0.15) 
        );
        bezierVertex(
          0.2, (this.noseY[0] +0.1), 
          0.18, (this.noseY[0] +0.2), 
          (this.noseTipX[0])/2, (this.noseY[0] +0.2) // Lower nose tip
        );
        bezierVertex(
          -0.18, (this.noseY[0] +0.2), 
          -0.2, (this.noseY[0] +0.1), 
          -0.55, (this.noseY[0] +0.15)
        );
    endShape();

    ///////// EYEBROWS /////////
    noStroke();
    fill(0);

    // Inner & Outer Brow points
      this.LBrow_inner = positions.left_eyebrow[4];
      this.LBrow_outer = positions.left_eyebrow[0];
      this.RBrow_inner = positions.right_eyebrow[0];
      this.RBrow_outer = positions.right_eyebrow[4];

    // LEFT BROW
    beginShape();
      vertex(this.LBrow_inner[0] +0.2, (this.LBrow_inner[1]));
        bezierVertex(
          this.LBrow_inner[0], (this.LBrow_inner[1] +0.3), 
          this.LBrow_outer[0] -0.1, (this.LBrow_outer[1] -0.5), 
          this.LBrow_outer[0] -0.2, (this.LBrow_outer[1]+ 0.25)
        );
        bezierVertex(
          this.LBrow_outer[0] -0.1, (this.LBrow_outer[1] -0.3), 
          this.LBrow_inner[0], (this.LBrow_inner[1] +0.4), 
          this.LBrow_inner[0] +0.2, (this.LBrow_inner[1])
        );
    endShape();
    
    // RIGHT BROW
    beginShape();
      vertex(this.RBrow_inner[0] -0.2, (this.RBrow_inner[1]));
        bezierVertex(
          this.RBrow_inner[0], (this.RBrow_inner[1] +0.3), 
          this.RBrow_outer[0] +0.1, (this.RBrow_outer[1] -0.5), 
          this.RBrow_outer[0] +0.2, (this.RBrow_outer[1]+ 0.25)
        );
        bezierVertex(
          this.RBrow_outer[0] +0.1, (this.RBrow_outer[1] -0.3), 
          this.RBrow_inner[0], (this.RBrow_inner[1] +0.4), 
          this.RBrow_inner[0] -0.2, (this.RBrow_inner[1])
        );
    endShape();

    ///////// EYES /////////
    strokeWeight(0.25);
    fill(0);

    // inner >> outer
      this.LEye_outer = positions.left_eye[0];
      this.LEye_upperlid_1 = positions.left_eye[1];
      this.LEye_upperlid_2 = positions.left_eye[2];
      this.LEye_inner = positions.left_eye[3];
    // outer >> inner
      this.LEye_lowerlid_1 = positions.left_eye[4];
      this.LEye_lowerlid_2 = positions.left_eye[5];

    // inner >> outer
      this.REye_outer = positions.right_eye[3];
      this.REye_upperlid_1 = positions.right_eye[2];
      this.REye_upperlid_2 = positions.right_eye[1];
      this.REye_inner = positions.right_eye[0];
    // outer >> inner
      this.REye_lowerlid_1 = positions.right_eye[4];
      this.REye_lowerlid_2 = positions.right_eye[5];

    // Left Eye Pupil/iris
      this.IrisL = segment_average([positions.left_eye[0], positions.left_eye[3]]);

    // Left Right Pupil/iris
     this.IrisR = segment_average([positions.right_eye[0], positions.right_eye[3]]);

    // LEFT EYE 
    beginShape();
      vertex((this.LEye_outer[0] -0.2), this.LEye_outer[1]);
        bezierVertex(
          this.LEye_upperlid_1[0], (this.LEye_upperlid_1[1] -0.1),
          this.LEye_upperlid_2[0], (this.LEye_upperlid_2[1] -0.1),
          (this.LEye_inner[0] +0.2), this.LEye_inner[1]
        );
        bezierVertex(
          this.LEye_lowerlid_1[0], (this.LEye_lowerlid_1[1] +0.1),
          this.LEye_lowerlid_2[0], (this.LEye_lowerlid_2[1] +0.1),
          (this.LEye_outer[0] -0.2), this.LEye_outer[1]
        );
    endShape();

   // RIGHT EYE
    beginShape();
      vertex((this.REye_outer[0] +0.2), this.REye_outer[1]);
        bezierVertex(
          this.REye_upperlid_1[0], (this.REye_upperlid_1[1] -0.1), 
          this.REye_upperlid_2[0], (this.REye_upperlid_2[1] -0.1), 
          (this.REye_inner[0] -0.2), this.REye_inner[1]
        );
        bezierVertex(
          this.REye_lowerlid_1[0], (this.REye_lowerlid_1[1] +0.1), 
          this.REye_lowerlid_2[0], (this.REye_lowerlid_2[1] +0.1), 
          (this.REye_outer[0] +0.2), this.REye_outer[1]
        );
    endShape();

    // IRIS
    fill(mascVfemOptions[this.vibe_value]);
    ellipse(this.IrisL[0], this.IrisL[1], 0.2);
    ellipse(this.IrisR[0], this.IrisR[1], 0.2);

    // PUPIL
    fill(0);
    ellipse(this.IrisL[0], this.IrisL[1], 0.1);
    ellipse(this.IrisR[0], this.IrisR[1], 0.1);

    ///////// MOUTH /////////
    noStroke(0);
    fill(0);

    // Main Lip points
      this.lipCorner1 = positions.top_lip[0];
      this.upperLip = positions.top_lip[3];
      this.bottomLip = positions.bottom_lip[3];
      this.lipCorner2 = positions.top_lip[6];

    // Mid Lip points
      this.upperLmid = segment_average([positions.top_lip[2], positions.top_lip[4]]);
      this.lowerLmid = segment_average([positions.bottom_lip[2], positions.bottom_lip[4]]);

    beginShape();
      vertex(this.lipCorner1[0], this.lipCorner1[1]);
        bezierVertex(
          this.upperLmid[0], this.upperLip[1], 
          this.upperLmid[0], this.upperLip[1], 
          this.lipCorner2[0], this.lipCorner2[1]
        );
        bezierVertex(
          this.lowerLmid[0], this.bottomLip[1], 
          this.lowerLmid[0], this.bottomLip[1], 
          this.lipCorner1[0], this.lipCorner1[1]
        );
    endShape();
    
    // Smile Lines * Left to Right
    beginShape();
      vertex(this.lipCorner1[0] -0.05, this.lipCorner1[1] -0.2);
        bezierVertex(
          (this.lipCorner1[0] -0.35), (this.lipCorner1[1] -0.1), 
          (this.lipCorner1[0] -0.35), (this.lipCorner1[1] +0.1), 
          (this.lipCorner1[0] -0.05), (this.lipCorner1[1] +0.2)
        );
        bezierVertex(
          (this.lipCorner1[0] -0.25), (this.lipCorner1[1] +0.1), 
          (this.lipCorner1[0] -0.25), (this.lipCorner1[1] -0.1), 
          this.lipCorner1[0] -0.05, this.lipCorner1[1] -0.2
          );
    endShape();

    beginShape();
      vertex(this.lipCorner2[0] +0.05, this.lipCorner2[1] -0.2);
        bezierVertex(
          (this.lipCorner2[0] +0.35), (this.lipCorner2[1] -0.1), 
          (this.lipCorner2[0] +0.35), (this.lipCorner2[1] +0.1), 
          (this.lipCorner2[0] +0.05), (this.lipCorner2[1] +0.2) 
        );
        bezierVertex(
          (this.lipCorner2[0] +0.25), (this.lipCorner2[1] +0.1), 
          (this.lipCorner2[0] +0.25), (this.lipCorner2[1] -0.1), 
          this.lipCorner2[0] +0.05, this.lipCorner2[1] -0.2
        );
    endShape();

    ///////// CHIN DETAIL /////////
    noStroke(0);
    fill(0);

    this.chinDetail = positions.chin[8];

    beginShape();
      vertex(this.chinDetail[0], this.chinDetail[1] -0.15); 
        bezierVertex(
          this.chinDetail[0] +0.15, (this.chinDetail[1] -0.25), 
          this.chinDetail[0] +0.15, (this.chinDetail[1] -0.35), 
          this.chinDetail[0], (this.chin[1] -0.45)
        );
        bezierVertex(
          this.chinDetail[0] +0.05, (this.chinDetail[1] -0.35), 
          this.chinDetail[0] +0.05, (this.chinDetail[1] -0.25), 
          this.chinDetail[0], (this.chinDetail[1] -0.15)      
        );
    endShape();

  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.skin_value = int(map(settings[0], 0, 100, 0, 3));
    this.hair_value = int(map(settings[1], 0, 100, 0, 3));
    this.vibe_value = int(map(settings[2], 0, 100, 0, 1));

  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = int(map(this.skin_value, 0, 3, 0, 100));
    settings[1] = int(map(this.hair_value, 0, 3, 0, 100));
    settings[2] = int(map(this.vibe_value, 0, 1, 0, 100));

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