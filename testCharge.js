'use strict';
function displayTestCharges()
{
    for (var i = 0; i < testCharges.length; i++)
    {
        testCharges[i].display();
        testCharges[i].move();
        
    }
}

function checkCollision(shapeOne, shapeTwo)
{
    let shapeOnePosition = createVector(shapeOne.position.x, shapeOne.position.y);
    let shapeTwoPosition = createVector(shapeTwo.position.x, shapeTwo.position.y);

    if (shapeOne.shape == "Point")
    {
        if (shapeTwo.shape == "Circle")
        {
            let pointToCircleDistance = shapeOnePosition.dist(shapeTwoPosition);

            if (pointToCircleDistance < shapeTwo.radius) 
            {
                return true;
            }
            return false;
        }
        if (shapeTwo.shape == "Rect")
        {
            if (shapeOnePosition.x >= shapeTwoPosition.x && 
                shapeOnePosition.x <= shapeTwoPosition.x + shapeTwo.width && 
                shapeOnePosition.y >= shapeTwoPosition.y && 
                shapeOnePosition.y <= shapeTwoPosition.y + shapeTwo.height) 
            {
                return true;
            }
            return false;
        }
        console.error("Shape not defined");
        return false;
    }

    if (shapeOne.shape == "Circle")
    {
        if (shapeTwo.shape == "Circle")
        {
            let circleToCircleDistance = p5.Vector.dist(shapeOnePosition, shapeTwoPosition);
            
            if (circleToCircleDistance < shapeOne.radius + shapeTwo.radius) 
            {
                return true;
            }
            return false;
        }
        if (shapeTwo.shape == "Rect")
        {
            if (shapeOnePosition.x - shapeOne.radius > shapeTwoPosition.x && 
                shapeOnePosition.x + shapeOne.radius < shapeTwoPosition.x + shapeTwo.width && 
                shapeOnePosition.y - shapeOne.radius > shapeTwoPosition.y && 
                shapeOnePosition.y + shapeOne.radius < shapeTwoPosition.y + shapeTwo.height) 
            { 
                return true;
            }
            return false;
        }
        console.error("Shape not defined");
        return false;
    }
}


class TestCharge
{
    constructor(position, charge)
    {
        this.position = createVector(position.x, position.y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);

        this.opacity = 1;
        this.moving = true;
        this.trail = [];
        this.trajectory = [];
        this.frames = 0;
        this.charge = charge;

        if (this.charge != 0)
        {
            this.color = (this.charge > 0)? "rgba(211, 47, 47, 1)" : "rgba(25, 118, 210, 1)";
        }
        else
        {
            this.color = "rgba(50,50,50,1)";
        }


        this.numberOfSides = 10;

        this.points = [];
        this.sides = []; // [[{x,y},{x,y}], ...]
        this.max = {x:0, y:0};
        this.min = {x:Infinity, y:Infinity};
        this.a = Math.PI * 3/2;

        this.returned;
    }



