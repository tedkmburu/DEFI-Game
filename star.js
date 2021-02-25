'use strict';
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
        //   ellipse(position.x - starRadius, position.y - starRadius, starDiameter, starDiameter);
        // pop()
        push();
        

        
        
        //ellipse(position.x, position.y, starDiameter, starDiameter);

        translate(position.x - starRadius, position.y - starRadius);
        rotate(rotateAngle);
        //image(icon.portal2, -portalDiameter, -portalDiameter, portalDiameter * 2, portalDiameter * 2);

        image(icon.star, -starRadius, -starRadius, starDiameter, starDiameter)
        
        pop();
        
    }
  }
  
}
