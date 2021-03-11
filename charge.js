
function createCharge(position, charge)
{
  charges.push(new Charge(position.x, position.y, charge))
}

function displaySlider() 
{
  // let aChargeIsSelected = charges.some(charge => charge.selected);
  // if (aChargeIsSelected) 
  // {
  //   slider.style("visibility", "visible");
  //   slider.visibility = "visible";
  // }
  // else
  // {
  //   slider.style("visibility", "hidden");  
  //   slider.visibility = "hidden";
  // }
  
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
  charges[i].slider.style("visibility", "hidden");
  charges[i].slider.remove();
  // slider.style("visibility", "hidden");

  charges.splice(i,1);

  createFieldLines();
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

function deselectAllCharges()
{
  charges.forEach(charge => {
    charge.selected = false; 
  })
}

function deleteSelectedCharge()
{
  charges.forEach((charge, i) => {
    if (charge.selected) 
    {
      removeCharge(i)
    }
  })
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


    this.slider = createSlider(-5, 5, charge, 1);
    this.slider.style("zIndex", "999");
    this.slider.style("visibility", "hidden");
    this.slider.addClass("slider");
    //this.slider.mouseMoved(sliderChanged);
    this.slider.input(sliderChanged);
    this.slider.changed(sliderChanged);
    
  }


  display()
  {
    let charge = this;
    
    push();
      strokeWeight(2);
      if (charge.selected)
      {
        stroke(255);
        
        charge.charge = charge.slider.value();
        charge.slider.position(charge.x - 75, charge.y + (chargeDiameter / 2) + 10, "fixed");

        if (charge.dragging) 
        {
          charge.slider.style("visibility", "hidden");
        }
        else
        {
          charge.slider.style("visibility", "visible");
        }
        
      }
      else
      {
        noStroke();
        charge.slider.style("visibility", "hidden");
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
