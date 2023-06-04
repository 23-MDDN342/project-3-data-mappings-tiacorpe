//////// MY CODE //////////
const ease = new p5.Ease();

function draw_one_frame(cur_frac){
  // Colors
  let gold = color("#ffb133");
  let VdarkB = color("#00259c");
  let darkB = color("#2b54d8");
  let blue = color("#007cff");
  let lightB = color("#0db7f4");

  background(darkB);

  // Multiple ellipses layers
  draw_multiples(cur_frac);

  fill(gold);
  stroke(gold);
  rect(width/6, 0, width/2, height);

  draw_multiples2(cur_frac);

  ////////

  // Background rectangle 2
  fill(VdarkB);
  stroke(VdarkB);
  strokeWeight(width/100);
  rect(0, 0, width/6, height);

  // Background rectangle 3
  fill(lightB);
  stroke(lightB);
  rect(width * 5/6, 0, width * 1/6, height * 4/6);

  // Back rectangle
  draw_Backrect(cur_frac);

  // Upper-left squares
  draw_rect_1(cur_frac);
  draw_rect_2(cur_frac);

  // Rotating semi-circle
  draw_semi();
  draw_semi2();

  // Bottom rectangle
  fill (blue);
  noStroke();
  rect(0, height * 2/3, width, height * 2/3);

  // Triangles
  draw_tri(cur_frac);
  draw_triangles();

}

//////// FUNCTIONS //////////
// Sliding rectangles
function draw_rect_1(cur_frac) {
  // General movement w/help from example_easing.js
  let going_right = true;
  let amount_across = 0;
  if (cur_frac < 0.5) {
    going_right = true;
    amount_across = cur_frac * 2;
  }
  else {
    going_right = false;
    amount_across = (cur_frac-0.5) * 2;
  }

  // Easing movement
  const left_x = int(0);
  const right_x = int(width/6);

  const ease_amount_across = ease.circularOut(amount_across); // OK

  if(going_right) {
    cur_x = map(ease_amount_across, 0, 1, left_x, right_x);
  }
  else {
    cur_x = map(ease_amount_across, 0, 1, right_x, left_x)
  }

  // Rectangle
  let lightB = color("#0db7f4");
  let blue = color("#007cff");

  fill(lightB);
  stroke(blue);
  strokeWeight(width/100);
  rect(cur_x, 0, width/6, height * 1/6);
  rect(cur_x, height * 2/6, width/6, height * 1/6);

}

function draw_rect_2(cur_frac) {
  // General movement w/help from example_easing.js
  let going_right = true;
  let amount_across = 0;
  if (cur_frac < 0.5) {
    going_right = true;
    amount_across = cur_frac * 2;
  }
  else {
    going_right = false;
    amount_across = (cur_frac-0.5) * 2;
  }

  // Easing movement
  const left_x = int(0);
  const right_x = int(width/6);
  const ease_amount_across = ease.circularInOut(amount_across); // OK

  if(going_right) {
    cur_x = map(ease_amount_across, 0, 1, left_x, right_x);
  }
  else {
    cur_x = map(ease_amount_across, 0, 1, right_x, left_x)
  }

  // Rectangle
  let lightB = color("#0db7f4");
  let blue = color("#007cff");

  fill(lightB);
  stroke(blue);
  strokeWeight(width/100);
  rect(cur_x, height/6, width/6, height * 1/6);
  rect(cur_x, height* 3/6, width/6, height * 1/6);

}

// Background rectangle
function draw_Backrect(cur_frac) {
// General movement w/help from example_easing.js
  let going_right = true;
  let amount_across = 0;
  if (cur_frac < 0.5) {
    going_right = true;
    amount_across = cur_frac * 2;
  }
  else {
    going_right = false;
    amount_across = (cur_frac-0.5) * 2;
  }

  // Easing movement
  const left_x = int(width/6);
  const right_x = int(width * 2.5/6);

  const ease_amount_across = ease.exponentialInOut(amount_across); // OK

  if(going_right) {
    cur_x = map(ease_amount_across, 0, 1, right_x, left_x);
  }
  else {
    cur_x = map(ease_amount_across, 0, 1, left_x, right_x);
  }

  // Rectangle/square
  let blue = color("#007cff");

  fill(blue);
  stroke(blue);
  strokeWeight(width/100);
  rect(cur_x, 0, width/6, height * 2/3);

}

// Rotating semi-circle 1
function draw_semi(cur_frac) {
  let darkB = color("#2b54d8");
  let gold = color("#ffb133");

  // Semi-circle
  let diameter = height* 0.95/3;
  let x = 0;
  let y = 0;
  
  // Rotation
  push();
  translate(width * 5/6, height/6);

  let angle = radians(frameCount * 10 % 360);
  rotate(angle);

  fill(darkB);
  stroke(darkB);
  strokeWeight(width/100);
  ellipse(x, y, diameter);

  fill(gold);
  arc(x, y, diameter, diameter, 0, PI);
  pop();

}

