'use strict';
function createTrack()
{
    track = new Track(currentLevelGroup, 1, levels[currentLevelGroup].trackOffset);

    const testChargeStartingPosition = levels[currentLevelGroup].testChargeStartingPosition;
    testCharges[0] = new TestCharge(p5.Vector.add(testChargeStartingPosition, levels[currentLevelGroup].trackOffset), testChargeCharge);

    stars = [];
    levels[currentLevelGroup].starPositions[currentLevel].forEach(starPosition => 
    {
        stars.push(new Star( p5.Vector.add(starPosition, levels[currentLevelGroup].trackOffset)));
    });

    gameMode = "Build";
    timeElapsed = 0;

    //console.log("asdf");
}

function displayTrack()
{

    if(gameMode == "Play")
    {
        image(tracks[track.level].play, levels[currentLevelGroup].trackOffset.x, levels[currentLevelGroup].trackOffset.y, levels[currentLevelGroup].dimentions.x , levels[currentLevelGroup].dimentions.y);
    }
    else
    {
        image(tracks[track.level].build, levels[currentLevelGroup].trackOffset.x, levels[currentLevelGroup].trackOffset.y, levels[currentLevelGroup].dimentions.x , levels[currentLevelGroup].dimentions.y);
    }
    
    track.display();
    //image(tracks[track.level].play, 100, 100, tracks[track.level].play.width , tracks[track.level].play.height);
    
}


class Track
{
    constructor(level, scale, offset, locked)
    {
        this.level = level;
        this.scale = scale || 1;
        this.offset = offset || createVector(0,0);
        this.locked = locked;
    }


    display()
    {
        levels[this.level].shapes.forEach(shape =>
        {
            let color;
            if (currentScreen == "Level Select" || currentScreen == "Group Select")
            {
                if (shape.type == "track") 
                {
                    color = this.locked ? 25 : 255;
                }
                else if (shape.type == "remove") 
                {
                    color = 0;
                }
                else if (shape.type == "finish") 
                {
                    color = this.locked ? 25 : "grey";
                }
                else
                {
                    color = "red";
                }
            }
            else
            {
                if (shape.type == "track") 
                {
                    color = (gameMode == "Play") ? 200 : "grey";
                }
                else if (shape.type == "remove") 
                {
                    color = (gameMode == "Play") ? 0 : "#37474F";
                }
                else if (shape.type == "finish") 
                {
                    color = (gameMode == "Play") ? "grey" : 200;
                }
                else
                {
                    color = "red";
                }
            }
            


            push()
                stroke(color);
                noFill();
                if (shape.shape == "Rect") 
                {
                    rect(shape.x * this.scale + this.offset.x, shape.y * this.scale + this.offset.y, shape.width * this.scale, shape.height * this.scale);
                }
                else if (shape.shape == "Circle") 
                {
                    ellipse(shape.x * this.scale + this.offset.x, shape.y * this.scale + this.offset.y, shape.radius * 2 * this.scale, shape.radius * 2 * this.scale);
                }
                else
                {
                    console.error("Not a shape");
                }
            pop();


            // if (currentScreen == "Level Select")
            // {
            //     let position = p5.Vector.add(levels[this.level].testChargeStartingPosition, this.offset);
            //     fill("red");
            //     noStroke();
            //     ellipse(position.x, position.y, 5, 5);
            // }
        });
    }
}


