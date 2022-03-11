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


class Track
{
  constructor(points, level, scale, offset, locked)
  {
    this.level = level;
    this.scale = scale || 1;
    this.offset = offset || createVector(0,0);
    this.locked = locked;

    points.forEach(point => {
      point.x += this.offset.x;
      point.y += this.offset.y;
    });
    this.points = levels[level].points;

    this.sides = [];
    this.max = {x: 0, y: 0};
    this.min = {x: Infinity, y: Infinity};

    this.finishLines = levels[level].finishLines;

    this.finishLines.forEach(finishLine => {
      finishLine.x += this.offset.x;
      finishLine.y += this.offset.y;
    });
    

    
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
    //image(tracks[this.level].build, levels[this.level].trackOffset.x  * this.scale  + this.offset.x, levels[this.level].trackOffset.y  * this.scale  + this.offset.y, levels[this.level].dimentions.x * this.scale, levels[this.level].dimentions.y * this.scale);
   
    if(gameMode == "Play")
    {
        image(trackImages[this.level].play, this.offset.x * this.scale, this.offset.y * this.scale, levels[this.level].dimentions.x * this.scale, levels[this.level].dimentions.y * this.scale);
    }
    else
    {
        image(trackImages[this.level].build, this.offset.x * this.scale, this.offset.y * this.scale, levels[this.level].dimentions.x * this.scale, levels[this.level].dimentions.y * this.scale);
    }

    push()
      noFill()
      stroke("red");
      strokeWeight(2); 
      beginShape();
        for(let i = 0; i < this.points.length; i++) 
        {
          let x = this.points[i].x;
          let y = this.points[i].y;

          //vertex(x, y);
        }
      endShape();

      this.finishLines.forEach(finishLine => {
        let fl = finishLine;
        //rect(fl.x, fl.y, fl.width, fl.height)
      })

      
    pop()
  }
    
}



function createTracks()
{
  for (let i = 0; i < levels.length; i++) 
  {
    let level = levels[i];

    
    
    let xValues = level.points.map(function(value) { return value.x; });
    let yValues = level.points.map(function(value) { return value.y; });

    let trackWidth = Math.max(...xValues) - Math.min(...xValues);
    let trackHeight = Math.max(...yValues) - Math.min(...yValues);

    level.dimentions = createVector(trackWidth, trackHeight)
    level.trackOffset = createVector((width/2) - (trackWidth / 2), (height/2) - (trackHeight / 2))

    allTracks.push(new Track(level.points, i, 1, level.trackOffset));

    level.portals.forEach(portal => {
      portal.in.add(levels[currentLevel].trackOffset);
      portal.out.add(levels[currentLevel].trackOffset);
    })
    
  }

  track = allTracks[currentLevel];
}






function changeTrack(i)
{
  removeAllCharges();
  
  

  let level = levels[i];
  track = allTracks[i];

  testCharges = [];
  level.testChargeStartingPositions.forEach((startingPosition, j) => {
    let thisTestChargeCharge = (startingPosition.z != 0) ? testChargeCharge * -1 : testChargeCharge;

    testCharges[j] = new TestCharge(startingPosition, startingPosition, thisTestChargeCharge);
  })

  

  stars = [];
  levels[i].starPositions.forEach(starPosition => 
  {
      stars.push(new Star( p5.Vector.add(starPosition, level.trackOffset)));
  });

  timeElapsed = 0;  // sets elapsed time back down to 0. This is the time seen at the top of the "Level" screen
}

function displayTrack()
{
    track.display();
}






































// class Track
// {
//     constructor(level, scale, offset, locked)
//     {
//         this.level = level;
//         this.scale = scale || 1;
//         this.offset = offset || createVector(0,0);
//         this.locked = locked;
//     }


//     display()
//     {
//         levels[this.level].shapes.forEach(shape =>
//         {
//             let color;
//             if (currentScreen == "Level Select" || currentScreen == "Group Select")
//             {
//                 if (shape.type == "track") 
//                 {
//                     color = this.locked ? 25 : 255;
//                 }
//                 else if (shape.type == "remove") 
//                 {
//                     color = 0;
//                 }
//                 else if (shape.type == "finish") 
//                 {
//                     color = this.locked ? 25 : "grey";
//                 }
//                 else
//                 {
//                     color = "red";
//                 }
//             }
//             else
//             {
//                 if (shape.type == "track") 
//                 {
//                     color = (gameMode == "Play") ? 200 : "grey";
//                 }
//                 else if (shape.type == "remove") 
//                 {
//                     color = (gameMode == "Play") ? 0 : "#37474F";
//                 }
//                 else if (shape.type == "finish") 
//                 {
//                     color = (gameMode == "Play") ? "grey" : 200;
//                 }
//                 else
//                 {
//                     color = "red";
//                 }
//             }
            


//             push()
//                 stroke(color);
//                 noFill();
//                 if (shape.shape == "Rect") 
//                 {
//                     rect(shape.x * this.scale + this.offset.x, shape.y * this.scale + this.offset.y, shape.width * this.scale, shape.height * this.scale);
//                 }
//                 else if (shape.shape == "Circle") 
//                 {
//                     ellipse(shape.x * this.scale + this.offset.x, shape.y * this.scale + this.offset.y, shape.radius * 2 * this.scale, shape.radius * 2 * this.scale);
//                 }
//                 else
//                 {
//                     console.error("Not a shape");
//                 }
//             pop();


//             // if (currentScreen == "Level Select")
//             // {
//             //     let position = p5.Vector.add(levels[this.level].testChargeStartingPosition, this.offset);
//             //     fill("red");
//             //     noStroke();
//             //     ellipse(position.x, position.y, 5, 5);
//             // }
//         });
//     }
// }


