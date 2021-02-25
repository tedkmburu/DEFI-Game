function toggleGameMode()   // This function is called whenever the play/buid button is called. It's also called when the user hits the space bar. The function switches between the two gamemodes. 
{
    let screenIndex = screens.findIndex(x => x.name == "Level"); // This gets the index of the "Level" screen in the screens array 
    let toggleButton = screens[screenIndex].buttons.findIndex(x => x.title == "Play" || x.title == "Build"); // This finds the button in the "Level" screen that has the title "Play" or "Build". 

    stars.forEach(star => {star.collected = false}) // This sets each star to an uncollected state so it reappears if it has already been collected

    if (gameMode == "Build") 
    {
        gameMode = "Play"; // switches game mode
        
        screens[screenIndex].buttons[toggleButton].title = "Build";  // changes the button title which changes its appearance
        
        createFieldLines(); // recalculates the field lines
    }
    else
    {
        gameMode = "Build"; // switches game mode

        screens[screenIndex].buttons[toggleButton].title = "Play"; // changes the button title which changes its appearance

        // This puts each of the testcharges in the level in its original position
        resetTestCharges()
    }

    hitEdge = false;
}





function pressNext() // this function navigates to the next level. It's called in the "Level Complete" screen when the next button is clicked
{
    if (currentLevel < levels.length - 1) // This will only work if the user isn't on the last level in the game
    {
        currentLevel++; // increases the current level by 1
        changeTrack(currentLevel); // changes the track thats ready to be displayed

        // This puts each of the testcharges in the new level in its original position
        resetTestCharges()

        // changes the screen to go to the new level
        navigateTo("Level");
    }  
    else
    {
        // the user has completed all the tracks
        console.log("no more levels");
    }
}





function pressRedo()
{
    resetTestCharges() // This puts each of the testcharges in the level in its original position
    removeAllCharges(); // removes all charges that the user places on in the level
    changeTrack(track.level); // eventhough the changeTrack funciton is called, it doesnt change the track. The integer that's given to the function is the same as the current level so all the function will do is reset the current level. 
    navigateTo("Level"); // changes the screen to go to the new level
}




function resetGame()
{
    clearStorage(); // deletes all of the locally stored data
    getUserData(); // gets a new device Id from the servera and stores it locally. Also stores the score, time and collected stars to 0 for each level. 
}





function increaseLeaderboardLevel()
{
    let screenIndex = screens.findIndex(x => x.name == "Leaderboard");
    let screen = screens[screenIndex];
    let levelButton;

    if (levels.length > leaderboardData.level) 
    {
        levelButton = getButtonIndex("Leaderboard", leaderboardData.level)
        leaderboardData.level++;
        
    }
    else
    {
        levelButton = getButtonIndex("Leaderboard", levels.length)
        leaderboardData.level = 1;
    }

    screen.buttons[levelButton].title = leaderboardData.level;
}






class Button
{
    constructor(props)
    {
        this.position = createVector(props.x * scale.x, props.y * scale.y);
        this.x = props.x * scale.x;
        this.y = props.y * scale.y;
        this.width = props.width * scale.x;
        this.height = props.height * scale.y;
        this.fontSize = props.fontSize * scale.x;

        this.bgColor = props.bgColor;
        this.fontColor = props.fontColor;
        this.title = props.title;
        this.onClick = props.onClick;
        this.shape = props.shape;
        this.font = props.font;
        this.visibility = props.visibility;
    }

    display()
    {
        let button = this;
        
        push();
            fill(button.bgColor);
            noStroke();
            if(button.shape == "Circle")
            {
                if (button.title == "Build")
                {
                    ellipse(button.x, button.y, button.width / scale.x, button.height / scale.y);

                    image(icon.edit, button.x - 20, button.y - 20, (button.width / scale.x) - 20, (button.height / scale.y) - 20);
                }
                else if (button.title == "Play") 
                {
                    ellipse(button.x, button.y, button.width / scale.x, button.height / scale.y);

                    image(icon.play, button.x - 20, button.y - 20, (button.width / scale.x) - 20, (button.height / scale.y) - 20);
                }
                else
                {
                    ellipse(button.x, button.y, button.width, button.height);

                    fill(button.fontColor);
                    textSize(button.fontSize);
                    
                    text(button.title, button.x,  button.y + 7);    
                }
                
            }
            else if(button.shape == "Oval")
            {
                noStroke();
                
                ellipse(button.x - (button.width / 2), button.y, button.height, button.height);
                ellipse(button.x + (button.width / 2), button.y, button.height, button.height);
                rect(button.x - (button.width / 2), button.y - (button.height / 2), button.width, button.height);

                fill(button.fontColor);
                textSize(button.fontSize);
                noStroke();
                text(button.title, button.x,  button.y + 7);
                noFill();
                stroke(255)
                //rect(button.x - (button.width / 1.25), button.y- (button.height / 2), button.width * 1.6, button.height);
            }
            else if(button.shape == "Back")
            {
                image(icon.back, button.x, button.y, button.width, button.height);
            }
            else if(button.shape == "Redo")
            {
                image(icon.redo, button.x, button.y, button.width, button.height);
            }
            else if(button.shape == "Help")
            {
                image(icon.help, button.x, button.y, button.width, button.height);
            }
            else if (button.shape == "Home")
            {
                fill(button.bgColor);
                rect(button.x, button.y, button.width, button.height);

                textFont(spaceFont);
                fill(button.fontColor);
                textSize(button.fontSize);
                noStroke();
                textAlign(CENTER);
                text(button.title, button.x + (button.width / 2),  button.y + (button.height / 2) + 7);
            }
            else if (button.shape == "Level")
            {
                fill(button.bgColor);
                rect(button.x, button.y, button.width, button.height);

                fill(button.fontColor);
                textSize(button.fontSize);
                noStroke();
                text(button.title, button.x + (button.width / 2),  button.y + (20 * scale.y));
            }
            else
            {
                fill(button.bgColor);
                rect(button.x, button.y, button.width, button.height);

                fill(button.fontColor);
                textSize(button.fontSize);
                noStroke();
                text(button.title, button.x + (button.width / 2),  button.y + (button.height / 2) + 7);
            }
            
        pop();  
        
    }

    clicked()
    {
        let button = this;
        // try
        // {
            sounds.click.play();
            button.onClick();
        // }
        // catch(e)
        // {
        //     console.log(e);
        //     console.log(button);
        // }

        
    }
  
}