// Rotating semi-circle 2
function draw_semi2(cur_frac) {
  let darkB = color("#2b54d8");
  let gold = color("#ffb133");

  // Semi-circle
  let diameter = height* 0.75/3;
  let x = 0;
  let y = 0;
  
  // Rotation
  push();
  translate(width * 5/6, height/2);

  let angle2 = radians(frameCount * 10 % 360);
  rotate(angle2);

  fill(darkB);
  stroke(darkB);
  strokeWeight(width/100);
  ellipse(x, y, diameter);

  fill(gold);
  arc(x, y, diameter, diameter, 0, PI);
  pop();

}

// Multiples example shown in class
function draw_multiples(cur_frac) {
const orbSize = height / 10;
let gold = color("#ffb133");
let blue = color("#007cff");

let numberOfOrbs = 5; 
let sliced_Frac = cur_frac / numberOfOrbs;

for(let i = 0; i < numberOfOrbs; i++){
  let amount_across = (sliced_Frac + i/numberOfOrbs) % 1.0;

  let orbX = map(amount_across, 0, 1, 0, height * 5/6)
  fill(gold);
  stroke(blue);
  strokeWeight(width/100);
  ellipse(width * 4/6, orbX, orbSize)
}

}

function draw_multiples2(cur_frac) {
  const orbSize = height / 10;
  let blue = color("#007cff");
  let VdarkB = color("#00259c");

  
  let numberOfOrbs = 5; 
  let sliced_Frac = cur_frac / numberOfOrbs;
  
  for(let i = 0; i < numberOfOrbs; i++){
    let amount_across = (sliced_Frac + i/numberOfOrbs) % 1.0;
  
    let orbX = map(amount_across, 0, 1, height * 5/6, 0)
    fill(VdarkB);
    stroke(blue);
    strokeWeight(width/100);
    ellipse(width * 3.5/6, orbX, orbSize)
  }
  
  }

// Triangle pattern
function draw_triangles(cur_frac) {
  let triPeak = height
  let triBott = height * 2/3

  let blue = color("#007cff");
  let darkB = color("#2b54d8");
  let VdarkB = color("#00259c");


  fill(VdarkB);
  noStroke();
  triangle(0, triBott, 0, triPeak, width/6, triBott);
  triangle(width/6, triBott, width * 2/6, triPeak, width * 3/6, triBott);
  triangle(width * 3/6, triBott, width * 4/6, triPeak, width * 5/6, triBott);
  triangle(width * 5/6, triBott, width, triPeak, width, triBott);

  fill(darkB);
  stroke(blue);
  strokeWeight(width/100);
  triangle(0, triBott, width/6, triPeak, width * 2/6, triBott);
  triangle(width * 2/6, triBott, width * 3/6, triPeak, width * 4/6, triBott);
  triangle(width * 4/6, triBott, width * 5/6, triPeak, width, triBott);

}

// Moving backing triangle
function draw_tri(cur_frac) {
  const ease = new p5.Ease();

  // Left point
  const L_left_x = int(0);
  const L_left_y = int(height);

  const L_right_x = int(width * 5/6);
  const L_right_y = int(height);

  // Middle point
  const M_left_x = int(width/12);
  const M_left_y = int(height * 5/6);

  const M_right_x = int(width * 11/12);
  const M_right_y = int(height * 5/6);

  // Right point
  const R_left_x = int(width/6);
  const R_left_y = int(height);

  const R_right_x = int(width);
  const R_right_y = int(height);

  // General movement w/help from example_easing.js
  let going_right = true;
  let amount_across = 0;

  if (cur_frac < 0.5) {
    going_right = true;
    amount_across = cur_frac * 2;
  }
  else {
    going_right = false;
    amount_across = (cur_frac-0.5) * 2;
  }

  // Easing movement
  const ease_amount_across = ease.circularInOut(amount_across); // OK

  if(going_right) {
    cur_1 = map(ease_amount_across, 0, 1, L_right_x, L_left_x);
    cur_1y = map(ease_amount_across, 0, 1, L_right_y, L_left_y);

    cur_2 = map(ease_amount_across, 0, 1, M_right_x, M_left_x);
    cur_2y = map(ease_amount_across, 0, 1, M_right_y, M_left_y);

    cur_3 = map(ease_amount_across, 0, 1, R_right_x, R_left_x);
    cur_3y = map(ease_amount_across, 0, 1, R_right_y, R_left_y);
  }
  else {
    cur_1 = map(ease_amount_across, 0, 1, L_left_x, L_right_x)
    cur_1y = map(ease_amount_across, 0, 1, L_left_y, L_right_y)

    cur_2 = map(ease_amount_across, 0, 1, M_left_x, M_right_x)
    cur_2y = map(ease_amount_across, 0, 1, M_left_y, M_right_y)

    cur_3 = map(ease_amount_across, 0, 1, R_left_x, R_right_x)
    cur_3y = map(ease_amount_across, 0, 1, R_left_y, R_right_y)
  }

  // Triangle
  let gold = color("#ffb133");
  fill(gold);
  noStroke();
  triangle(cur_1, cur_1y, cur_2, cur_2y, cur_3, cur_3y);
}