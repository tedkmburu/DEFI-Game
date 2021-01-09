let strokeColor = "rgb(0,0,0)";
let testCharge;
let shape;
let shapes = [];
let off = {x: 0, y: 0}

let collided = false;

function preload() 
{
    spaceFont = loadFont('fonts/Anurati.otf');
    fontRegular = loadFont('fonts/Helvetica.ttf');

    backgroundImages = [loadImage('images/background1.png'), loadImage('images/background2.jpg'), loadImage('images/background3.jpg'), loadImage('images/background4.jpg')];
    homeTrack = loadImage('images/homeTrack.png');
    blueprint = loadImage('images/blueprint.png');

    icon = {
        redo: loadImage('images/redo.png'), 
        star: loadImage('images/star.png'), 
        starEmpty: loadImage('images/starEmpty.png'), 
        delete: loadImage('images/delete.png'), 
        circle: loadImage('images/circle.png'), 
        back: loadImage('images/back.png'), 
        edit: loadImage('images/edit.png'), 
        help: loadImage('images/help.png'), 
        lock: loadImage('images/lock.png'), 
        play: loadImage('images/play.png')
    };

    trackImages = [
        {play: loadImage('images/tracks/track1.png'), build: loadImage('images/tracks/track1build.png')},
        {play: loadImage('images/tracks/track2.png'), build: loadImage('images/tracks/track2build.png')},
        {play: loadImage('images/tracks/track3.png'), build: loadImage('images/tracks/track3build.png')},
        {play: loadImage('images/tracks/track4.png'), build: loadImage('images/tracks/track4build.png')},
        //{play: loadImage('images/tracks/track5.png'), build: loadImage('images/tracks/track5build.png')},
    ]
}


function setup() 
{
  currentLevelGroup = 0;

  createCanvas(windowWidth, windowHeight)

  createLevels(); 
  testCharge = new Polygon(width/2, height/2, 5, 10)
  // points, level, scale, offset, locked
  for (let i = 0; i < levels.length; i++) 
  {
    shapes.push(new Shape(levels[currentLevelGroup].points, i, 1, levels[currentLevelGroup].trackOffset, "locked"));
  }
  
  



  frameRate(60);
}


function draw() 
{
  background(255/2)

  shapes[currentLevelGroup].display();

  


  collided = false;

  testCharge.x = mouseX;
  testCharge.y = mouseY;


  testCharge.display();


  if(collide(testCharge.returned, shapes[currentLevelGroup].returned) && !collided) 
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


function mouseClicked()
{
  console.log("{x: " + Math.round(mouseX - levels[currentLevelGroup].trackOffset.x) + ", y: " + Math.round(mouseY - levels[currentLevelGroup].trackOffset.y) + "}");
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
  constructor(points, level, scale, offset, locked)
  {
    
    this.level = level;
    this.scale = scale || 1;
    this.offset = offset || createVector(0,0);
    this.locked = locked;

    points.forEach(point => {
      point.x += levels[this.level].trackOffset.x;
      point.y += levels[this.level].trackOffset.y;
    });
    this.points = points;

    this.sides = [];
    this.max = {x:0, y:0};
    this.min = {x:Infinity, y:Infinity};




    for(let i = 1; i < this.points.length; i++) 
    {
      let px = this.points[i].x;
      let py = this.points[i].y;

      this.sides.push([{x: this.points[i-1].x, y: this.points[i-1].y}, {x: px, y: py}])
      
      if(px > this.max.x) {this.max.x = px;}
      if(py > this.max.y) {this.max.y = py;}
      if(px < this.min.x) {this.min.x = px;}
      if(py < this.min.y) {this.min.y = py;}
    }

    this.returned =  {p:this.points, n:this.sides, max: this.max, min: this.min}

  }

  display()
  {
    image(tracks[this.level].build, levels[this.level].trackOffset.x, levels[this.level].trackOffset.y, levels[this.level].dimentions.x , levels[this.level].dimentions.y);
    
    push()
      noFill()
      stroke(strokeColor);
      strokeWeight(2); 
      beginShape();
        for(let i = 0; i < this.points.length; i++) 
        {
          let x = this.points[i].x;
          let y = this.points[i].y;

          vertex(x, y);
        }
      endShape();
    pop()
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




















