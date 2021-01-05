let strokeColor = "rgb(0,0,0)";
let testCharge;
let polygons;
let shape;
let shapes = [];
let currentFrameRate;

let collided = false;

function setup() 
{
  createCanvas(windowWidth, windowHeight)
  testCharge = new Polygon(mouseX, mouseY, 5, 10)
  polygons = [new Polygon(width/2, height/2, 80, 4), new Polygon(width/3, height/2, 80, 8)]
  
  shape = new Shape([
    {x: 0, y: 0},
    {x: 400, y: 0},
    {x: 460, y: 7},
    {x: 498, y: 31},
    {x: 522, y: 82},
    {x: 523, y: 250},
    {x: 423, y: 250},
    {x: 425, y: 125},
    {x: 413, y: 100},
    {x: 395, y: 100},
    {x: 1, y: 100},
    {x: 0, y: 0}]);

  shapes[0] = shape; 

  frameRate(60);
}


function draw() 
{
  background(255)

  shape.display();

  


  collided = false;

  testCharge.x = mouseX;
  testCharge.y = mouseY;

  // polygons.forEach(polygon =>
  // {
  //   polygon.display();
  // })

  testCharge.display();

  // polygons.forEach(polygon =>
  // {
  //   //onsole.log(polygon.returned);
  //   if(collide(testCharge.returned, polygon.returned) && !collided) 
  //   {
  //     collided = true;
  //   }
  // })

  if(collide(testCharge.returned, shape.returned) && !collided) 
  {
    collided = true;
  }

  if(collided) 
  {
    strokeColor = "rgb(255,0,0)";
  }
  else 
  {
    strokeColor = "rgb(0,0,0)";
  }

  displayFrameRate()

}




function displayFrameRate()
{
    if (frameCount % 20 == 0) 
    {
        currentFrameRate = frameRate();
    }
    push();
        noStroke();
        fill(0);
        textSize(20);
        text(round(currentFrameRate), width - 125, 25);
    pop();
}




class Shape
{
  constructor(points)
  {
    points.forEach(point => {
      point.x += 100;
      point.y += 100;
    });
    this.points = points;
    this.sides = []; // [[{x,y},{x,y}], ...]
    this.max = {x:0, y:0};
    this.min = {x:Infinity, y:Infinity};

    this.returned;

    //console.log(this.points);
  }

  display()
  {
    this.sides = []; // [[{x,y},{x,y}], ...]
    this.max = {x:0, y:0};
    this.min = {x:Infinity, y:Infinity};

    stroke(strokeColor);
    strokeWeight(2); 
    beginShape();
    for(let i = 0; i < this.points.length; i++) 
    {
      //console.log("asdf: " + this.points[i].x);
      let px = this.points[i].x;
      let py = this.points[i].y;
      if(i === 0) 
      {
        vertex(px, py);
      }
      else 
      {
        vertex(px , py);
        this.sides.push([{x: this.points[i-1].x, y: this.points[i-1].y}, {x: px, y: py}])
      }
      if(px > this.max.x) {this.max.x = px;}
      if(py > this.max.y) {this.max.y = py;}
      if(px < this.min.x) {this.min.x = px;}
      if(py < this.min.y) {this.min.y = py;}

 
    }

      
    endShape();

    this.returned =  {p:this.points, n:this.sides, max: this.max, min: this.min}
  }
    
}







class Polygon
{
  constructor(x, y, radius, numberOfSides) 
  {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.numberOfSides = numberOfSides;

    this.points = [];
    this.sides = []; // [[{x,y},{x,y}], ...]
    this.max = {x:0, y:0};
    this.min = {x:Infinity, y:Infinity};
    this.a = Math.PI * 3/2;

    this.returned;
  }


    
  display()
  {
      this.points = [];
      this.sides = []; // [[{x,y},{x,y}], ...]
      this.max = {x:0, y:0};
      this.min = {x:Infinity, y:Infinity};

      stroke(strokeColor);
      strokeWeight(2); 
      beginShape();
      for(let i = 0; i <= this.numberOfSides; i++) 
      {
          let px = this.x + this.radius * Math.cos(this.a);
          let py = this.y + this.radius * Math.sin(this.a);
          if(i === 0) 
          {
              vertex(px, py);
          }
          else 
          {
              vertex(px , py);
              this.sides.push([{x: this.points[i-1].x, y: this.points[i-1].y}, {x: px, y: py}])
          }
          if(px > this.max.x) {this.max.x = px;}
          if(py > this.max.y) {this.max.y = py;}
          if(px < this.min.x) {this.min.x = px;}
          if(py < this.min.y) {this.min.y = py;}

          this.points.push({x: px,y:py});
          this.a += Math.PI * 2 / this.numberOfSides;
      }
      this.points.pop();
      
      endShape();

      this.returned =  {p:this.points, n:this.sides, max: this.max, min: this.min}
  }

  

  
}

function collide(p1,p2) 
{
  for(let i in p1.n) 
  {
    for(let j in p2.n) 
    {
        let t = intersect(p1.n[i],p2.n[j]);
      if(t === 'collinear') {continue;}
      if(t[0] <= 1 && t[0] >= 0 && t[1] <= 1 && t[1] >= 0) 
      {
        return true;
      }
    }
  }
  return false;
}


function intersect(s1,s2) 
{
  if(((s2[1].x - s2[0].x)*(s1[0].y - s1[1].y) - (s1[0].x - s1[1].x)*(s2[1].y - s2[0].y)) === 0) 
  {
    return 'collinear';
  }
  let tA =  ((s2[0].y - s2[1].y) * (s1[0].x - s2[0].x) + (s2[1].x - s2[0].x) * (s1[0].y - s2[0].y))/
            ((s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) - (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y)),
      tB =  ((s1[0].y - s1[1].y) * (s1[0].x - s2[0].x) + (s1[1].x - s1[0].x) * (s1[0].y - s2[0].y))/
            ((s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) - (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y));
  return [tA, tB];
}




















