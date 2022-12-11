
// function getFieldLinePoints(x, y, baseCharge)
// {
//   let position = createVector(x,y);
//   let forceVector = netForceAtPoint(position);
//   forceVector.setMag(chargeRadius);


//   let forceVectorFinalPosition = p5.Vector.add(forceVector, position);
//   let vectorToChargeDistance = p5.Vector.dist(forceVectorFinalPosition, charges[0].position);


//   let startingPointIsInsideCharge = false;
//   let i = 0;
//   let chargesLength = charges.length;
//   for (i; i < chargesLength; i++)
//   {
//     let distanceFromEndOfVectorToCharge = p5.Vector.dist(position, charges[i].position);
//     if (distanceFromEndOfVectorToCharge < (chargeRadius) && charges[i].charge != 0)
//     {
//       startingPointIsInsideCharge = true;
//     }
//   }


//   if (!startingPointIsInsideCharge && vectorToChargeDistance < windowSize)
//   {
//     try
//     {
//       points.push(position);
//       getFieldLinePoints(forceVectorFinalPosition.x, forceVectorFinalPosition.y, baseCharge);
//     }
//     catch (e)
//     {
//       //console.log(e);
//     }
//   }
//   else
//   {
//     points.unshift(charges[baseCharge].position);

//     let chargeDistances = [];
//     for (let i = 0; i < charges.length; i++)
//     {
//       chargeDistances.push(charges[i].position.dist(points[points.length - 1]));
//     }
//     let closestChargeDistance = Math.min(...chargeDistances);

//     for (let i = 0; i < chargeDistances.length; i++)
//     {
//       if (chargeDistances[i] == closestChargeDistance && closestChargeDistance < 100)
//       {
//         let halfWayPoint = points[points.length - 1].add(charges[i].position).div(2);
//         points.push(halfWayPoint);

//         halfWayPoint = points[points.length - 1].add(charges[i].position).div(2);
//         points.push(halfWayPoint);

//         points.push(p5.Vector.add(charges[i].position, createVector(1, 0)));
//       }
//     }

//     fieldLines.push(new FieldLine(points));
//     points = [];
//   }
// }



// function createFieldLines()
// {
//   fieldLines = [];
//   let chargesLength = charges.length;
//   charges.forEach((charge, i) => 
//   {
//     //console.log(i);
//     fieldLines[i] = [];


//     let radius = chargeRadius + 1;
//     let times = Math.abs(charge.charge) * fieldLinesPerCoulomb;
//     let origin = charge.position;


//     let point = createVector(0, radius);
//     for (let a = 0; a < times; a++)
//     {
//       getFieldLinePoints(point.x + origin.x, point.y + origin.y, i);
//       point.rotate(360/times);
//     }
//   });


//   fieldLineArrows = [];
//   let i = 0;
//   let fieldLinesLength = fieldLines.length;
//   fieldLines.forEach((fieldLine, i) =>
//   {
//     if (fieldLine.length != 0)
//     {
//       for (let s = 0; s < fieldLine.fieldLinePoints.length; s+=10)
//       {
//         let arrowPosition = fieldLine.fieldLinePoints[s];
//         let arrowAngle = netForceAtPoint(arrowPosition).heading();
//         // if (charges[i].charge != 0 && !noPositiveCharges)
//         // {
//           fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle + 180));
//         // }
//         // else
//         // {
//         //   fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle));
//         // }
//       }
//     }
//   });
//   // for (i; i < fieldLinesLength; i++)
//   // {
//   //     if (fieldLines[i] != null)
//   //     {
//   //       for (let s = 0; s < fieldLines[i].fieldLinePoints.length; s+=10)
//   //       {
//   //         let arrowPosition = fieldLines[i].fieldLinePoints[s];
//   //         let arrowAngle = netForceAtPoint(arrowPosition).heading();
//   //         if (charges[i].charge != 0 && !noPositiveCharges)
//   //         {
//   //           fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle + 180));
//   //         }
//   //         else
//   //         {
//   //           fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle));
//   //         }
//   //       }
//   //     }
    
//   // }
// }


// function displayFieldLines()
// {

//   for (let i = 0; i < fieldLines.length; i++)
//   {
//     try
//     {
//       if (fieldLines[i] != null)
//       {
//         fieldLines[i].display();
//       }

//     }
//     catch (e)
//     {
//       //console.log(i);
//     }
//     finally
//     {

