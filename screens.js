'use strict';

let groupSelectOffset = 0;
let leaderboardOffset = 0;
let loadPercent = 0;


function getScreen(screenName)
{
    let screenIndex = screens.findIndex(x => x.name == screenName);
    return screens[screenIndex];
}

function getScreenIndex(screenName)
{
    return screens.findIndex(x => x.name == screenName);
}

function getButton(screenName, buttonTitle)
{
    let screenIndex = screens.findIndex(x => x.name == screenName);
    let buttonIndex = screens[screenIndex].buttons.findIndex(x => x.title == buttonTitle);

    return screens[screenIndex].buttons[buttonIndex];
}

function getButtonIndex(screenName, buttonTitle)
{
    let screenIndex = screens.findIndex(x => x.name == screenName);
    
    return screens[screenIndex].buttons.findIndex(x => x.title == buttonTitle);
}






function displayLoadingScreen()
{
    let screenIndex = screens.findIndex(x => x.name == "Loading Screen");
    let screen = screens[screenIndex];
    

    fill(255);
    rect(0,height - 20, loadPercent, 20)
    
    if(loadPercent < width)
    {
        //loadPercent += width / 90;
        loadPercent += width;
        screen.buttons[0].visibility = "hidden";
    }
    else
    {
        screen.buttons[0].visibility = "visible";
    }
}






function displayCreditsScreen()
{
    noStroke();
    fill(255);
    textSize(18);
    text("Created by: ", width/2, 100);

    let gameCreators = [ "Dr. John Barr",  "Dr. Colleen Countyman", " ", "Sean Blackford", "Amber Elliott", "Ted Mburu", "Eli Robinson", "Mark Volkov", " "];
    textSize(12);
    for (let i = gameCreators.length; i >= 0; i--) 
    {
        text(gameCreators[i], width/2, 120 + (i * 12));
    }


    textSize(18);
    text("Special Thanks: ", width/2, 140 + (gameCreators.length * 12));

    let specialThanks = [ "Dr. Nate Presopnik", " ", "Yemi Afolabi", "Liana Rodelli"];
    textSize(12);
    for (let i = specialThanks.length; i >= 0; i--) 
    {
        text(specialThanks[i], width/2, 160 + (i * 12) + (gameCreators.length * 12)); 
    }
}




function toggleLeaderboardSort()
{
    let screenIndex = screens.findIndex(x => x.name == "Leaderboard");
    let screen = screens[screenIndex];
    let SortButton

    if (leaderboardData.sort == "Score") 
    {
        leaderboardData.sort = "Time"
        SortButton = getButtonIndex("Leaderboard", "Score")
    }
    else
    {
        leaderboardData.sort = "Score"
        SortButton = getButtonIndex("Leaderboard", "Time")
    }

    screen.buttons[SortButton].title = leaderboardData.sort;
}







function displayLeaderboardScreen()
{
    push()
        noStroke()
        fill("rgba(255, 255, 255, 0.25)");
        rect(50 * scale.x, 25 * scale.y, 712 * scale.x, height);

        fill("rgba(0, 0, 0, 0.5)");
        rect(50 * scale.x, 90 * scale.y, 712 * scale.x, height);
    
        textSize(14 * scale.x)
        fill(255);
        text("Sort By:", 100 * scale.x, 47 * scale.y);
        text("Group:", 587 * scale.x, 47 * scale.y);
        text("Level:", 687 * scale.x, 47 * scale.y);

        let screenIndex = screens.findIndex(x => x.name == "Leaderboard");
        let screen = screens[screenIndex];
        let globalButton = getButtonIndex("Leaderboard", "Global")
        let myClassButton = getButtonIndex("Leaderboard", "My Class")

        if (leaderboardData.section == "Global") 
        {
            screen.buttons[globalButton].bgColor = "rgba(0,0,0,0.5)";
            screen.buttons[myClassButton].bgColor = "rgba(0,0,0,0)";
        }
        else
        {
            screen.buttons[globalButton].bgColor = "rgba(0,0,0,0)";
            screen.buttons[myClassButton].bgColor = "rgba(0,0,0,0.5)";
        }
        
        let y = 100 * scale.y;
        //let leaderboardArray = JSON.parse(currentLeaderboard);

        textSize(16 * scale.x)

        for (let i = 0; i < currentLeaderboard.length; i++) 
        {
            //console.log(user);
            let user = JSON.parse(currentLeaderboard[i]);
            //console.log(currentLeaderboard[i]);
            fill("rgba(255, 255, 255, 0.25)")
            noStroke();
            rect(75 * scale.x, y + leaderboardOffset, 662 * scale.x, 65 * scale.y);

            fill(255);
            // rank
            text((i + 1) + ".", 100 * scale.x, (y + 37.5 * scale.y) + leaderboardOffset);

            // name
            text(user.id, 232 * scale.x, (y + 37.5  * scale.y) + leaderboardOffset);

            // class
            text("IC PHYS 101", 406 * scale.x, (y + 37.5 * scale.y) + leaderboardOffset);

            // time
            text(millisecondsToTimeFormat(user.time), 580 * scale.x, (y + 37.5 * scale.y) + leaderboardOffset); 
            
            // score
            text(user.score, 682 * scale.x, (y + 37.5 * scale.y) + leaderboardOffset);   
            
            y += 75 * scale.y;
        }
    pop()
}