    display()
    {
        let testCharge = this;

        this.points = [];
        this.sides = []; // [[{x,y},{x,y}], ...]
        this.max = {x:0, y:0};
        this.min = {x:Infinity, y:Infinity};  

        


        push();
            noStroke();
            fill(255);
            testCharge.trail.forEach(dot => 
            {
                ellipse(dot.x, dot.y, 2, 2);
            });

            
            if (gameMode == "Build")
            {
                testCharge.calculateTrajectory();
                
                let fillColorAplha = 255;
                testCharge.trajectory.forEach(dot => 
                {
                    fill(`rgba(0,0,0,${fillColorAplha})`)
                    fillColorAplha = fillColorAplha / 2;
                    ellipse(dot.x, dot.y, 3, 3);
                });
            }


            stroke("rgba(0,0,0,0.5)");
            fill(testCharge.color);
            ellipse(testCharge.position.x, testCharge.position.y, testChargeDiameter, testChargeDiameter);
        pop();




        stroke(0);
        noFill();
        strokeWeight(2); 
        beginShape();
        for(let i = 0; i <= this.numberOfSides; i++) 
        {
            let px = this.position.x - testChargeRadius * Math.cos(this.a);
            let py = this.position.y - testChargeRadius * Math.sin(this.a);
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



    calculateTrajectory()
    {
        let testCharge = this;
        testCharge.trajectory = [];
        let trajectoryAcc = createVector(0, 0);
        let trajectoryVel = createVector(0, 0);
        let trajectoryPos = createVector(testCharge.position.x, testCharge.position.y);
        
        for (let i = 0; i < 20; i++) 
        {
            let force = netForceAtPoint(trajectoryPos).mult(250);
            trajectoryAcc = force.mult(testCharge.charge);
            trajectoryVel.add(trajectoryAcc);
            trajectoryPos.add(trajectoryVel);


            testCharge.trajectory.push(createVector(trajectoryPos.x, trajectoryPos.y));
            
        }
    }





    move()
    {
        this.checkCollisions();
        this.checkStarsCollision();
        let testCharge = this;
        let force = netForceAtPoint(testCharge.position);

        if (force.mag() != Infinity && testCharge.moving)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m would be 1
            testCharge.acceleration = force.mult(testCharge.charge);
            testCharge.velocity.add(testCharge.acceleration);
            testCharge.position.add(testCharge.velocity);

            //console.log(testCharge.velocity.mag());
        }
        else if (!testCharge.moving)
        {
            //testCharge.opacity = constrain(testCharge.opacity - 0.005, 0, 1);
        }

        if (testCharge.moving == true)
        {
            testCharge.frames++;
            if (testCharge.frames % 20 == 0)
            {
                testCharge.trail.push(createVector(testCharge.position.x, testCharge.position.y));
            }
        }
    }





    checkStarsCollision()
    {
        let testCharge = this;

        stars.forEach(star => 
        {
            let starPosition = star.position;

            let shapeOne = {shape: "Circle", position: testCharge.position, radius: (testChargeDiameter/2)};
            let shapeTwo = {shape: "Circle", position: starPosition, radius: starRadius};

            if (checkCollision(shapeOne, shapeTwo)) 
            {
                star.collected = true;
            }
        });

        // levels[track.level].starPositions.forEach(starPosition => 
        //     {
        //         push();
        //             ellipse(starPosition.x, starPosition.y, starDiameter, starDiameter);
        //         pop();
        //         let shapeOne = {shape: "Circle", position: testCharge.position, radius: (testChargeDiameter/2)};
        //         let shapeTwo = {shape: "Circle", position: starPosition, starRadius};
    
        //         if (checkCollision(shapeOne, shapeTwo)) 
        //         {
        //             star.collected = true;
        //             console.log("asdf");
        //         }
            
        //     });
    }





    checkCollisions()
    {
        let testCharge = this;
        let moving = true;
        let collided = false;

        if(collide(testCharges[0].returned, track.returned) && !collided) 
        {
            collided = true;
        }

        if(collided) 
        {
           moving = false
        }

        let shapeOne = {shape: "Circle", position: testCharge.position, radius: (testChargeRadius)};
        let shapeTwo = {shape: "Rect", position: createVector(track.finishLine.x, track.finishLine.y), width: track.finishLine.width, height: track.finishLine.height};

        if (checkCollision(shapeOne, shapeTwo)) 
        {
            finished = true;
        }

        // levels[track.level].shapes.forEach(shape => 
        // {
        //     let trackOffset = levels[track.level].trackOffset;
        //     let shapeOne, shapeTwo;

        //     shapeOne = {shape: "Circle", position: testCharge.position, radius: (testChargeDiameter/2)};
            
        //     if (shape.shape == "Rect")
        //     {
        //         shapeTwo = {shape: shape.shape, position: createVector(shape.x, shape.y).add(trackOffset), width: shape.width, height: shape.height};
        //     }
        //     if (shape.shape == "Circle")
        //     {
        //         shapeTwo = {shape: shape.shape, position: createVector(shape.x, shape.y).add(trackOffset), radius: shape.radius};
        //     }
            

        //     if (checkCollision(shapeOne, shapeTwo)) 
        //     {
        //         if (shape.type == "track") 
        //         { 
        //             moving = true; 
        //         }
        //         else if (shape.type == "finish") 
        //         {
        //             moving = true;
        //             finished = true;
        //         }
        //         else if (shape.type == "remove")  
        //         { 
        //             moving = false; 
        //         }
        //     }
        
        // });

        if(gameMode == "Build")
        {
            this.reset();
        }

        testCharge.moving = moving;
    }



    reset()
    {
        let testCharge = this;
        let defaultPosition = p5.Vector.add(levels[track.level].testChargeStartingPosition, levels[track.level].trackOffset);
        let startingPosition = createVector(defaultPosition.x, defaultPosition.y)

        testCharge.position = startingPosition;
        testCharge.velocity = createVector(0, 0);
        testCharge.acceleration = createVector(0, 0);
        testCharge.opacity = 1;
        testCharge.color ="rgba(255,0,0," + testCharge.opacity.toString() + ")";
        testCharge.trail = [];
        finished = false;

    }
}


// class GameTestCharge extends TestCharge
// {
//   constructor(asdf)
//   {
//     super(position, velocity, acceleration, opacity, color, moving, show);
//     this.asdf = asdf;
//
//     //q = 5 micro coulombs;
//     var q = 0.000005;
//
//
//     this.display = function()
//     {
//       if (this.show)
//       {
//         push();
//           stroke(0);
//           this.color = "rgba(255,0,0," + this.opacity.toString() + ")";
//           fill(this.color);
//           ellipse(this.position.x, this.position.y, testChargeDiameter, testChargeDiameter);
//         pop();
//       }
//
//     }
//
//     this.move = function()
//     {
//        var force = netForceAtPoint(this.position);
//
//        if (force.mag() != Infinity && force.mag() != 0 && this.moving)
//        {
//          //console.log(force.toString());
//          force.mult(q);
//
//          this.acceleration = (force);
//          this.velocity.add(this.acceleration);
//          this.position.add(this.velocity);
//        }
//        else if (!this.moving)
//        {
//           //this.opacity = constrain(this.opacity - 0.005, 0, 1);
//        }
//     }
//
//     this.checkWallCollision = function()
//     {
//       for (var i = 0; i < walls.length; i++)
//       {
//         if (collideRectCircle(walls[i].x, walls[i].y, walls[i].width * gridSize, walls[i].height * gridSize, this.position.x, this.position.y, testChargeDiameter))
//         {
//           this.velocity = createVector(0, 0);
//         }
//       }
//     }
//
//
//     this.reset = function()
//     {
//       this.position = createVector(200, 200);
//       this.velocity = createVector(0, 0);
//       this.acceleration = createVector(0, 0);
//       this.opacity = 1;
//       this.color ="rgba(255,0,0," + this.opacity.toString() + ")";
//       this.moving = true;
//       this.show = true;
//     }
//   }
// }



















/*
function checkCollision(shapeOne, shapeTwo)
{
    let shapeOnePosition = createVector(shapeOne.position.x, shapeOne.position.y);
    let shapeTwoPosition = createVector(shapeTwo.position.x, shapeTwo.position.y);


    if (shapeOne.shape == "Point" && shapeTwo.shape == "Circle")
    {
        let pointToCircleDistance = shapeOnePosition.dist(shapeTwoPosition);

        if (pointToCircleDistance < shapeTwo.radius) 
        {
            return true;
        }
        return false;
    }
    else if (shapeOne.shape == "Point" && shapeTwo.shape == "Rect")
    {
        if (shapeOnePosition.x >= shapeTwoPosition.x && 
            shapeOnePosition.x <= shapeTwoPosition.x + shapeTwo.width && 
            shapeOnePosition.y >= shapeTwoPosition.y && 
            shapeOnePosition.y <= shapeTwoPosition.y + shapeTwo.height) 
        {
            return true;
        }
        return false;
    }
    else if (shapeOne.shape == "Circle" && shapeTwo.shape == "Circle")
    {
        let circleToCircleDistance = p5.Vector.dist(shapeOnePosition, shapeTwoPosition);
        
        if (circleToCircleDistance < shapeOne.radius + shapeTwo.radius) 
        {
            return true;
        }
        return false;
    }
    else if (shapeOne.shape == "Circle" && shapeTwo.shape == "Rect")
    {
        if (shapeOnePosition.x - shapeOne.radius > shapeTwoPosition.x && 
            shapeOnePosition.x + shapeOne.radius < shapeTwoPosition.x + shapeTwo.width && 
            shapeOnePosition.y - shapeOne.radius > shapeTwoPosition.y && 
            shapeOnePosition.y + shapeOne.radius < shapeTwoPosition.y + shapeTwo.height) 
        { 
            return true;
        }
        return false;
    }
    else
    {
        console.error("Shape not defined");
        return false;
    }







    
}
*/