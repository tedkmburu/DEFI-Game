'use strict';

function createCharge(position, charge)
{
  charges.push(new Charge(position.x, position.y, charge))
}

function displaySlider() 
{
  let aChargeIsSelected = charges.some(charge => charge.selected);
  if (aChargeIsSelected) 
  {
    slider.style("visibility", "visible");
    slider.visibility = "visible";
  }
  else
  {
    slider.style("visibility", "hidden");  
    slider.visibility = "hidden";
    
  }
  
}

function displayCharges()
{
  charges.forEach(charge => 
  {
    charge.display();
  });
}

function removeCharge(i)
{
  charges[i].selected = false;
  slider.style("visibility", "hidden");

  charges.splice(i,1);
}

function removeAllCharges()
{
  var times = charges.length;
  for (var i = times - 1; i >= 0; i--)
  {
    removeCharge(i);
  }
  charges = [];
  fieldLines = [];
  fieldLineArrows = [];
  points = [];
}

function sliderChanged()
{
  createFieldLines(); 
}

class Charge
{
  constructor(x, y, charge)
  {
    this.x = x;
    this.y = y;
    this.position = createVector(x,y);
    this.charge = charge || 0;
    this.selected = true;
    this.dragging = false;

    
  }


  display()
  {
    let charge = this;
    
    push();
      strokeWeight(2);
      if (charge.selected)
      {
        stroke(255);
        charge.charge = slider.value();
      }
      else
      {
        noStroke();
      }

      if (charge.charge > 0){ fill(chargeColor.positive); }
      else if (charge.charge == 0){ fill(chargeColor.neutral); }
      else { fill(chargeColor.negative); }
      ellipse(charge.x, charge.y, chargeDiameter, chargeDiameter);

      textSize(16);
      if (charge.charge > 0){ fill(textColor.positive); }
      else if (charge.charge == 0){ fill(textColor.neutral); }
      else { fill(textColor.negative); }
      noStroke();
      if (charge.charge > 0)
      {
        text(`+${charge.charge}`, charge.x, charge.y + 7);
      }
      else
      {
        text(charge.charge, charge.x, charge.y + 7);
      }
    pop();
  }
  
}
