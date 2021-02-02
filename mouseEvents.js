'use strict';

function mouseClicked()
{
    let mousePosition = createVector(mouseX, mouseY);
    let buttonClicked = false;
    let screenFound = false;


    // console.log(mouseTapped);

    // consoleLog += "createVector(" + Math.round(mousePosition.x - levels[currentLevel].trackOffset.x) + ", " + Math.round(mousePosition.y - levels[currentLevel].trackOffset.y) + "), ";
    consoleLog += "{x: " + Math.round(mousePosition.x - levels[currentLevel].trackOffset.x) + ", y: " + Math.round(mousePosition.y - levels[currentLevel].trackOffset.y) + "}, ";

    //console.log(consoleLog);
    screens.forEach(screen =>
    {
        if (screen.visibility == "visible" && !screenFound ) 
        {
            screenFound = true;
            
            screen.buttons.forEach(button => {
                if(button.visibility != "hidden" && mouseTapped)
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
        }
    });

    // if (slider.visibility != "visible" )
    // {
    //     return false;
    // }
    
    
    
}


function mouseMoved() 
{
    mouseTapped = false;
}

function mousePressed() 
{
    mouseTapped = true;

    let scaledHeight = windowWidth * (375 / 812);  // 375 / 812 is the aspect ratio of an iphone X. All of the sizes and positions of things are modeled aroung that
    let scaledWidth = windowWidth;
    if (currentScreen == "Level Select" && mouseY > scaledHeight - 20) 
    {
        onScrollBar = true
    }
    else
    {
        onScrollBar = false
    }
}

function mouseWheel(event) 
{
    // print(event.delta);
    if (currentScreen == "Level Select") 
    {
        mouseWheelGroupSelect(event.delta)
    }
    if (currentScreen == "Leaderboard") 
    {
        mouseWheelLeaderboard(event.delta)
    }
}


function mouseDragged()
{

    
    mouseTapped = false;
    screens.forEach(screen =>
    {
        if (screen.visibility == "visible") 
        {
            if (screen.name == "Level")
            {
                mouseDraggedLevel();
            }
            else if (screen.name == "Level Select")
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

function mouseReleased() 
{
    onScrollBar = false
    screens.forEach(screen =>
    {
        if (screen.visibility == "visible") 
        {

            if (screen.name == "Level")
            {
                mouseReleasedLevel();
            }
        }
    });
}

function mouseWheelGroupSelect(delta)
{
    let newOffset = levelSelectOffset - (delta * 4);
    let newOffsetConstrained = constrain(newOffset, -((levels.length - 2.5) * (300 * scale.x)) * scale.x, 0);
    levelSelectOffset = newOffsetConstrained;
}

function mouseWheelLeaderboard(delta)
{
    let newOffset = leaderboardOffset - delta;
    let newOffsetConstrained = constrain(newOffset, -(10 * 48) * scale.y, 0);
    leaderboardOffset = newOffsetConstrained;
}

function mouseDraggedGroupSelect()
{
    if (onScrollBar) 
    {
        let newOffset = (-1 * ((mouseX - 50)) / width) * (((levels.length - 2.5) * (280 * scale.x)) * scale.x);
        let newOffsetConstrained = constrain(newOffset, -((levels.length - 2.5) * (300 * scale.x)) * scale.x, 0);
        levelSelectOffset = newOffsetConstrained;
    }
    else
    {
        let newOffset = levelSelectOffset - ((pmouseX - mouseX) * scale.x);
        let newOffsetConstrained = constrain(newOffset, -((levels.length - 2.5) * (300 * scale.x)) * scale.x, 0);
        levelSelectOffset = newOffsetConstrained;
    }
    
}

function mouseDraggedLeaderboard()
{
    let newOffset = leaderboardOffset - ((pmouseY - mouseY) / 1);
    let newOffsetConstrained = constrain(newOffset, -(10 * 48) * scale.y, 0);
    leaderboardOffset = newOffsetConstrained;
}

function mouseReleasedLevel()
{
    if (mouseX < 20 * scale.x && mouseY > height - 40) {
        deleteSelectedCharge();
    }
    else
    {
        charges.forEach(charge => {
            charge.selected = false;
            charge.dragging = false; 
        })

    }
    
}


function mouseClickedLevelSelect()
{
    // let mousePosition = createVector(mouseX, mouseY);

    // let squareWidth = 70 * scale.x;
    // let scale2 = 0.5;
    // let y = 100 * scale.y;
    // let x = 406 * scale.x;

    // for (let i = 0; i < levels[currentLevel].starPositions.length; i++) 
    // {
    //     // if (mousePosition.x > (200 * (i * 1.5) + 100 + levelSelectOffset)  &&
    //     //     mousePosition.y > height/3 &&
    //     //     mousePosition.y < height/3 + 200 &&
    //     //     mousePosition.x < (200 * (i * 1.5) + 100 + levelSelectOffset) + (200) &&
    //     //     !levels[i].locked)
    //     // {
            
    //     //     currentLevel = i;
    //     //     navigateTo("Level Select");
    //     // }

        

    //     x += ((squareWidth + (squareWidth/4)));
    //     if (x > width - squareWidth) 
    //     {
    //         x -= (i * (squareWidth + (squareWidth/4)));
    //         y += (squareWidth/4 + squareWidth);
    //     }

    //     if (mousePosition.x > x &&
    //         mousePosition.x < x + squareWidth &&
    //         mousePosition.y > y &&
    //         mousePosition.y < y + squareWidth)
    //     {
    //         currentLevel = i;
    //         changeTrack(currentLevel);
    //         //navigateTo("Level");
    //         loadPercent = 0;
    //         navigateTo("Loading Screen");
    //     }
        
    // }

}