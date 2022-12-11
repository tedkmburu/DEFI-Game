
function displayStars()
{
    for (var i = 0; i < stars.length; i++)
    {
        stars[i].display();
    }
}

class Star
{
  constructor(position, collected)
  {
    this.position = position;
    this.collected = false;
  }


  display()
  {
    let star = this;
    let position = this.position;

    let rotateAngle = timeElapsed / 25;
    
    if (!star.collected)
    {
        // push()
        //   noStroke();
        //   let color = "yellow";
        //   fill(color)
        //   ellipse(position.x, position.y, starDiameter, starDiameter);
        // pop()
        push();
        

        
        
        //ellipse(position.x, position.y, starDiameter, starDiameter);

        translate(position.x, position.y);
        rotate(rotateAngle);
        //image(icon.portal2, -portalDiameter, -portalDiameter, portalDiameter * 2, portalDiameter * 2);
        imageMode(CENTER);
        image(icon.star, 0, 0, starDiameter, starDiameter)
        
        pop();
        
    }
  }
  
}
