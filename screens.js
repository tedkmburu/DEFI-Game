'use strict';

let levelSelectOffset = 0;
let leaderboardOffset = 0;
let loadPercent = 0;


function getScreen(screenName)  // this function gets the properties of the screen you want from the screens array
{
    let screenIndex = screens.findIndex(x => x.name == screenName);
    return screens[screenIndex];
}

function getScreenIndex(screenName)  // this function gets the index of the screen you want from the screens array
{
    return screens.findIndex(x => x.name == screenName);
}

function getButton(screenName, buttonTitle) // this function gets the properties of the button you want from the buttons array
{
    let screenIndex = screens.findIndex(x => x.name == screenName);
    let buttonIndex = screens[screenIndex].buttons.findIndex(x => x.title == buttonTitle);

    return screens[screenIndex].buttons[buttonIndex];
}

function getButtonIndex(screenName, buttonTitle) // this function gets the index of the button you want from the buttons array
{
    let screenIndex = screens.findIndex(x => x.name == screenName);
    
    return screens[screenIndex].buttons.findIndex(x => x.title == buttonTitle);
}






function displayLoadingScreen()  // this function is called every frame while on the "Loading Screen" screen. It's called in the Screen object on screens.
{
    let screen = getScreen("Loading Screen")
    
    push()
        fill(255);
        rect(0,height - 20, loadPercent, 20)
        
        if(loadPercent < width)
        {
            //loadPercent += width / 90;
            loadPercent += width;
            screen.buttons[1].visibility = "hidden";
        }
        else
        {
            screen.buttons[1].visibility = "visible";
        }

        fill(0);

        let level = levels[currentLevel];


        // this is the black rectangle behing the track preview
        let rectX = 50 * scale.x;
        let rectY = 100 * scale.y;
        let rectWidth = width /2;
        let rectHeight = height /2;
        rect(rectX, rectY, rectWidth, rectHeight);
        
        // this imate is the track preview
        let imageX = (width / 4) - (level.dimentions.x / 2) + (rectX/2);
        let imageY = (height / 2) - (level.dimentions.y / 2) ;
        let imageWidth = (level.dimentions.x);
        let imageHeight = (level.dimentions.y);
        image(trackImages[currentLevel].play, imageX, imageY, imageWidth, imageHeight);

        // this shows the initial positions on the preview of the tracks test charges
        fill("rgba(211, 47, 47, 1)");
        noStroke();
        level.testChargeStartingPositions.forEach( startingPosition => {
            ellipse(startingPosition.x + imageX, startingPosition.y + imageY, testChargeDiameter, testChargeDiameter);
        })


        // this shows the positions on the preview of each star on the track
        level.starPositions.forEach(starPosition => {
            image(icon.star, starPosition.x - starRadius - 2 + imageX, starPosition.y - starRadius - 2 + imageY, starDiameter + 4, starDiameter + 4)
            // ellipse(starPosition.x + imageX, starPosition.y + imageY, starDiameter, starDiameter);
        })
        
    pop()
}






function displayCreditsScreen() // this function is called every frame while on the "Credits" screen. It's called in the Screen object on screens.
{

}




