class Particle{
  constructor(){
    this.pos = createVector( 1, 1);
    this.rays = [];
    this.heading = 0;
    for(let i = -view_angle/2; i<view_angle/2; i+=1){
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }
  
  rotate(angle){
    this.heading %= 360;
    this.heading += angle;
    let n = this.rays.length;
    for(let i = -n/2; i<n/2; i+=1){
      this.rays[i+n/2].setAngle(radians(i + this.heading));
    }
  }
  
  rotateMouse(){
    if(mouseX<=width/2 && mouseY<=height && mouseX>0 && mouseY>0){
      this.heading = degrees((createVector(mouseX,mouseY).sub(this.pos)).heading());
      let n = this.rays.length;
      for(let i = -n/2; i<n/2; i+=1){
        this.rays[i+n/2].setAngle(radians(i + this.heading));
      }
    }
  }
  
  update(x,y){
    this.pos.add(x,y);
    if(this.pos.x<=0 || this.pos.x>=width/2){
      if(this.pos.x<=0){
        this.pos.x = 1;
      }else{
        this.pos.x = width/2 - 1;
      }
    }
    if(this.pos.y<=0 || this.pos.y>=height){
      if(this.pos.y<=0){
        this.pos.y = 1;
      }else{
        this.pos.y = height -1;
      }
    }
  }
  
  updateViewAngle(angle){
    //this.heading += this.rays.length - angle; 
    this.rays = [];
    for(let i = -angle/2; i<angle/2; i+=1){
      this.rays.push(new Ray(this.pos, radians(i + this.heading)));
    }
  }
  
  show(){
    fill(255);
    //ellipse(this.pos.x, this.pos.y, 16);
    for(let ray of this.rays){
      ray.show();
    }
  }
  look(walls){
    let scene = [];
    for(let ray of this.rays){
      let closest = null;
      let record = Infinity;
      for(let wall of walls){
        const pt = ray.cast(wall);
        if(pt){
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.dir.heading() - radians(this.heading);
          if(!mouseIsPressed || !(mouseX<=width && mouseX>width/2 && mouseY<=height && mouseY>=0)){
            d *= cos(a);
          }
          if(d<record){
            record =d;
            closest = pt;
          }
        }
      }
      if(closest){
        //strokeWeight(5);
        stroke(255,100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene.push(record);
    }
    return scene;
  }
}
