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
    
    if (!star.collected)
    {
        push();
        //let color = (gameMode == "Play")
        let color = "yellow";

        fill(color);
        noStroke();
        //ellipse(position.x, position.y, starDiameter, starDiameter);
        image(icon.star, position.x - starRadius - 2, position.y - starRadius - 2, starDiameter + 4, starDiameter + 4)
        pop();
    }
  }
  
}