//     }
//   }
//   for (let i = 0; i < fieldLineArrows.length; i++)
//   {
//     fieldLineArrows[i].display();
//   }
// }



// class FieldLine
// {
//     constructor(fieldLinePoints)
//     {
//       this.fieldLinePoints = fieldLinePoints;
//     }
//     display()
//     {
//       if (this.fieldLinePoints.length > 0)
//       {
//         beginShape();
//         //beginShape(POINTS);
//         noFill();
//         stroke(255);
//         for (let i = 0; i < this.fieldLinePoints.length; i++)
//         {
//             curveVertex(this.fieldLinePoints[i].x, this.fieldLinePoints[i].y);
//         }
//         endShape();
//       }


//     }
// }


// class FieldLineArrow
// {
//     constructor(position, direction)
//     {
//       this.position = position;
//       this.direction = direction + 180;
//     }
//     display()
//     {
//       push();
//         stroke(255);
//         translate(this.position.x, this.position.y)
//         rotate(this.direction);
//         fill(255);
//         triangle(0, 0, -10, -5, -10, 5);
//       pop();
//     }
// }





// let points = [];
// let fieldLines = [];
// let fieldLineArrows = [];
// let fieldLinesPerCoulomb = 4;
// let prevoiusFinalVector, finalVector;
// let noPositiveCharges = true;
let prevoiusFinalVector = null;
let finalVector;
function getFieldLinePoints(x, y, lineOrigin)
{
  let chargeSize = chargeRadius;
  let position = createVector(x,y);
  forceVector = netForceAtPoint(position);

  forceVector.setMag(chargeSize/2);

  noPositiveCharges = true;
  charges.forEach(charge => {
    if (charge.charge > 0) 
    {
      noPositiveCharges = false;  
    }
  })

  if (noPositiveCharges)
  {
    forceVector.mult(-1);
  }
  // if (charges[lineOrigin.charge].charge < 0)
  // {
  //   forceVector.mult(-1);
  // }

  let differenceInVectorAngles = null;
  let mag;
  if (prevoiusFinalVector != null)
  {
    let minVectorSize = 3;
    let maxVectorSize = chargeSize/2;

    //differenceInVectorAngles = Math.abs(degrees(prevoiusFinalVector.angleBetween(forceVector)));
    differenceInVectorAngles = Math.abs(degrees(prevoiusFinalVector.angleBetween(forceVector)));

    mag = maxVectorSize * Math.pow(0.97, differenceInVectorAngles);
    mag = constrain(mag, minVectorSize ,maxVectorSize)
    forceVector.setMag(mag);
  }

  let forceVectorFinalPosition = p5.Vector.add(forceVector, position);

  let vectorToChargeDistance = p5.Vector.dist(forceVectorFinalPosition, charges[0].position);

  let startingPointIsInsideNegativeCharge = false;
  for (let i = 0; i < charges.length; i++)
  {

    let distanceFromVectorToCharge = p5.Vector.dist(position, charges[i].position);
    //if (distanceFromVectorToCharge < (chargeSize/2) && charges[i].charge != 0 && i != lineOrigin.charge)
    if (distanceFromVectorToCharge < (chargeSize) && charges[i].charge != 0)
    {
      startingPointIsInsideNegativeCharge = true;
    }
  }

  let windowSize = createVector(width, height).mag();

  //if (!startingPointIsInsideNegativeCharge && vectorToChargeDistance < windowSize && differenceInVectorAngles >= 1 && differenceInVectorAngles <= 175)
  if (!startingPointIsInsideNegativeCharge && vectorToChargeDistance < windowSize)
  {
    try
    {
      points.push(position);
      getFieldLinePoints(forceVectorFinalPosition.x, forceVectorFinalPosition.y, {charge: lineOrigin.charge, origin: lineOrigin.origin});
    }
    catch (e)
    {
      console.log(e);
    }
  }
  else
  {
    points.unshift(charges[lineOrigin.charge].position);

    let chargeDistances = [];
    for (let i = 0; i < charges.length; i++)
    {
      chargeDistances.push(charges[i].position.dist(points[points.length - 1]));
    }
    let closestChargeDistance = Math.min(...chargeDistances);

    for (let i = 0; i < chargeDistances.length; i++)
    {
      if (chargeDistances[i] == closestChargeDistance && closestChargeDistance < 100)
      {
        let halfWayPoint = points[points.length - 1].add(charges[i].position).div(2);
        points.push(halfWayPoint);

        halfWayPoint = points[points.length - 1].add(charges[i].position).div(2);
        points.push(halfWayPoint);

        points.push(p5.Vector.add(charges[i].position, createVector(1, 0)));
      }
    }

    fieldLines[lineOrigin.charge][lineOrigin.origin] = new FieldLine(points);
    points = [];
  }
}