function displaySettings()
{
    userNameInput.style("visibility", "visible");
    classCodeInput.style("visibility", "visible");
}

function displayUsernameInput()
{
    userNameInput.style("visibility", "visible");
    classCodeInput.style("visibility", "hidden");
}

function displayClassCodeInput()
{
    userNameInput.style("visibility", "hidden");
    classCodeInput.style("visibility", "visible");
}







function displayGroupScreen()
{
    let screenIndex = screens.findIndex(x => x.name == "Group Select");
    let screen = screens[screenIndex];

    let trackPosiions = [];
    
    screen.buttons.forEach(button => {
        if (button.shape == "Group") 
        {
            trackPosiions.push(createVector(button.x / 10 + width/3, height / 1.125))
        }
    });

    push()
    trackPosiions.forEach(trackPosition => {
        stroke("red")
        strokeWeight(10)
        point(trackPosition.x, trackPosition.y);
    })
    pop()

    //console.log(trackPosiions);
}






function tutorial()
{
    push();
        fill(255);
        stroke(0);
        textSize(14);

        if(charges.length == 0)
        {
            text("Tap inside the circle\n to create a charge", track.offset.x - 80, track.offset.y - 20);
        }
        else if(slider.visibility == "visible")
        {
            if (charges[0].charge > 0)
            {
                text("Press Play \n to test\n your build", width - 50, height - 130);
            }
            else
            {
                textAlign(LEFT);
                fill(0);
                rect(width - 185, height/2, 150, 100);
                fill(255);
                text("We call the sign \nand magnitude \nof the charge", width - 165, height/2 + 20);
                textAlign(CENTER);
                text("Use the slider to give the charge a positive charge", width/2, height - 30);
                textSize(24);
                text("Q.", width - 115, height/2 + 90);
            }
        }
       
        image(icon.circle, track.offset.x - 100, track.offset.y + 20, chargeDiameter + 20, chargeDiameter + 20);
        
    pop();
}






function displayLevelScreen()
{
    displayTrack();
    displayFieldLines();
    displayStars();
    displayTrash();
    displayCharges();
    displaySlider();
    displayTestCharges();


    finished = true;
    testCharges.forEach(testCharge => {
        if (!testCharge.finished) 
        {
            finished = false    
        }
    });
    

    if (gameMode == "Play") 
    {
        if (currentLevelGroup == 0 && currentLevel == 0)
        {
            push();
                fill(255);
                stroke(0);
                textSize(14);
                text("Switch to build \n mode to create \n Electric Field", width - 150, height - 50);

                text("Get the test \n charge to the \n finsh line", track.offset.x + 500, track.offset.y - 60);

            pop();
        }
    }
    else
    {
        if (currentLevelGroup == 0 && currentLevel == 0)
        {
            tutorial()
        }
    }

    if (gameMode == "Play") 
    {
        charges.forEach(charge => 
        {
            charge.selected = false;
        });
    }
    
    if(finished)
    {
        sendScore(currentLevel, currentLevelGroup,timeElapsed, stars);
        let allStars = JSON.parse(localStorage.getItem("userStars"))
        totalStars = 0;
        allStars.forEach(starGroup =>
        {
            starGroup.forEach(starsAdd =>
            {
                totalStars += starsAdd;
            })
        })
        navigateTo("Level Complete");
    }
    else
    {
        timeElapsed += deltaTime;
    }
}








