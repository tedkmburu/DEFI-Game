'use strict';



function toggleGameMode()
{
    let gameScreen = screens.findIndex(x => x.name == "Level");
    let toggleButton = screens[gameScreen].buttons.findIndex(x => x.title == "Play" || x.title == "Build");

    if (gameMode == "Build") 
    {
        gameMode = "Play";
        
        screens[gameScreen].buttons[toggleButton].title = "Play";
        
        createFieldLines(); 
        stars = [];
        levels[currentLevelGroup].starPositions[currentLevel].forEach(starPosition => 
        {
            stars.push(new Star( p5.Vector.add(starPosition, levels[track.level].trackOffset)));
        });
    }
    else
    {
        gameMode = "Build";

        screens[gameScreen].buttons[toggleButton].title = "Build";

        testCharges.forEach(testCharge => 
        {
            testCharge.reset();
        });
    }
    console.log(gameMode);
    
}





function pressNext()
{
    if (currentLevel < levels[currentLevelGroup].starPositions.length - 1) 
    {
        currentLevel++;
        changeTrack(track.level);

        removeAllCharges();

        testCharges.forEach(testCharge => 
        {
            testCharge.reset();
        });

        navigateTo("Level");
    }  
}





function pressRedo()
{
    testCharges.forEach(testCharge => 
    {
        testCharge.reset();
    });

    removeAllCharges();
    console.log(timeElapsed);
    timeElapsed = 0;
    changeTrack(track.level);
    navigateTo("Level");
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
        // if(button.visibility != "hidden")
        
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
            else if (button.shape == "Group")
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
        try
        {
            button.onClick();
        }
        catch(e)
        {
            console.log(e);
            console.log(button);
        }

        
    }
  
}