function createFieldLines()
{
  fieldLines = [];
  for (let i = 0; i < charges.length; i++)
  {
    fieldLines[i] = [];

    let radius = 15;
    let times = Math.abs(charges[i].charge) * fieldLinesPerCoulomb;
    let origin = charges[i].position;

    let point = createVector(radius,radius);
    for (let a = 0; a < times; a++)
    {
      getFieldLinePoints(point.x + origin.x, point.y + origin.y, {charge: i, origin: a});

      point = p5.Vector.add(point, createVector(0,0));
      point.rotate(362/times);
    }
  }

  fieldLineArrows = [];
  for (let i = 0; i < fieldLines.length; i++)
  {
    for (let a = 0; a < fieldLines[i].length; a++)
    {
      if (fieldLines[i][a] != null)
      {
        for (let s = 25; s < fieldLines[i][a].fieldLinePoints.length; s+=25)
        {
          let arrowPosition = fieldLines[i][a].fieldLinePoints[s];
          let arrowAngle;

          if (charges[i].charge > 0) 
          {
            arrowAngle = netForceAtPoint(arrowPosition).mult(-1).heading();
          }
          else
          {
            arrowAngle = netForceAtPoint(arrowPosition).heading();
          }
          
          if (charges[i].charge != 0 && !noPositiveCharges)
          {
            fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle + 180));
          }
          else
          {
            fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle));
          }
        }
      }
    }
  }
}


function displayFieldLines()
{
  //onsole.log("asdf");
  for (let i = 0; i < fieldLines.length; i++)
  {
    for (let a = 0; a < fieldLines[i].length; a++)
    {
      try
      {
        if (fieldLines[i][a] != null)
        {
          //console.log(fieldLines[i][a]);
          fieldLines[i][a].display();
        }

      }
      catch (e)
      {
        console.log(e);
      }
      finally
      {

      }

    }
  }
  for (let i = 0; i < fieldLineArrows.length; i++)
  {
    fieldLineArrows[i].display();
  }
}



class FieldLine
{
  constructor(fieldLinePoints)
  {
    this.fieldLinePoints = fieldLinePoints;

    this.display = function()
    {
      if (this.fieldLinePoints.length > 0)
      {
        beginShape();
        //beginShape(POINTS);
          noFill();
          stroke(255);
          for (let i = 0; i < this.fieldLinePoints.length; i++)
          {
            curveVertex(this.fieldLinePoints[i].x, this.fieldLinePoints[i].y);
          }
        endShape();
      }


    }
  }
}


class FieldLineArrow
{
  constructor(position, direction)
  {
    this.position = position;
    this.direction = direction;

    this.display = function()
    {
      push();
        stroke(255);
        translate(position.x, position.y)
        rotate(direction);
        fill(255);
        triangle(0, 0, -10, -5, -10, 5);
      pop();
    }
  }
}






// let noPositiveCharges = false;

// function getFieldLinePoints(x, y, lineOrigin)
// {
//   let position = createVector(x,y);
//   let forceVector = netForceAtPoint(position);

//   forceVector.setMag(chargeDiameter/2);


//   let forceVectorFinalPosition = p5.Vector.add(forceVector, position);


//   let vectorToChargeDistance = p5.Vector.dist(forceVectorFinalPosition, charges[0].position);

//   let startingPointIsInsideNegativeCharge = false;
//   for (let i = 0; i < charges.length; i++)
//   {
//     let distanceFromVectorToCharge = p5.Vector.dist(position, charges[i].position);
//     //if (distanceFromVectorToCharge < (chargeDiameter/2) && charges[i].charge != 0 && i != lineOrigin.charge)
//     if (distanceFromVectorToCharge < (chargeDiameter/2) && charges[i].charge != 0)
//     {
//       startingPointIsInsideNegativeCharge = true;
//     }
//   }

//   let windowSize = createVector(width, height).mag();

