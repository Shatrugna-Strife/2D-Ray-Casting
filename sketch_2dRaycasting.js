let walls= [];
let ray;
let particle;
var view_angle = 60;
let slider_view;
let speed = 1;


function setup() {
  createCanvas(800,400);
  walls.push(new Boundary(0,0,width/2 ,0));
  walls.push(new Boundary(0,0,0,height));
  walls.push(new Boundary(width/2 ,0,width/2,height));
  walls.push(new Boundary(0,height,width/2 ,height));
  for(let i =0; i<5; i++){
    let x1 = random(width/2);
    let y1 = random(height);
    let x2 = random(width/2);
    let y2 = random(height);
    walls.push(new Boundary(x1,y1,x2,y2));
  }
  particle = new Particle();
  slider_view = createSlider(0,360,view_angle);
  slider_view.input(slider_view_input);
}

function slider_view_input(){
    const val = slider_view.value();
    //console.log(val);
    particle.updateViewAngle(val);
}



function draw() {
  background(0);
  line(width/2 - 1,0,width/2 - 1,height);
  for (let wall of walls){
    wall.show();
  }
  
  if(keyIsDown(65) && keyIsDown(68)){
    particle.update(0,0);
  }else if(keyIsDown(65)){
    particle.update(-speed, 0);
  }else if(keyIsDown(68)){
    particle.update(speed, 0);
  }
  
  if(keyIsDown(83) && keyIsDown(87)){
    particle.update(0,0);
  }else if(keyIsDown(83)){
    particle.update(0, speed);
  }else if(keyIsDown(87)){
    particle.update(0, -speed);
  }
  
  particle.rotateMouse();  
  
  particle.show();
  let scene = particle.look(walls);
  let side = width/(2*scene.length);
  push();
  translate(width/2, 0);
  for(let i = 0; i< scene.length;i++){
    noStroke();
    const sq = scene[i] * scene[i];
    const wsq = (width/2) *(width/2);
    fill(map(sq, 0, wsq, 255,0));
    rectMode(CENTER);
    rect(i*(side) + side/2, height/2, side + 1, map(scene[i], 0, width/2, height,height/10));
  }
  pop();
}