function displayHomeScreen()
{
    image(homeTrack, 50, 50, 721 * scale.x, 333 * scale.y);
}








function displayScreen(screen)
{
    background("red");
    if(gameMode == "Build" && currentScreen == "Level")
    {
        image(blueprint, 0, 0, width, height);
    }
    else
    {
        image(backgroundImages[0], 0, 0, width, height);
    }

    screen.display();

    if (screen.name == "Level Select") 
    {
        // levelTemplates.forEach(level => 
        // {
        //     level.display();
        // });
        let scaleTrack = 0.5;
        //let offset = p5.Vector.mult(levels[currentLevelGroup].trackOffset, scale);

        push()
            
            fill(0);
            rect(50 * scale.x, 100 * scale.y, width * scaleTrack, height * scaleTrack)
            
            image(trackImages[currentLevelGroup].build, -(10 * scale.x) + (levels[currentLevelGroup].trackOffset.x) /2, 100 + (levels[currentLevelGroup].trackOffset.y) / 2, (levels[currentLevelGroup].dimentions.x / 2) * scale.x, (levels[currentLevelGroup].dimentions.y / 2) * scale.y);

            let squareWidth = 70 * scale.x;
            let y = 100 * scale.y;
            let x = (width * scaleTrack);
            for (let i = 0; i < 5; i++) 
            {
                x += ((squareWidth + (squareWidth/4)));
                if (x > width - squareWidth) 
                {
                    x -= (i * (squareWidth + (squareWidth/4)));
                    y += (squareWidth/4 + squareWidth);
                }
                fill(0);
                rect(x, y, squareWidth, squareWidth);
                fill(255);
                textSize(24 * scale.x)
                text(i + 1, x + squareWidth/2, y + squareWidth/2 + 15)

                let levelsStars = JSON.parse(localStorage.getItem("userStars"))[currentLevelGroup][i];

                for (let stars = 0; stars < levelsStars; stars++)
                {
                    image(icon.star, squareWidth/2 + x + (-1 * ((15 * scale.x) * stars) + (10 * scale.x)) , y + (5 * scale.y), squareWidth/5, squareWidth/5);
                }
                
            }



            rect(0, 325 * scale.y, width, 50 * scale.y);




        pop()
    }

    else if (screen.name == "Level Complete") 
    {
        
        let levelTime = timeElapsed;
        let numberOfStarsCollected = 0;
        stars.forEach(star =>
        {
            if(star.collected)
            {
                numberOfStarsCollected++;
            }
        });

        let score = 10000;
        score = constrain(score - levelTime / 100, 100, 10000);
        if (numberOfStarsCollected > 0) 
        {
            score *= numberOfStarsCollected
        }
        score = Math.round(score);

        
        let starsStored = JSON.parse(localStorage.userStars);
        if(starsStored[currentLevelGroup] < numberOfStarsCollected)
        {
            starsStored[currentLevelGroup] = numberOfStarsCollected;
            localStorage.setItem('userStars', JSON.stringify(starsStored));
            // let levelHighScores = JSON.parse(localStorage.getItem("highScores"))[currentLevelGroup];
            // let starsCollected = JSON.parse(localStorage.getItem("starsCollected"))[currentLevelGroup];
            // let fastestTimes = JSON.parse(localStorage.getItem("fastestTimes"))[currentLevelGroup];

            // let locallyStoredScores = [];
            // let locallyStoredStarsCollected = [];
            // let locallyStoredFastestTimes = [];
            // console.log(levelHighScores);
            // for (let i = 0; i < levelHighScores.length; i++)
            // {
            //     if(i != currentLevel)
            //     {
            //         //scoresLocal.push(scores[i]);
            //         locallyStoredScores.push(levelHighScores[i]);
            //         locallyStoredStarsCollected.push(starsCollected[i]);
            //         locallyStoredFastestTimes.push(fastestTimes[i]);
            //     }
            //     else
            //     {
            //         locallyStoredScores.push(score);
            //         locallyStoredStarsCollected.push(numberOfStarsCollected);
            //         locallyStoredFastestTimes.push(levelTime);

            //         // scoresLocal.push(levelTime);
            //         // levels[track.level].fastestTime = levelTime;
            //         //levelTemplates[track.level] = new LevelTemplate(track.level * levelSelectTileSize, track.level, levelTime, score, numberOfStarsCollected, false); 
            //     }
            // }
            // localStorage.setItem("highScores", JSON.stringify(locallyStoredScores));
            // localStorage.setItem("starsCollected", JSON.stringify(locallyStoredStarsCollected));
            // localStorage.setItem("fastestTimes", JSON.stringify(locallyStoredFastestTimes)); 



            // localStorage.setItem("highScores", JSON.stringify(highScores));
            // localStorage.setItem("starsCollected", JSON.stringify(starsCollected));
            // localStorage.setItem("fastestTime", JSON.stringify(fastestTime)); 
        }



        let timesStored = JSON.parse(localStorage.userTimes);
        if(timesStored[currentLevelGroup] > levelTime || timesStored[currentLevelGroup] == 0)
        {
            timesStored[currentLevelGroup] = Math.round(levelTime);
            localStorage.setItem('userTimes', JSON.stringify(timesStored));
        }
        

        //let nextLevel = track.level + 1;
        //levels[nextLevel].locked = false;
        //levelTemplates[nextLevel] = new LevelTemplate(nextLevel * levelSelectTileSize, nextLevel, 0, 0, 0, false);


        fill(0)
        noStroke()
        rect(50,50, 270, 250);

        fill(chargeColor.negative);
        noStroke();
        rect(115, 160, 150, 35);
        rect(115, 240, 150, 35);

        noStroke();
        fill(255);
        textSize(30);
        text("Personal Best", 190, 90);
        stroke(255);
        line(100,100,280,100);
        

        noStroke();
        fill(255);
        textSize(16);
        text("Highest Score:", 190, 145);
        text("Fastest Time:" , 190, 235);

        textSize(20 * scale.x);
        text(score                              , 190, 185);
        text(millisecondsToTimeFormat(levelTime), 190, 265);





        
        
        fill(chargeColor.negative);
        noStroke();
        rect(width - 372, height/2 + 45, 150, 35);
        rect(width - 202, height/2 + 45, 150, 35);
        
        noStroke();
        fill(255);
        textSize(20);
        //text("Level " + (track.level + 1), width/2, height/2 - 150);
        //text("Level 1", width/2, height/2 - 150);

        //let positiveFeedback = ["Excellent!", "Incredible!", "Great Job!", ]

        text("Excellent!", width - 200, 40);

        text("Score:", width - 125, height/2 + 35);
        text("Time:" , width - 302, height/2 + 35);

        text(score                              , width - 125, height/2 + 70);
        text(millisecondsToTimeFormat(levelTime), width - 302, height/2 + 70);
        
        
        let starsIcons = [false, false, false];
        for (let i = 0; i < numberOfStarsCollected; i++) 
        {
            starsIcons[i]  = true;
        }

        starsIcons.forEach( (star, i) => 
        {
            if (star == true) 
            {
                image(icon.star, width - 350 + (i * 100), 90, 90, 90);
            }
            else
            {
                image(icon.starEmpty, width - 350 + (i * 100), 90, 90, 90);
            }
        });
        
            
    }
    else if (screen.name == "Help") 
    {
        fill(255);
        text("Tap inside the circle\n to place a charge", 80, 100);
        
        text("Press Play \n to test\n your build", width - 50, height - 130);
            
        text("Use the slider to give the charge a positive charge", width/2, height - 50);

        image(icon.circle, 30, 170, chargeDiameter + 20, chargeDiameter + 20);
    }

    

    screen.displayHeader();

    if (screen.name == "Level Select") 
    {
        let levelGroupStars = 0;
        JSON.parse(localStorage.userStars)[currentLevelGroup].forEach(number => {
            levelGroupStars += number
        })

        image(icon.star, width - 50, 10, 30, 30);
        textSize(24);
        fill(255);
        noStroke();
        text(levelGroupStars + "/" + (levels[currentLevelGroup].starPositions.length * 3), width - 80, 35); 
    }
    else if(screen.name == "Level")
    {
        displayTime();
    }
    else if (screen.name == "Group Select")
    {
        image(icon.star, width - 50, 10, 30, 30);

        levels.forEach((level,i) => {

            let buttonX = ((200 * scale.x * (i * 1.5 * scale.x) ) + (100 * scale.x) + groupSelectOffset) / scale.x;

            let imageScale = Math.sqrt( 50 / levels[i].dimentions.x );
            let imageX = buttonX - (((levels[i].dimentions.x * imageScale) * scale.x) - (200* scale.x)) / 2;
            let imageY = screen.buttons[i + 1].y - (((levels[i].dimentions.y * imageScale) * scale.y) - (200* scale.y)) / 2;
            let imageWidth = (levels[i].dimentions.x * imageScale) * scale.x;
            let imageHeight = (levels[i].dimentions.y * imageScale) * scale.y;

            screen.buttons[i + 1].x = buttonX;

            image(trackImages[i].build, imageX, imageY, imageWidth, imageHeight)
        })
    }
    else if (screen.name == "Noise")
    {
        //noLoop();
        // if(testCharges.length == 0)
        // {
        //     testCharges = [new TestCharge(createVector(width/2, height/2), 5)]
        // }
        
        // testCharges[0].display();

        // testCharges[0].trail.push(createVector(noise(noiseValues.x) * width, noise(noiseValues.y,noiseValues.y) * height))
        // noiseValues = createVector(noiseValues.x + 0.005, noiseValues.y + 0.005);
        // testCharges[0].position = createVector(noise(noiseValues.x) * width, noise(noiseValues.y,noiseValues.y) * height)
    }


    if (screen.name == "Settings") 
    {

        

    }
    else
    {
        userNameInput.style("visibility", "hidden");
        classCodeInput.style("visibility", "hidden");
        

    }
        
    displayFrameRate();
}



