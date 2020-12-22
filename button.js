'use strict';

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
        if(button.visibility != "hidden")
        {
            push();
                fill(button.bgColor);
                noStroke();
                if(button.shape == "Circle")
                {
                    ellipse(button.x, button.y, button.width, button.height);

                    fill(button.fontColor);

                    if (button.onClick == "Build")
                    {
                        image(icon.edit, button.x - 20, button.y - 20, button.width - 20, button.height - 20);
                    }
                    else if (button.onClick == "Play") 
                    {
                        image(icon.play, button.x - 20, button.y - 20, button.width - 20, button.height - 20);
                    }
                    else
                    {
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
    }

    clicked()
    {
        
        let button = this;

        if (button.onClick == "Settings")
        {
            userNameInput.visibility = "visible";
            userNameInput.elt.focus()
        }
        else
        {
            userNameInput.visibility = "hidden";
        }

        // console.log(button.title);
        if (button.onClick == "Home" || button.onClick == "<")
        {
            navigateTo("Home");
        }
        else if (button.onClick == "Level Select" || button.onClick == "Settings" || button.onClick == "Credits" || button.onClick == "Group Select" || button.onClick == "Leaderboard")
        {
            navigateTo(button.onClick);
        }
        else if (button.onClick == "Help")
        {
            navigateTo("Help");
        }
        else if (button.onClick == "Level")
        {
            navigateTo("Level");
            dataSent = false;
        }
        else if (button.onClick == "Why")
        {
            navigateTo("Help");
        }
        else if (button.onClick == "Colorblind Mode")
        {
            colorBlindMode = !colorBlindMode;
            chargeColor = getColors();
            textColor = getTextColors();
            //createScreens() 
        }
        else if (button.onClick == "Back")
        {
            navigateBack();
        }
        else if (button.onClick == "Play")
        {
            gameMode = "Play";
            console.log("play");

            screens[4].buttons[2].title = "Play";

            testCharges.forEach(testCharge => 
            {
                testCharge.reset();
            });
        }
        else if (button.onClick == "Build") 
        {
            gameMode = "Build";
            console.log("build");
            //screens[4].buttons[2].title = "Build";
            createFieldLines(); 
            stars = [];
            levels[currentLevelGroup].starPositions[currentLevel].forEach(starPosition => 
            {
                stars.push(new Star( p5.Vector.add(starPosition, levels[track.level].trackOffset)));
            });
        }
        else if (button.onClick == "Next") 
        {
            if (currentLevel < levels[currentLevelGroup].starPositions.length - 1) 
            {
                currentLevel++;
                createTrack(track.level);

                removeAllCharges();

                testCharges.forEach(testCharge => 
                {
                    testCharge.reset();
                });

                navigateTo("Level");
            }  
        }
        else if (button.onClick == "Redo") 
        {
            testCharges.forEach(testCharge => 
            {
                testCharge.reset();
            });

            removeAllCharges();
            console.log(timeElapsed);
            timeElapsed = 0;
            createTrack(track.level);
            navigateTo("Level");
        }
        else if (button.onClick == "Clear Data") 
        {

            clearStorage();
            getUserData();  
            
            
            // levelTemplates.forEach((level, i) => 
            // {
            //     levelTemplates[i].time = 0;
            //     if (i != 0) 
            //     {
            //         levelTemplates[i].locked = true;
            //     }
            // });
            createLevels();
        }
        else if (button.onClick == "Best Time")
        {

        }
        else if (button.onClick == "Best Score")
        {

        }
        else
        {
            console.log(button.title , " is not assigned");
        }
    }
  
}
