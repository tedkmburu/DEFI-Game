'use strict';

function mousePressed()
{
    let mousePosition = createVector(mouseX, mouseY);
    let buttonClicked = false;
    let screenFound = false;

    screens.forEach(screen =>
    {
        if (screen.visibility == "visible" && !screenFound) 
        {
            screenFound = true;
            
            screen.buttons.forEach(button => {
                if(button.visibility != "hidden")
                {
                    if (button.shape == "Circle") 
                    {
                        let distance = mousePosition.dist(button.position);
                        if (distance < button.width / 2)
                        {
                            button.clicked();
                            buttonClicked = true;
                        }
                    }
                    else if (button.shape == "Oval") 
                    {
                        //rect(button.x - (button.width / 1.25), button.y- (button.height / 2), button.width * 1.6, button.height)
                        if (mousePosition.x > button.x - (button.width / 1.25) &&
                            mousePosition.y > button.y - (button.height / 2) &&
                            mousePosition.x < button.x + button.width * 1.6 &&
                            mousePosition.y < button.y + button.height)
                        {
                            button.clicked();
                            buttonClicked = true;
                        }
                    }
                    else
                    {
                        if (mousePosition.x > button.x &&
                            mousePosition.y > button.y &&
                            mousePosition.x < button.x + button.width &&
                            mousePosition.y < button.y + button.height)
                        {
                            button.clicked();
                            buttonClicked = true;
                        }
                    }
                }
                
                
            });

            if (screen.name == "Level")
            {
                mouseClickedLevel(buttonClicked);
            }
            else if (screen.name == "Level Select")
            {
                mouseClickedLevelSelect();
            }
            else if (screen.name == "Group Select")
            {
                mouseClickedGroupSelect();
            }
        }
    });

    if (slider.visibility != "visible")
    {
        return false;
    }
    
}

function mouseDragged()
{
    let screenFound = false;
    screens.forEach(screen =>
    {
        if (screen.visibility == "visible" && !screenFound) 
        {
            screenFound = true;
            if (screen.name == "Level")
            {
                mouseDraggedLevel();
            }
            else if (screen.name == "Group Select")
            {
                mouseDraggedGroupSelect();
            }
            else if (screen.name == "Leaderboard")
            {
                mouseDraggedLeaderboard();
            }
        }
    });

    
    
}




function mouseDraggedGroupSelect()
{
    let newOffset = groupSelectOffset - ((pmouseX - mouseX) / 1);
    let newOffsetConstrained = constrain(newOffset, -((levels.length - 2.5) * 300), 0);
    groupSelectOffset = newOffsetConstrained;
}

function mouseDraggedLeaderboard()
{
    let newOffset = leaderboardOffset - ((pmouseY - mouseY) / 1);
    let newOffsetConstrained = constrain(newOffset, -(10 * 48), 0);
    leaderboardOffset = newOffsetConstrained;
}

function mouseClickedGroupSelect()
{
    let mousePosition = createVector(mouseX, mouseY);

    // console.log(mousePosition);
    // console.log(groupSelectOffset);


    //(200 * (i * 1.5) + 100 + groupSelectOffset)

    // stroke("red")
    // strokeWeight(5)
    // rect(100,height/3,100,100)
    // strokeWeight(0)


    for (let i = 0; i < levels.length; i++) 
    {
        if (mousePosition.x > (200 * (i * 1.5) + 100 + groupSelectOffset)  &&
            mousePosition.y > height/3 &&
            mousePosition.y < height/3 + 200 &&
            mousePosition.x < (200 * (i * 1.5) + 100 + groupSelectOffset) + (200) &&
            !levels[i].locked)
        {
            currentLevelGroup = i;
            navigateTo("Level Select");
        }
    }

    
    
    // levelTemplates.forEach(button => 
    // {
    //     if (mousePosition.x > button.x + groupSelectOffset &&
    //         mousePosition.y > 75 &&
    //         mousePosition.x < button.x + (levelSelectTileSize) + groupelectOffset)
    //     {
    //         button.clicked();
    //     }
        
    // });

}



function mouseClickedLevelSelect()
{
    let mousePosition = createVector(mouseX, mouseY);

    let squareWidth = 70;
    let scale = 0.5;
    let y = 100;
    let x = (width * scale);

    for (let i = 0; i < levels[currentLevelGroup].starPositions.length; i++) 
    {
        // if (mousePosition.x > (200 * (i * 1.5) + 100 + groupSelectOffset)  &&
        //     mousePosition.y > height/3 &&
        //     mousePosition.y < height/3 + 200 &&
        //     mousePosition.x < (200 * (i * 1.5) + 100 + groupSelectOffset) + (200) &&
        //     !levels[i].locked)
        // {
            
        //     currentLevelGroup = i;
        //     navigateTo("Level Select");
        // }

        

        x += ((squareWidth + (squareWidth/4)));
        if (x > width - squareWidth) 
        {
            x -= (i * (squareWidth + (squareWidth/4)));
            y += (squareWidth/4 + squareWidth);
        }

        if (mousePosition.x > x &&
            mousePosition.x < x + squareWidth &&
            mousePosition.y > y &&
            mousePosition.y < y + squareWidth)
        {
            currentLevel = i;
            createTrack(currentLevelGroup);
            //navigateTo("Level");
            loadPercent = 0;
            navigateTo("Loading Screen");
        }
        
    }

}