function navigateTo(screenToShow, backButton)
{
    //screenStack.push(screenToShow);

    if (screenToShow == "Level") 
    {
        dataSent = false;    
    }

    slider.style("visibility", "hidden");
    

    screens.forEach(screen => {
        if (screen.name != screenToShow) 
        {
            screen.visibility = "hidden";
        }
        else
        {
            screen.visibility = "visible";
        }
    });
    currentScreen = screenToShow;

    if (!backButton && screenToShow != "Loading Screen" && screenToShow != "Level Complete") 
    {
        screenStack.push(screenToShow);
    }
   
}

function navigateBack()
{
    if (screenStack.length > 1) 
    {
        screenStack.pop()
        let screenToShow = screenStack[screenStack.length - 1]
        navigateTo(screenToShow, true);
    }
}

class Screen
{
    constructor(props)
    {
        this.name = props.name;
        this.title = props.title;
        this.titlePosition = createVector(props.titlePosition.x  * scale.x, props.titlePosition.y  * scale.y);
        this.titleFontSize = props.titleFontSize * scale.x;
        this.visibility = props.visibility;
        this.backgroundColor = props.backgroundColor;
        this.buttons = props.buttons;
        this.header = props.header;
        this.textBoxes = props.textBoxes;
        this.images = props.images;
        this.functions = props.functions;
    }