function toggleLeaderboardSort()  // this function is called every time the button is hit to toggle the sorting of the leaderboard
{
    let screenIndex = screens.findIndex(x => x.name == "Leaderboard");
    let screen = screens[screenIndex];
    let SortButton;

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







function displayLeaderboardScreen()     // this function is called every frame while on the "Leaderboard" screen. It's called in the Screen object on screens.
{
    push()
        noStroke()
        fill("rgba(255, 255, 255, 0.25)");
        rect(50 * scale.x, 25 * scale.y, 712 * scale.x, height);

        fill("rgba(0, 0, 0, 0.5)");
        rect(50 * scale.x, 90 * scale.y, 712 * scale.x, height);
    
        textSize(14 * scale.x)
        fill(255);
        //text("Sort By:", 100 * scale.x, 47 * scale.y);
        //text("Group:", 587 * scale.x, 47 * scale.y);
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
        
        let y = 70 * scale.y;
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





// function displaySettings123() 
// {
//     userNameInput.style("visibility", "visible");
//     classCodeInput.style("visibility", "visible");
// }

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







function displayLevelSelectScreen()
{
    let screenIndex = screens.findIndex(x => x.name == "Level Select");
    let screen = screens[screenIndex];

    let trackPositions = [];

    // this gets the user data stored on the device
    let levelsStars = JSON.parse(getItem("userStars"));
    let levelsBestTime = JSON.parse(getItem("userTimes"));
    let levelsHighScore = JSON.parse(getItem("userScores"));
    
    // gets the positions of each button that navigates to a track
    screen.buttons.forEach(button => {
        if (button.shape == "Level") 
        {
            trackPositions.push(createVector(button.x, button.y))
        }
    });


    push()
        trackPositions.forEach((trackPosition, a) => {
            fill(255);
            textSize(10 * scale.x);
            //text(a + 1, trackPosition.x  / 10 + width/3, trackPosition.y + (230 * scale.x));

            if (levelsBestTime[a] > 0) // if the user has completed the level, this will be true
            {
                let x = trackPosition.x + (190 * scale.x);
                let y = trackPosition.y - (16 * scale.y);
                let time = "Best Time: " + millisecondsToTimeFormat(levelsBestTime[a])
                let score = "High Score: " + levelsHighScore[a];

                // displays the grey rectangle behind score and stars
                fill("rgba(0,0,0,0.5)")
                noStroke()
                rect(x - (190 * scale.x), y - (15 * scale.y), 200 * scale.x, 31 * scale.y)
                fill(255)
                rect(x - (190 * scale.x), y + (15 * scale.y), 200 * scale.x, 1 * scale.y)

                // displays the users best time for said tracks
                fill(255)
                textAlign(RIGHT)
                text(time, x, y);
                text(score, x, y + (11 * scale.x));

                for (let i = 0; i < levelsStars[a]; i++) 
                {
                    // puts up a star for each star the user has collected in each track
                    let imageX = trackPosition.x + (i * 25 * scale.x) + (10 * scale.x);
                    let imageY = trackPosition.y - (25 * scale.y);
                    let imageWidth = 20 * scale.x;
                    let imageHeight = 20 * scale.x;
                    image(icon.star, imageX, imageY, imageWidth, imageHeight);

                    
                }

            }


            
        })

        noStroke();
        fill("rgba(0,0,0,0.5)")
        rect(0, height  - 20, width, 100)

        fill(255)
        rect(-1 * levelSelectOffset / (4.255 * scale.x), height  - 20, 100, 100)

    pop()
}






function tutorial()
{
    // push();
    //     fill(255);
    //     stroke(0);
    //     textSize(14);

    //     if(charges.length == 0)
    //     {
    //         text("Tap inside the circle\n to create a charge", track.offset.x - 80, track.offset.y - 20);
    //     }
    //     else if(slider.visibility == "visible")
    //     {
    //         if (charges[0].charge > 0)
    //         {
    //             text("Press Play \n to test\n your build", width - 50, height - 130);
    //         }
    //         else
    //         {
    //             textAlign(LEFT);
    //             fill(0);
    //             rect(width - 185, height/2, 150, 100);
    //             fill(255);
    //             text("We call the sign \nand magnitude \nof the charge", width - 165, height/2 + 20);
    //             textAlign(CENTER);
    //             text("Use the slider to give the charge a positive charge", width/2, height - 30);
    //             textSize(24);
    //             text("Q.", width - 115, height/2 + 90);
    //         }
    //     }
       
    //     image(icon.circle, track.offset.x - 100, track.offset.y + 20, chargeDiameter + 20, chargeDiameter + 20);
        
    // pop();

    let scaledHeight = windowWidth * (375 / 812);
    image(helpScreen, 0, 0, width, scaledHeight);
}






function displayLevelScreen()
{
    displayTrack();
    displayFieldLines();
    displayStars();
    displayTrash();
    displayCharges();
    //displaySlider();
    displayTestCharges();
    displayPortals();


    finished = true;
    
    testCharges.forEach(testCharge => {
        if (!testCharge.finished) 
        {
            finished = false    
        }
    });
    

    if (gameMode == "Play") 
    {
        // if (currentLevel == 0 && currentLevel == 0)
        // {
        //     push();
        //         fill(255);
        //         stroke(0);
        //         textSize(14);
        //         text("Switch to build \n mode to create \n Electric Field", width - 150, height - 50);

        //         text("Get the test \n charge to the \n finsh line", track.offset.x + 500, track.offset.y - 60);

        //     pop();
        // }
    }
    else
    {
        if (currentLevel == 0 && currentLevel == 0)
        {
            //tutorial()
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
        //sendScore(currentLevel, currentLevel,timeElapsed, stars);
        
        let allStars = JSON.parse(getItem("userStars"))
        totalStars = 0;

            allStars.forEach(starsAdd =>
            {
                totalStars += starsAdd;
            })

        sounds.victory.play();
        navigateTo("Level Complete");
    }
    else
    {
        if (!popupVisibile)
        {
            timeElapsed += deltaTime;
        }
    }
}









function displayLevelCompleteScreen()
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

    
    let starsStored = JSON.parse(getItem("userStars"));
    if(starsStored[currentLevel] < numberOfStarsCollected)
    {
        starsStored[currentLevel] = numberOfStarsCollected;
        storeItem('userStars', JSON.stringify(starsStored));
    }

    let timesStored = JSON.parse(getItem("userTimes"));
    if(timesStored[currentLevel] > levelTime || timesStored[currentLevel] == 0)
    {
        timesStored[currentLevel] = Math.round(levelTime);
        console.log(timesStored[currentLevel]);
        storeItem('userTimes', JSON.stringify(timesStored));
    }

    let scoresStored = JSON.parse(getItem("userScores"));
    if(scoresStored[currentLevel] < score)
    {
        scoresStored[currentLevel] = score;
        storeItem('userScores', JSON.stringify(scoresStored));
    }

    if (!dataSent) 
    {
        sendScore({level: 1, group: currentLevel, time: Math.round(timeElapsed), stars: numberOfStarsCollected, score: score, userId: getItem("userId")})
    }
    

    let nextLevel = track.level + 1;
    if (nextLevel < levels.length) 
    {
        levels[nextLevel].locked = false;
    }
    

    fill(0)
    noStroke()
    rect(50 * scale.x, 50 * scale.y, 270 * scale.x, 250 * scale.y);

    fill(chargeColor.negative);
    noStroke();
    rect(115 * scale.x, 160 * scale.y, 150 * scale.x, 35 * scale.y);
    rect(115 * scale.x, 240 * scale.y, 150 * scale.x, 35 * scale.y);

    noStroke();
    fill(255);
    textSize(30 * scale.x);
    text("Personal Best", 190 * scale.x, 90 * scale.y);
    stroke(255);
    line(100 * scale.x, 100 * scale.y, 280 * scale.x, 100 * scale.y);
    

    noStroke();
    fill(255);
    textSize(16 * scale.x);
    text("Highest Score:", 190 * scale.x, 145 * scale.y);
    text("Fastest Time:" , 190 * scale.x, 235 * scale.y);

    textSize(20 * scale.x);
    text(score                              , 190 * scale.x, 185 * scale.y);
    text(millisecondsToTimeFormat(levelTime), 190 * scale.x, 265 * scale.y);





    
    
    fill(chargeColor.negative);
    noStroke();
    rect(440 * scale.x, 232 * scale.y, 150 * scale.x, 35 * scale.y);
    rect(610 * scale.x, 232 * scale.y, 150 * scale.x, 35 * scale.y);
    
    noStroke();
    fill(255);
    textSize(20 * scale.x);
    //text("Level " + (track.level + 1), width/2, height/2 - 150);
    //text("Level 1", width/2, height/2 - 150);

    //let positiveFeedback = ["Excellent!", "Incredible!", "Great Job!", ]

    text("Excellent!", 612 * scale.x, 40 * scale.y);

    text("Score:", 687 * scale.x, 222 * scale.y);
    text("Time:" , 510 * scale.x, 222 * scale.y);

    text(score                              , 687 * scale.x, 257 * scale.y);
    text(millisecondsToTimeFormat(levelTime), 510 * scale.x, 257 * scale.y);
    
    
    let starsIcons = [false, false, false];
    for (let i = 0; i < numberOfStarsCollected; i++) 
    {
        starsIcons[i]  = true;
    }

    starsIcons.forEach( (star, i) => 
    {
        if (star == true) 
        {
            image(icon.star, (462 * scale.x) + (i * (100 * scale.x)), 90 * scale.y, 90 * scale.x, 90 * scale.y);
        }
        else
        {
            image(icon.starEmpty, (462 * scale.x) + (i * (100 * scale.x)), 90 * scale.y, 90 * scale.x, 90 * scale.y);
        }
    });
    
    dataSent = true;
}










function displayHomeScreen()
{
    image(homeTrack, 25 * scale.x, 25 * scale.y, 721 * scale.x, 333 * scale.y);
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

    if (screen.name == "Help") 
    {
        // fill(255);
        // text("Tap inside the circle\n to place a charge", 80, 100);
        
        // text("Press Play \n to test\n your build", width - 50, height - 130);
            
        // text("Use the slider to give the charge a positive charge", width/2, height - 50);

        // image(icon.circle, 30, 170, chargeDiameter + 20, chargeDiameter + 20);
        tutorial()
    }

    

    screen.displayHeader();

    if(screen.name == "Level")
    {
        displayTime();
    }
    else if (screen.name == "Level Select")
    {
        image(icon.star, width - (50 * scale.x), 10 * scale.x, 30 * scale.x, 30 * scale.x);

        levels.forEach((level,i) => {

            let buttonX = ((200 * scale.x * (i * 1.5 * scale.x) ) + (100 * scale.x) + levelSelectOffset) / scale.x;

            let imageScale = Math.sqrt( 50 / level.dimentions.x );
            let imageX = buttonX - (((level.dimentions.x * imageScale) * scale.x) - (200* scale.x)) / 2;
            let imageY = screen.buttons[i + 1].y - (((level.dimentions.y * imageScale) * scale.y) - (200* scale.y)) / 2;
            let imageWidth = (level.dimentions.x * imageScale) * scale.x;
            let imageHeight = (level.dimentions.y * imageScale) * scale.y;

            screen.buttons[i + 1].x = buttonX;

            image(trackImages[i].build, imageX, imageY, imageWidth, imageHeight)
        })
    }


    if (screen.name != "Settings") 
    {
        userNameInput.style("visibility", "hidden");
        classCodeInput.style("visibility", "hidden");
    }
        


    

    displayPopups();

    displayFrameRate();
}



function navigateTo(screenToShow, backButton)
{

    if (screenToShow == "Level") 
    {
        dataSent = false;    
    }
    
    if (screenToShow == "Loading Screen") 
    {
        let screenIndex = screens.findIndex(x => x.name == "Loading Screen");
        let screen = screens[screenIndex];
        screen.title = "Track " + (currentLevel + 1)
        console.log(screen.title);
    }

    charges.forEach(charge => 
    {
        charge.selected = false;
        charge.slider.style("visibility", "hidden");
    });
    charges = []

    let allStars = JSON.parse(getItem("userStars"))
    totalStars = 0;

    allStars.forEach(starsAdd =>
    {
        totalStars += starsAdd;
    })
    

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

    if (!backButton && screenToShow != "Level Complete") 
    {
        screenStack.push(screenToShow);
    }


   
}

function navigateBack()
{
    let screenToShow
    if (screenStack.length > 1) 
    {
        screenStack.pop()
        screenToShow = screenStack[screenStack.length - 1]
        
    }
    if (screenToShow == "Loading Screen") 
    {
        screenToShow = screenStack[screenStack.length - 1]
    }
    navigateTo(screenToShow, true);
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
        // screen object format 
        // new Screen({
        //     name: give it a unique name, 
        //     title: This is text that will appear wherever the title position wants it,
        //     titlePosition: position for the title, 
        //     titleFontSize: font size of the title,
        //     visibility: the visibility of the screen is either "visibile" or "hidden". It's hidden by default, 
        //     buttons: [
        //         button objects that will appear on this screen
        //         ],
        //     textBoxes: [
        //          textbox objects that will appear on the screen
        //     ],
        //     functions: function(){ function that will run every frame while the screen is visible },
        //     }), 




        new Screen({
            name: "Home",
            title: "",
            titlePosition: createVector(200, 100), 
            titleFontSize: 48,
            visibility: "hidden", 
            buttons: [
                new Button({x: 662, y: 75, width: 100, height: 40, title: "PLAY" , onClick: function(){ navigateTo("Level Select"); }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: 512, y: 150, width: 250, height: 40, title: "LEADERBOARD", onClick: function(){ navigateTo("Leaderboard"); }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: 612, y: 225, width: 150, height: 40, title: "SETTINGS", onClick: function(){ navigateTo("Settings"); }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: 662, y: 300, width: 100, height: 40, title: "HELP"    , onClick: function(){ showPopUp("Help") }, shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}),
                //new Button({x:  10, y:  10, width: 140, height: 20, title: "Change Username", onClick: function(){ navigateTo("Settings"); }, shape: "Rect", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 16, font: fontRegular})
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
            buttons: [
                new Button({x: 15 , y: 10 , width: 30 , height: 30, title: "<"              , onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white"             , fontColor: "black", fontSize: 14}), 
                new Button({x: 316, y: 150, width: 180, height: 45, title: "Change Username", onClick: function(){ displayUsernameInput() }     , shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: 316, y: 200, width: 180, height: 45, title: "Enter Class Code", onClick: function(){ displayClassCodeInput() } , shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 316, y: 300, width: 180, height: 45, title: "Reset Game Progress"  , onClick: function(){ resetGame() }, shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
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
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "Settings", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ],
            textBoxes: [
                new TextBox({x: 406, y: 100, class: textClass.credits, text: "Created By:"}),
                new TextBox({x: 406, y: 112, class: textClass.credits, text: "Dr. John Barr"}),
                new TextBox({x: 406, y: 124, class: textClass.credits, text: "Dr. Colleen Countyman"}),
                new TextBox({x: 406, y: 136, class: textClass.credits, text: "Sean Blackford"}),
                new TextBox({x: 406, y: 148, class: textClass.credits, text: "Amber Elliott"}),
                new TextBox({x: 406, y: 160, class: textClass.credits, text: "Ted Mburu"}),
                new TextBox({x: 406, y: 172, class: textClass.credits, text: "Eli Robinson"}),
                new TextBox({x: 406, y: 184, class: textClass.credits, text: "Mark Volkov"}),
                new TextBox({x: 406, y: 208, class: textClass.credits, text: "Special Thanks:"}),
                new TextBox({x: 406, y: 220, class: textClass.credits, text: "Dr. Nate Presopnik"}),
                new TextBox({x: 406, y: 232, class: textClass.credits, text: "Yemi Afobali"}),
                new TextBox({x: 406, y: 244, class: textClass.credits, text: "Alex Powell"}),
                new TextBox({x: 406, y: 256, class: textClass.credits, text: "Liana Rodelli"}),
                
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
            buttons: [
                new Button({x:  15, y: 10, width:  30, height: 30, title: "<", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 130, y: 30, width: 100, height: 25, title: "Score"    , onClick: function(){ toggleLeaderboardSort(); }, shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x:  50, y: 60, width: 356, height: 30, title: "Global"    , onClick: function(){ leaderboardData.section = "Global"; updateLeaderBoard(); }, shape: "Rect", bgColor: "rgba(0,0,0,0.5)", fontColor: "white", fontSize: 14}),
                new Button({x: 406, y: 60, width: 356, height: 30, title: "My Class"    , onClick: function(){ leaderboardData.section = "My Class"; updateLeaderBoard(); }, shape: "Rect", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 14}),
                new Button({x: 612, y: 30, width:  40, height: 25, title: "1"    , onClick: "Levels", shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 712, y: 30, width:  40, height: 25, title: leaderboardData.level , onClick: function(){ increaseLeaderboardLevel() }, shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14})
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
            buttons: [
                new Button({x:  15, y: 10, width:  30, height: 30, title: "<", onClick: function(){ navigateBack() }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 692, y: 285, width: 100, height: 50, title: "Start"    , onClick: function(){ navigateTo("Level");  }, shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14, visibility: "hidden"})
                ],
            textBoxes: [
                new TextBox({x: 501, y: 110, class: textClass.loadingScreen, text: "Objectives: "}), 
                new TextBox({x: 501, y: 150, class: textClass.loadingScreen, text: "1. Collect all the stars  [0/3]"}), 
                new TextBox({x: 501, y: 180, class: textClass.loadingScreen, text: "2. Finish as fast as possible"}), 
                new TextBox({x: 501, y: 210, class: textClass.loadingScreen, text: "3. Stay inside the track"}),
                ],
            functions: function(){ displayLoadingScreen() },
            }),





        new Screen({
            name: "Level Select",
            header: true,
            title: totalStars + "/45",
            titlePosition: createVector(732, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: function(){ navigateTo("Home"); }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ],
            textBoxes: [
                // new TextBox({x: width/3, y: 90, id: "title", text: "Track Preview", font: fontRegular, fontSize: 24, color: "white", visibility: "visible"}), 
                ],
                
            functions: function(){ displayLevelSelectScreen() },
            }),

        new Screen({
            name: "Level",
            header: true,
            title: "",
            titlePosition: createVector(406, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            buttons: [
                new Button({x:  15, y:  10, width: 30, height: 30, title: "<", onClick: function(){ navigateTo("Level Select"); }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                // new Button({x: width - 40, y: height/2 - 80, width: 60, height: 60, title: "Next"        , onClick: function(){ pressNext(); }        , shape: "Circle", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 772, y: 335, width: 60, height: 60, title: "Play"       , onClick: function(){ toggleGameMode(); }, shape: "Circle", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 767, y:  10, width: 30, height: 30, title: "Redo"        , onClick: function(){ pressRedo(); }     , shape: "Redo", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 727, y:  10, width: 30, height: 30, title: "Help"        , onClick: function(){ showPopUp("Help") }        , shape: "Help", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 0, y:  350, width: 25, height: 25, title: "Delete", onClick: function(){ deleteSelectedCharge(); console.log("delete"); }        , shape: "Rect", bgColor: "rgba(0,0,0,0)", fontColor: "black", fontSize: 0}), 

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
            buttons: [
                new Button({x: 480, y: 300, width: 60, height: 40, title: "Replay", onClick: function(){ pressRedo(); }        , shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: 600, y: 300, width: 60, height: 40, title: "Menu", onClick: function(){ navigateTo("Level Select"); }, shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: 720, y: 300, width: 60, height: 40, title: "Next", onClick: function(){ pressNext(); }        , shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 140, y: 300 + 10, width: 100, height: 40, title: "Leaderboard", onClick: function(){ navigateTo("Coming Soon"); } , shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                
                ],
            textBoxes: [],
            functions: function(){ displayLevelCompleteScreen() },
            }),

        new Screen({
            name: "Noise",
            title: "",
            titlePosition: createVector(406, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            buttons: [

                ],
            textBoxes: [],
            }),


        new Screen({
            name: "Coming Soon",
            title: "",
            titlePosition: createVector(406, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            buttons: [
                new Button({x:  15, y:  10, width: 30, height: 30, title: "<", onClick: function(){ navigateBack(); }, shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                
                ],
            textBoxes: [
                new TextBox({x: 250, y: 187.5, id: "hint1", text: "Coming Soon!", font: fontRegular, fontSize: 48, color: "white", visibility: "visible", align: LEFT}), 
                
            ],
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
//             if (currentLevel == 0 && currentLevel == 0)
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