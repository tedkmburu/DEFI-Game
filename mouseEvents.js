
function mouseClicked() // this is an inbuilt p5 function that runs everytime any mouse button is clicked
{
    let mousePosition = createVector(mouseX, mouseY);
    let buttonClicked = false;


    // console.log(mousePosition);

    // consoleLog += "createVector(" + Math.round(mousePosition.x - levels[currentLevel].trackOffset.x) + ", " + Math.round(mousePosition.y - levels[currentLevel].trackOffset.y) + "), ";
    // consoleLog += "{x: " + Math.round(mousePosition.x - levels[currentLevel].trackOffset.x) + ", y: " + Math.round(mousePosition.y - levels[currentLevel].trackOffset.y) + "}, ";

    // console.log(consoleLog);

    popupVisibile = popups.some(x => x.visibility == "visible"); // if any popuip is currently visible, this will be true

    if (popupVisibile) // if a popup is visible, I want to only look at the buttons in that popup when im checking if the user has clicked a button
    {
        let popupIndex = popups.findIndex(x => x.visibility == "visible");
        let currentPopup = popups[popupIndex];

        currentPopup.buttons.forEach(button => { // these will loop through all the buttons in the popup that's currently being displayed
            if(button.visibility != "hidden" && mouseTapped) // if the button visibility is visible and the mouse has been clicked and not dragged over a button and let go this will be true
            {
                // buttons have different shapes so they should have different collision buttons. Here I check to buttons shape and then check for collisions. If the button's shape is not defined, it will assume its a rectangle 
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
                else // this is a rectangle shape
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
    }

    screens.forEach(screen =>
    {
        if (screen.visibility == "visible" && !popupVisibile) // this will only run if none of the popups are visible 
        {
            //console.log(mouseTapped);
            screen.buttons.forEach(button => { 
                if(button.visibility != "hidden" && mouseTapped) // if a screen is visible and the mouse has been clicked and not dragged over a button and let go this will be true
                {
                    // buttons have different shapes so they should have different collision buttons. Here I check to buttons shape and then check for collisions. If the button's shape is not defined, it will assume its a rectangle 
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


function mouseMoved() // this is an inbuilt p5 function, runs when the mouse is moved in any direction
{
    mouseTapped = false;
}

function mousePressed() // this is an inbuilt p5 function, runs when the mouse button goes down, the mouseClicked function runs when the mouse button goes down and back up
{
    mouseTapped = true;


    if (currentScreen == "Level Select" && mouseY > height - 20) 
    {
        onScrollBar = true
    }
    else
    {
        onScrollBar = false
    }
}

function mouseWheel(event) // this is an inbuilt p5 function, runs when the mouse wheel is scrolled or when a two finger gesture scroll on a trackpad happens
{
    // print(event.delta);
    if (currentScreen == "Level Select" && !popupVisibile) 
    {
        mouseWheelGroupSelect(event.delta)
    }
    if (currentScreen == "Leaderboard" && !popupVisibile) 
    {
        mouseWheelLeaderboard(event.delta)
    }
}


function mouseDragged() // this is an inbuilt p5 function, runs when the mouse is clicked down and moved in any direction
{
    mouseTapped = false;
    screens.forEach(screen =>
    {
        if (screen.visibility == "visible" && !popupVisibile) 
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

function mouseReleased() // this is an inbuilt p5 function, runs when any mouse button is released
{
    onScrollBar = false
    screens.forEach(screen =>
    {
        if (screen.visibility == "visible" && !popupVisibile) 
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
    let newOffsetConstrained = constrain(newOffset, -((currentLeaderboard.length + 8) * 48) * scale.y, 0);
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
    let newOffsetConstrained = constrain(newOffset, -((currentLeaderboard.length + 8) * 48) * scale.y, 0);
    leaderboardOffset = newOffsetConstrained;
}

function mouseReleasedLevel()
{
    if (mouseButton === "left" && gameMode == "Build")
    {
        let mousePosition = createVector(mouseX, mouseY);
        let clickedCharge = false; 
        let distances = [];

        if (mouseX < 20 * scale.x && mouseY > height - 40) 
        {
            deleteSelectedCharge();
        }
        else
        {
            charges.forEach((charge, i) => {
                charge.selected = false;
                charge.dragging = false; 

                let distance = mousePosition.dist(charge.position);
                distances.push(distance);
                // if (distance < chargeRadius * 1.5 && clickedCharge == false)
                // {
                //     charge.selected = true;
                //     clickedCharge = true;
                // }
            })

            let minDistance = Math.min(...distances);
            if(minDistance < chargeRadius * 1.5)
            {
                let indexOfMinDistance = distances.indexOf(minDistance);
                charges[indexOfMinDistance].selected = true;
                clickedCharge = true;
            }

            let draggingCharge = false;

            charges.forEach((charge, i) => {
                if (charge.dragging)
                {
                    draggingCharge = true;
                }
            })

            if (!clickedCharge && !draggingCharge && mouseTapped) 
            {
                createCharge(mousePosition, 0);
            }
        }
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