    display()
    {
        let screen = this;

        if (screen.functions != null) 
        {
            screen.functions();
        }

    }

    displayHeader()
    {
        let screen = this;

        push();
            noStroke()
            if (screen.header != null) 
            {
                fill("rgba(0,0,0,0.5)");
                rect(0, 0, width, 50 * scale.y);
            }

            textSize(screen.titleFontSize);
            fill(255);
            noStroke();
            text(screen.title, screen.titlePosition.x, screen.titlePosition.y);         

            screen.buttons.forEach(button =>
            {
                button.display();
            });

            screen.textBoxes.forEach(textBox =>
            {
                textBox.display();
            });

            // screen.images.forEach(image =>
            // {
            //     images.display();
            // });
        pop();
    }
}

function createScreens() 
{
    screens = [
        new Screen({
            name: "Home",
            title: "",
            // dynamic electric field interactive
            titlePosition: createVector(200, 100), 
            titleFontSize: 48,
            visibility: "hidden", 
            backgroundColor: "rgba(0,0,0,0)", 
            buttons: [
                new Button({x: 662, y: 75, width: 100, height: 40, title: "PLAY" , onClick: function(){ navigateTo("Group Select"); }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: 512, y: 150, width: 250, height: 40, title: "LEADERBOARD", onClick: function(){ navigateTo("Leaderboard"); }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: 612, y: 225, width: 150, height: 40, title: "SETTINGS", onClick: function(){ navigateTo("Settings"); }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: 662, y: 300, width: 100, height: 40, title: "HELP"    , onClick: function(){ navigateTo("Help"); }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}),
                new Button({x:  10, y:  10, width: 140, height: 20, title: "Change Username", onClick: function(){ navigateTo("Settings"); }, shape: "Rect", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 16, font: fontRegular})
                ],
            textBoxes: [],
            functions: function(){ displayHomeScreen() },
            }), 


        new Screen({
            name: "Settings",
            header: true,
            title: "Settings",
            titlePosition: createVector(406, 30), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15 , y: 10 , width: 30 , height: 30, title: "<"              , onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white"             , fontColor: "black", fontSize: 14}), 
                new Button({x: 316, y: 150, width: 180, height: 45, title: "Change Username", onClick: function(){ displayUsernameInput() }     , shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: 316, y: 200, width: 180, height: 45, title: "Enter Class Code", onClick: function(){ displayClassCodeInput() } , shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 316, y: 300, width: 180, height: 45, title: "Reset Game Progress"  , onClick: "Clear Data"     , shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: 316, y: 100, width: 180, height: 45, title: "Colorblind Mode", onClick: "Colorblind Mode", shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 316, y: 250, width: 180, height: 45, title: "Credits", onClick: function(){ navigateTo("Credits"); }, shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14})
                ],
            textBoxes: [],
            }),

        new Screen({
            name: "Credits",
            header: true,
            title: "Credits",
            titlePosition: createVector(406, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "Settings", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ],
            textBoxes: [
                // new TextBox({x: 406, y: 90, id: "title", text: "Created By:", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Dr. John Barr", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Dr. Colleen Countyman", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Sean Blackford", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Amber Elliott", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Ted Mburu", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Eli Robinson", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Mark Volkov", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Special Thanks:", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Dr. Nate Presopnik", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Yemi Afobali", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
                // new TextBox({x: 406, y: 90, id: "title", text: "Liana Rodelli", font: fontRegular, fontSize: 12, color: "white", visibility: "visible"}),
            ],
            functions: function(){ displayCreditsScreen() }
            }),


        new Screen({
            name: "Help",
            header: true,
            title: "Tutorial/Help",
            titlePosition: createVector(406, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ],
            textBoxes: [],
            }),





        new Screen({
            name: "Leaderboard",
            title: "",
            titlePosition: createVector(406, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x:  15, y: 10, width:  30, height: 30, title: "<", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 130, y: 30, width: 100, height: 25, title: "Score"    , onClick: function(){ toggleLeaderboardSort(); }, shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x:  50, y: 60, width: 356, height: 30, title: "Global"    , onClick: function(){ leaderboardData.section = "Global"; updateLeaderBoard(); }, shape: "Rect", bgColor: "rgba(0,0,0,0.5)", fontColor: "white", fontSize: 14}),
                new Button({x: 406, y: 60, width: 356, height: 30, title: "My Class"    , onClick: function(){ leaderboardData.section = "My Class"; updateLeaderBoard(); }, shape: "Rect", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 14}),
                new Button({x: 612, y: 30, width:  40, height: 25, title: "1"    , onClick: "Levels", shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 712, y: 30, width:  40, height: 25, title: "1"    , onClick: "Levels", shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14})
                ],
            textBoxes: [],
            functions: function(){ displayLeaderboardScreen() },
            }),
            



        new Screen({
            name: "Loading Screen",
            header: false,
            title: "",
            titlePosition: createVector(406, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 692, y: 285, width: 100, height: 50, title: "Play >>"    , onClick: function(){ navigateTo("Level"); }, shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14, visibility: "hidden"})
                ],
            textBoxes: [],
            functions: function(){ displayLoadingScreen() },
            }),


        new Screen({
            name: "Level Select",
            header: true,
            title: "Level Select",
            titlePosition: createVector(406, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x:  15, y:  10, width: 30, height: 30, title: "<", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 742, y: 335, width: 60, height: 30, title: "Why?", onClick: function(){ navigateTo("Help"); }, shape: "Rect", bgColor: "grey", fontColor: "black", fontSize: 14}), 
                ],
                
            textBoxes: [
                new TextBox({x: 270.666, y:  90, id: "title", text: "Track Preview", font: fontRegular, fontSize: 24, color: "white", visibility: "visible"}), 
                new TextBox({x: 609    , y:  90, id: "title2", text: "Pick a Level", font: fontRegular, fontSize: 24, color: "white", visibility: "visible"}), 
                new TextBox({x: 406    , y: 355, id: "hint", text: "Hint: Test Charges don't always follow field lines", font: fontRegular, fontSize: 14, color: "black", visibility: "visible"}), 
                ],
            // images: [
            //     new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: "Group Select", shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
            //     new Button({x: width - 70, y: height - 40, width: 60, height: 30, title: "Why?", onClick: "Help", shape: "Rect", bgColor: "grey", fontColor: "black", fontSize: 14}), 
            //     ],
            }),


        new Screen({
            name: "Group Select",
            header: true,
            title: totalStars + "/45",
            titlePosition: createVector(732, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ],
            textBoxes: [
                // new TextBox({x: width/3, y: 90, id: "title", text: "Track Preview", font: fontRegular, fontSize: 24, color: "white", visibility: "visible"}), 
                ],
                
            functions: function(){ displayGroupScreen() },
            }),

        new Screen({
            name: "Level",
            header: true,
            title: "",
            titlePosition: createVector(406, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "black", 
            buttons: [
                new Button({x:  15, y:  10, width: 30, height: 30, title: "<", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                // new Button({x: width - 40, y: height/2 - 80, width: 60, height: 60, title: "Next"        , onClick: function(){ pressNext(); }        , shape: "Circle", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 772, y: 335, width: 60, height: 60, title: "Build"       , onClick: function(){ toggleGameMode(); }, shape: "Circle", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 767, y:  10, width: 30, height: 30, title: "Redo"        , onClick: function(){ pressRedo(); }     , shape: "Redo", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 727, y:  10, width: 30, height: 30, title: "Help"        , onClick: function(){ navigateTo("Help"); }        , shape: "Help", bgColor: "white", fontColor: "black", fontSize: 14}), 

                ],
            textBoxes: [],
            functions: function(){ displayLevelScreen() },
            }),

        new Screen({
            name: "Level Complete",
            title: "",
            titlePosition: createVector(406, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 480, y: 300, width: 60, height: 40, title: "Replay", onClick: function(){ pressRedo(); }        , shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: 600, y: 300, width: 60, height: 40, title: "Menu", onClick: function(){ navigateTo("Level Select"); }, shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: 720, y: 300, width: 60, height: 40, title: "Next", onClick: function(){ pressNext(); }        , shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 140, y: 300 + 10, width: 100, height: 40, title: "Leaderboard", onClick: function(){ navigateTo("Leaderboard"); } , shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                
                ],
            textBoxes: [],
            }),

        new Screen({
            name: "Noise",
            title: "",
            titlePosition: createVector(406, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [

                ],
            textBoxes: [],
            }),
    ]
}











// text("Switch to build \n mode to create \n Electric Field", width - 150, height - 50);

//                     text("Get the test \n charge to the \n finsh line", track.offset.x + 500, track.offset.y - 60);

//                 pop();
//             }
//         }
//         else
//         {
//             screen.buttons[1].onClick = "Play";
//             screen.buttons[1].title = "Play";
//             if (currentLevelGroup == 0 && currentLevel == 0)
//             {
//                 push();
//                     fill(255);
//                     stroke(0);
//                     textSize(14);

//                     // track.offset.x             track.offset.y
                    

//                     if(charges.length == 0)
//                     {
//                         text("Tap inside the circle\n to create a charge", track.offset.x - 80, track.offset.y - 20);
//                     }
//                     else if(slider.visibility == "visible")
//                     {
//                         if (charges[0].charge > 0)
//                         {
//                             text("Press Play \n to test\n your build", width - 50, height - 130);
//                         }
//                         else
//                         {
//                             textAlign(LEFT);
//                             fill(0);
//                             rect(width - 185, height/2, 150, 100);
//                             fill(255);
//                             text("We call the sign \nand magnitude \nof the charge", width - 165, height/2 + 20);
//                             textAlign(CENTER);
//                             text("Use the slider to make Q positive", width/2, height - 10);
//                             textSize(24);
//                             text("Q.", width - 115, height/2 + 90);