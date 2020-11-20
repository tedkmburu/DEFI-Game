'use strict';

let groupSelectOffset = 0;
let loadPercent = 0;

function displayScreen()
{
    background("red");
    if(gameMode == "Build" && currentScreen == "Level")
    {
        image(blueprint, 0, 0, width, height);
    }
    else
    {
        image(backgroundImage, 0, 0, width, height);
    }
    

    screens.forEach(screen => 
    {
        if (screen.visibility != "hidden") 
        {
            screen.display();

            if (screen.name == "Level Select") 
            {
                // levelTemplates.forEach(level => 
                // {
                //     level.display();
                // });
                let scale = 0.5;
                let offset = p5.Vector.mult(levels[currentLevelGroup].trackOffset, scale);

                push()
                    fill(255);
                    text("Track Preview", width/3 ,90);
                    text("Pick a Level", 3 * (width/4) ,90);
                    fill(0);
                    rect(50,100, width * scale, height * scale)
                    let showTrack = new Track(currentLevelGroup, scale, p5.Vector.add(offset, createVector(50,100)), false);
                    showTrack.display();

                    let squareWidth = 70;
                    let y = 100;
                    let x = (width * scale);
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
                        text(i + 1, x + squareWidth/2, y + squareWidth/2 + 15)

                        let levelsStars = JSON.parse(localStorage.getItem("userStars"))[currentLevelGroup][i];

                        for (let stars = 0; stars < levelsStars; stars++)
                        {
                            image(icon.star, x + squareWidth/2 - (15 * stars) + 10, y + 5, squareWidth/5, squareWidth/5);
                        }
                        
                    }

                    // image(icon.star, x - 80, y - 85, squareWidth/5, squareWidth/5);
                    // image(icon.star, x - 60, y - 85, squareWidth/5, squareWidth/5);
                    // image(icon.star, x - 40, y - 85, squareWidth/5, squareWidth/5);

                    rect(0, height - 50, width, 50);
                    fill(0);
                    textSize(14);
                    text("Hint: Test Charges don't always follow field lines", width/2, height - 20);
                    
                    // fill(100)
                    // rect(width - 70, height - 40, 60,30)
                    // fill(0)
                    // text("Why?", width - 40, height - 20);



                pop()
            }
            else if (screen.name == "Group Select") 
            {
                
                levels.forEach((level,i) => {

                    // if (mouseIsPressed) {
                    //     stroke("red")
                    //     strokeWeight(5)
                    //     rect((200 * (i * 1.5) + 100 + groupSelectOffset) , height/3, 200, 200)
                    //     strokeWeight(0)
                    // }

                    push()
                        let squareWidth = 200;
                        let x = squareWidth * (i * 1.5) + 100 + groupSelectOffset;
                        let y = height/3;

                        

                        
                        strokeWeight(0)
                        fill(0);
                        rect(x, y, squareWidth, squareWidth);
                        fill(255);
                        noStroke();
                        textSize(16)
                        text((i + 1) + ". " + level.name,x + squareWidth/2,y + 30)

                        let starsRequired = 0;
                        for (let a = 0; a < i; a++) 
                        {
                            starsRequired += 12; 
                        }

                        if ( starsRequired > totalStars) 
                        {
                            
                            image(icon.lock, x + 50, y + 60, squareWidth/2, squareWidth/2);
                            image(icon.star, x + 90, y + 110, squareWidth/5, squareWidth/5);
                            
                            
                            

                            push();
                                fill(0);
                                text(starsRequired, x + 80,y + 140);
                            pop();
                        }
                        else
                        {
                            levels[i].locked = false;

                            let showTrack = new Track(i, 0.25, createVector(x + 40,y + 100), false);
                            showTrack.display();
                        }

                        if (i == 0) 
                        {
                            image(tracks[i].play, x + 15, height/2 + 25, 175 , (175 / tracks[i].play.width) * height);
                        }
                    pop()
                });

            }
            else if (screen.name == "Level") 
            {
                //screen.backgroundColor = (gameMode == "Play") ? 0 : "#37474F";
                
                
                displayTrack();
                displayFieldLines();
                displayStars();
                displayTrash();
                displayCharges();
                displaySlider();
                displayTestCharges();
                

                if (gameMode == "Play") 
                {
                    screen.buttons[2].onClick = "Build";
                    screen.buttons[2].title = "Build";
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
                    screen.buttons[2].onClick = "Play";
                    screen.buttons[2].title = "Play";
                    if (currentLevelGroup == 0 && currentLevel == 0)
                    {
                        push();
                            fill(255);
                            stroke(0);
                            textSize(14);

                            // track.offset.x             track.offset.y
                            

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
                                    text("Use the slider to make Q positive", width/2, height - 10);
                                    textSize(24);
                                    text("Q.", width - 115, height/2 + 90);
                                }
                            }

                            // noFill();
                            // stroke(255);
                            // for (let angle = 0; angle < 360; angle+= 20) 
                            // {
                            //     arc(70, 200, chargeDiameter + 10, chargeDiameter + 10, angle, angle + 10);
                            // }
                            
                            image(icon.circle, track.offset.x - 100, track.offset.y + 20, chargeDiameter + 20, chargeDiameter + 20);
                            
                        pop();
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
                    
                    navigateTo("Level Complete");
                }
                else
                {
                    timeElapsed += deltaTime;
                }
            }
            else if (screen.name == "Loading Screen") 
            {
                fill(255);
                rect(0,height - 20, loadPercent, 20)
                
                if(loadPercent < width)
                {
                    loadPercent += width / 90;
                    screen.buttons[0].visibility = "hidden";
                }
                else
                {
                    screen.buttons[0].visibility = "visible";
                }
            }
            else if (screen.name == "Home") 
            {
                image(homeTrack, 50, 50, width/1.125, height/1.125);
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
                if(starsStored[currentLevelGroup][currentLevel] < numberOfStarsCollected)
                {
                    starsStored[currentLevelGroup][currentLevel] = numberOfStarsCollected;
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
                if(timesStored[currentLevelGroup][currentLevel] > levelTime || timesStored[currentLevelGroup][currentLevel] == 0)
                {
                    timesStored[currentLevelGroup][currentLevel] = Math.round(levelTime);
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

                textSize(20);
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
            else if (screen.name == "Credits") 
            {
                noStroke();
                fill(255);
                textSize(18);
                text("Created by: ", width/2, 100);

                let gameCreators = [ "Dr. John Barr",  "Dr. Colleen Countyman", " ", "Sean Blackford", "Amber Elliott", "Ted Mburu", "Eli Robinson", " "];
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
            else if (screen.name == "Help") 
            {
                fill(255);
                text("Tap inside the circle\n to place a charge", 80, 100);
                
                text("Press Play \n to test\n your build", width - 50, height - 130);
                    
                text("Use the slider to give the charge a positive charge", width/2, height - 50);

                image(icon.circle, 30, 170, chargeDiameter + 20, chargeDiameter + 20);
            }
            else if (screen.name == "Leaderboard") 
            {
                fill("rgba(255, 255, 255, 0.25)");
                rect(50, 25, width - 100, height);

                fill("rgba(0, 0, 0, 0.5)");
                rect(50, 90, width - 100, height);
                push()
                    fill(255);
                    text("Sort By:", 100, 47);
                    text("Group:", width - 225, 47);
                    text("Level:", width - 125, 47);
                    
                    let y = 100;
                    //let leaderboardArray = JSON.parse(currentLeaderboard);

                    textSize(16)

                    for (let i = 0; i < currentLeaderboard.length; i++) 
                    {
                        //console.log(user);
                        let user = JSON.parse(currentLeaderboard[i]);
                        //console.log(currentLeaderboard[i]);
                        fill("rgba(255, 255, 255, 0.25)")
                        noStroke();
                        rect(75, y, width - 150, 65);

                        fill(255);
                        // rank
                        text((i + 1) + ".", 100, y + 37.5);

                        // name
                        text(user.id, width/3.5, y + 37.5);

                        // class
                        text("IC PHYS 101", width /2, y + 37.5);

                        // time
                        text(millisecondsToTimeFormat(user.time), width/1.4 , y + 37.5); 
                        
                        // score
                        text(user.score, width - 130, y + 37.5);   
                        
                        y += 75;
                    }
                pop()

                

                
            }
            

            screen.displayHeader();

            if (screen.name == "Level Select") 
            {
                image(icon.star, width - 50, 10, 30, 30);
                textSize(24);
                fill(255);
                noStroke();
                text("0/" + (levels.length * 3), width - 80, 35); 
            }
            else if(screen.name == "Level")
            {
                displayTime();
            }


            if (screen.name == "Settings") 
            {
                userNameInput.style("visibility", "visible");
            }
            else
            {
                userNameInput.style("visibility", "hidden");
            }
        }
    });

    displayFrameRate();
}



function navigateTo(screenToShow)
{
    //screenStack.push(screenToShow);
    

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
}

function navigateBack()
{
    let i = screenStack.length - 1;
    let screenToShow;

    screenToShow = screenStack[i - 1];
        
    navigateTo(screenToShow);
}

class Screen
{
    constructor(props)
    {
        this.name = props.name;
        this.title = props.title;
        this.titlePosition = props.titlePosition;
        this.titleFontSize = props.titleFontSize;
        this.visibility = props.visibility;
        this.backgroundColor = props.backgroundColor;
        this.buttons = props.buttons;
        this.header = props.header;
    }

    display()
    {
        let screen = this;

        push();
            noStroke();
        pop();

    }

    displayHeader()
    {
        let screen = this;

        push();

            if (screen.header != null) 
            {
                fill("rgba(0,0,0,0.5)");
                rect(0, 0, width, 50);
            }

            textSize(screen.titleFontSize);
            fill(255);
            noStroke();
            text(screen.title, screen.titlePosition.x, screen.titlePosition.y);         

            screen.buttons.forEach(button =>
            {
                button.display();
            });
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
                new Button({x: width - 300, y: (1 * height) / 5 , width: 250, height: 50, title: "PLAY" , onClick: "Group Select", shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: width - 320, y: (2 * height) / 5, width: 250, height: 50, title: "LEADERBOARD", onClick: "Leaderboard", shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: width - 300, y: (3 * height) / 5, width: 250, height: 50, title: "SETTINGS", onClick: "Settings", shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont}), 
                new Button({x: width - 300, y: (4 * height) / 5, width: 250, height: 50, title: "HELP"    , onClick: "Help", shape: "Home", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 24, font: spaceFont})
                ]
            }), 


        new Screen({
            name: "Settings",
            header: true,
            title: "Settings",
            titlePosition: createVector(width/2, 30), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15          , y: 10           , width: 30 , height: 30, title: "<"              , onClick: "Home"           , shape: "Back", bgColor: "white"             , fontColor: "black", fontSize: 14}), 
                new Button({x: width/2 - 90, y: height/2 - 50, width: 180, height: 45, title: "Clear Data"     , onClick: "Clear Data"     , shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: width/2 - 90, y: height/2     , width: 180, height: 45, title: "Colorblind Mode", onClick: "Colorblind Mode", shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: width/2 - 90, y: height/2 + 50, width: 180, height: 45, title: "Credits", onClick: "Credits", shape: "Rect"  , bgColor: chargeColor.positive, fontColor: "white", fontSize: 14})
                ]
            }),

        new Screen({
            name: "Credits",
            header: true,
            title: "Credits",
            titlePosition: createVector(width/2, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "Settings", onClick: "Settings", shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ]
            }),



        new Screen({
            name: "Help",
            header: true,
            title: "Tutorial/Help",
            titlePosition: createVector(width/2, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: "Home", shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ]
            }),





        new Screen({
            name: "Leaderboard",
            title: "",
            titlePosition: createVector(width/2, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: "Home", shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: 130, y: 30, width: 100, height: 25, title: "Score"    , onClick: "Level", shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 50, y: 60, width: width/2 - 50, height: 30, title: "Global"    , onClick: "Level", shape: "Rect", bgColor: "rgba(0,0,0,0.5)", fontColor: "white", fontSize: 14}),
                new Button({x: width/2, y: 60, width: width/2 - 50, height: 30, title: "My Class"    , onClick: "Level", shape: "Rect", bgColor: "rgba(0,0,0,0)", fontColor: "white", fontSize: 14}),
                new Button({x: width - 200, y: 30, width: 40, height: 25, title: "1"    , onClick: "Level", shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: width - 100, y: 30, width: 40, height: 25, title: "1"    , onClick: "Level", shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14})
                ]
            }),
            



        new Screen({
            name: "Loading Screen",
            header: false,
            title: "",
            titlePosition: createVector(width/2, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: width - 120, y: height - 90, width: 100, height: 50, title: "Play >>"    , onClick: "Level", shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14, visibility: "hidden"})
                ]
            }),


        new Screen({
            name: "Level Select",
            header: true,
            title: "",
            titlePosition: createVector(width/2, 40), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: "Group Select", shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: width - 70, y: height - 40, width: 60, height: 30, title: "Why?", onClick: "Help", shape: "Rect", bgColor: "grey", fontColor: "black", fontSize: 14}), 
                ]
                // fill(100)
                // rect(width - 70, height - 40, 60,30)
                // fill(0)
                // text("Why?", width - 40, height - 20);
            }),


        new Screen({
            name: "Group Select",
            header: true,
            title: totalStars + "/45",
            titlePosition: createVector(width - 50, 35), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: 15, y: 10, width: 30, height: 30, title: "<", onClick: "Home", shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                ]
            }),

        new Screen({
            name: "Level",
            header: true,
            title: "",
            titlePosition: createVector(width/2, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "black", 
            buttons: [
                new Button({x:         15, y:            10, width: 30, height: 30, title: "Level Select", onClick: "Level Select", shape: "Back", bgColor: "white", fontColor: "black", fontSize: 14}), 
                // new Button({x: width - 40, y: height/2 - 80, width: 60, height: 60, title: "Next"        , onClick: "Next"        , shape: "Circle", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: width - 40, y:   height - 40, width: 60, height: 60, title: "Build"       , onClick: "Play"        , shape: "Circle", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: width - 45, y:            10, width: 30, height: 30, title: "Redo"        , onClick: "Redo"        , shape: "Redo", bgColor: "white", fontColor: "black", fontSize: 14}), 
                new Button({x: width - 85, y:            10, width: 30, height: 30, title: "Help"        , onClick: "Help"        , shape: "Help", bgColor: "white", fontColor: "black", fontSize: 14}), 

                ]
            }),

        new Screen({
            name: "Level Complete",
            title: "",
            titlePosition: createVector(width/2, 50), 
            titleFontSize: 24,
            visibility: "hidden", 
            backgroundColor: "#212121", 
            buttons: [
                new Button({x: width - 212 - 120, y: height/1.25, width: 60, height: 40, title: "Replay", onClick: "Redo"        , shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: width - 212      , y: height/1.25, width: 60, height: 40, title: "Menu", onClick: "Level Select", shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                new Button({x: width - 212 + 120, y: height/1.25, width: 60, height: 40, title: "Next", onClick: "Next"        , shape: "Oval", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}),
                new Button({x: 140, y: height/1.25 + 10, width: 100, height: 40, title: "Leaderboard", onClick: "Leaderboard"        , shape: "Rect", bgColor: chargeColor.positive, fontColor: "white", fontSize: 14}), 
                
                ]
            }),
    ]
}