//   //if (!startingPointIsInsideNegativeCharge && vectorToChargeDistance < windowSize && differenceInVectorAngles >= 1 && differenceInVectorAngles <= 175)
//   if (!startingPointIsInsideNegativeCharge && vectorToChargeDistance < windowSize)
//   {
//     try
//     {
//       points.push(position);
//       getFieldLinePoints(forceVectorFinalPosition.x, forceVectorFinalPosition.y, {charge: lineOrigin.charge, origin: lineOrigin.origin});
//     }
//     catch (e)
//     {
//       //console.log(e);
//     }
//   }
//   else
//   {
//     points.unshift(charges[lineOrigin.charge].position);

//     let chargeDistances = [];
//     for (let i = 0; i < charges.length; i++)
//     {
//       chargeDistances.push(charges[i].position.dist(points[points.length - 1]));
//     }
//     let closestChargeDistance = Math.min(...chargeDistances);

//     for (let i = 0; i < chargeDistances.length; i++)
//     {
//       if (chargeDistances[i] == closestChargeDistance && closestChargeDistance < 100)
//       {
//         let halfWayPoint = points[points.length - 1].add(charges[i].position).div(2);
//         points.push(halfWayPoint);

//         halfWayPoint = points[points.length - 1].add(charges[i].position).div(2);
//         points.push(halfWayPoint);

//         points.push(p5.Vector.add(charges[i].position, createVector(1, 0)));
//       }
//     }

//     fieldLines[lineOrigin.charge][lineOrigin.origin] = new FieldLine(points);
//     points = [];
//   }
// }



// function createFieldLines()
// {
//   fieldLines = [];
//   for (let i = 0; i < charges.length; i++)
//   {
//       fieldLines[i] = [];

//       let radius = 15;
//       let times = Math.abs(charges[i].charge) * fieldLinesPerCoulomb;
//       let origin = charges[i].position;

//       let point = createVector(radius,radius);
//       for (let a = 0; a < times; a++)
//       {
//         getFieldLinePoints(point.x + origin.x, point.y + origin.y, {charge: i, origin: a});

//         point = p5.Vector.add(point, createVector(0,0));
//         point.rotate(361/times);
//       }
//   }

//   fieldLineArrows = [];
//   for (let i = 0; i < fieldLines.length; i++)
//   {
//     for (let a = 0; a < fieldLines[i].length; a++)
//     {
//       if (fieldLines[i][a] != null)
//       {
//         for (let s = 0; s < fieldLines[i][a].fieldLinePoints.length; s+=10)
//         {
//             let arrowPosition = fieldLines[i][a].fieldLinePoints[s];
//             let arrowAngle = netForceAtPoint(arrowPosition).heading();
//           if (charges[i].charge != 0 && !noPositiveCharges)
//           {
//             fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle + 180));
//           }
//           else
//           {
//             fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle));
//           }
//         }
//       }
//     }
//   }
// }


// function displayFieldLines()
// {

//   for (let i = 0; i < fieldLines.length; i++)
//   {
//     for (let a = 0; a < fieldLines[i].length; a++)
//     {
//       try
//       {
//         if (fieldLines[i][a] != null)
//         {
//           fieldLines[i][a].display();
//         }

//       }
//       catch (e)
//       {

//       }
//       finally
//       {

//       }

//     }
//   }
//   for (let i = 0; i < fieldLineArrows.length; i++)
//   {
//     fieldLineArrows[i].display();
//   }
// }



// class FieldLine
// {
//     constructor(fieldLinePoints)
//     {
//       this.fieldLinePoints = fieldLinePoints;
//     }
//     display()
//     {
//       if (this.fieldLinePoints.length > 0)
//       {
//         beginShape();
//         //beginShape(POINTS);
//         noFill();
//         stroke(255);
//         for (let i = 0; i < this.fieldLinePoints.length; i++)
//         {
//             curveVertex(this.fieldLinePoints[i].x, this.fieldLinePoints[i].y);
//         }
//         endShape();
//       }


//     }
// }


// class FieldLineArrow
// {
//     constructor(position, direction)
//     {
//       this.position = position;
//       this.direction = direction + 180;
//     }
//     display()
//     {
//       push();
//         stroke(255);
//         translate(this.position.x, this.position.y)
//         rotate(this.direction);
//         fill(255);
//         triangle(0, 0, -10, -5, -10, 5);
//       pop();
//     }
// }
