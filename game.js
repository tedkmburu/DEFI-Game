
// The preload function is used to load in all the fonts and images. I assign each one to a global variable so I can use it anywhere in the code. Because they are all loaded in the beginning, the user never waits for images to load. After the preload function is complete, the setup() function starts
function preload() 
{
    spaceFont = loadFont('fonts/Anurati.otf');
    fontRegular = loadFont('fonts/Helvetica.ttf');

    
    backgroundImage = loadImage('images/background1.png'); // this image is the background while in "play" mode
    homeTrack = loadImage('images/homeTrack.png'); // this is the track that appears on the home screen
    blueprint = loadImage('images/blueprint2.png'); // this image is the background while in "build" mode

    // these are all the icons that the game will use. They are normal images. 
    icon = {
        redo: loadImage('images/redo.png'), 
        star: loadImage('images/star.png'), 
        starEmpty: loadImage('images/starEmpty.png'), 
        delete: loadImage('images/delete.png'), 
        circle: loadImage('images/circle.png'), 
        back: loadImage('images/back.png'), 
        edit: loadImage('images/edit.png'), 
        help: loadImage('images/help.png'), 
        lock: loadImage('images/lock.png'), 
        play: loadImage('images/play.png'),
        portal1: loadImage('images/wormhole (2).png'), 
        portal2: loadImage('images/wormhole (2).png'),
    };

    // these are all the images that the tracks will use split into the "play" and "build" versions of the tracks
    trackImages = [ 
        {play: loadImage('images/tracks/lv1.png'), build: loadImage('images/tracks/lv1build.png')},
        {play: loadImage('images/tracks/lv2.png'), build: loadImage('images/tracks/lv2build.png')},
        {play: loadImage('images/tracks/lv3.png'), build: loadImage('images/tracks/lv3build.png')},
        {play: loadImage('images/tracks/lv4.png'), build: loadImage('images/tracks/lv4build.png')},
        {play: loadImage('images/tracks/lv5.png'), build: loadImage('images/tracks/lv5build.png')},
        
        {play: loadImage('images/tracks/lv7.png'), build: loadImage('images/tracks/lv7build.png')},
        {play: loadImage('images/tracks/lv8.png'), build: loadImage('images/tracks/lv8build.png')},
        {play: loadImage('images/tracks/lv9.png'), build: loadImage('images/tracks/lv9build.png')},
        {play: loadImage('images/tracks/lv10.png'), build: loadImage('images/tracks/lv10build.png')},
        {play: loadImage('images/tracks/lv11.png'), build: loadImage('images/tracks/lv11build.png')},
        
        {play: loadImage('images/tracks/lv6.png'), build: loadImage('images/tracks/lv6build.png')},
        
        {play: loadImage('images/tracks/lv3.png'),  build: loadImage('images/tracks/lv3build.png')},
        {play: loadImage('images/tracks/lv13.png'), build: loadImage('images/tracks/lv13build.png')},
        {play: loadImage('images/tracks/lv14.png'), build: loadImage('images/tracks/lv14build.png')},
        {play: loadImage('images/tracks/lv15.png'), build: loadImage('images/tracks/lv15build.png')},

    ]

    popUpImage = {
        portal: loadImage('images/popups/popup (1).png'), 
        multipleTestCharges: loadImage('images/popups/popup (2).png'), 
        gameMode: loadImage('images/popups/popup (3).png'), 
        slider: loadImage('images/popups/popup (4).png'), 
        eField: loadImage('images/popups/popup (5).png'), 
        track: loadImage('images/popups/popup (6).png'), 
        negative: loadImage('images/popups/popup (7).png'), 

    }

    soundFormats('mp3');

    // these are all the sounds that the game will use
    sounds = {
        click: loadSound('sounds/click (1).mp3'),
        lose: loadSound('sounds/hit.mp3'),
        collect: loadSound('sounds/collect.mp3'),
        victory: loadSound('sounds/victory.mp3'),
        portal: loadSound('sounds/portal.mp3'),
        // click: loadSound('sounds/clickv2.mp3'),
        // lose: loadSound('sounds/failv2.mp3'),
        // collect: loadSound('sounds/starv2.mp3'),
        //victory: loadSound('sounds/successv2.mp3'),
        popup: loadSound('sounds/popupv2.mp3'),
        };

    sounds.victory.setVolume(0.1);
    sounds.portal.setVolume(0.3);
}


async function setup()    // This function only runs once when the page first loads. 
{
    
    let scaledHeight = windowWidth * (375 / 812);  // 375 / 812 is the aspect ratio of an iphone X. All of the sizes and positions of things are modeled aroung that
    let scaledWidth = windowWidth;
    createCanvas(windowWidth, windowHeight);  // here I create a canvas with the dimentions that fit on the screen
    //textFont(calibri);
    textFont(fontRegular);

    windowSize = createVector(scaledWidth, scaledHeight).mag();
    scale = createVector(scaledWidth/812, scaledHeight/375);    // this scale is used to scale the size of things in the game up or down depending on the size of the screen

    checkScreenRotation()

    angleMode(DEGREES);
    textAlign(CENTER);
    frameRate(60);
    createLevels();     // this function is in the levels.js file. It creates all the levels and stores them in the levels variable
    getUserData();      // this function checks if its a new device. If so, it give it a new ID and saves a score and time of 0 on all the levels to the device. If it's not a new device, it counts all the stars the user has collected and puts that into the totalStars variable so it can be displayed on the "Level Select" screen

    if(getItem("userScores") != null)       // this unlocks levels that need to be unlocked and assigns the user's highscore, best time and number of stars colleceted in each level. 
    {
        let highScores = JSON.parse(getItem("userScores"));
        let starsCollected = JSON.parse(getItem("userStars"));
        let fastestTime = JSON.parse(getItem("userTimes"));
        
        for (let i = 0; i < levels.length - 1; i++) 
        {
            levels[i].fastestTime = highScores[i];
            levels[i].starsCollected = starsCollected[i];
            levels[i].highScore = fastestTime[i];
            if (levels[i].fastestTime != 0)
            {
                let nextLevel = i + 1;
                levels[nextLevel].locked = false;       // this unlocks the next level if you have a time saved for a previous level
            }
        }
    }


    createTextClasses();
    createScreens();    // this creates the screen objects into the screens array
    createPopups();    // this creates the Popup objects into the popups array
    createTracks();     // this creates the track objects into the tracks array

    
    // creates the slider that's used to change a charges magnitude. The slider is always hidden except for when the user has selected a charge. The slider is stored in the global variable "slider" and can be referenced anywhere using that varable.
    // slider = createSlider(-5, 5, 0, 1);
    // slider.size(200);
    // slider.value(0);
    // slider.style("zIndex", "999");
    // slider.style("visibility", "hidden");
    // slider.addClass("slider");
    // slider.input(sliderChanged);
    // slider.changed(sliderChanged);
    // slider.visibility = "hidden";

    // slider.position((width/2) - 100, height - 20, "fixed");

    // creates the input box for a user's username in the Settings screen. The input box is always hidden except for when the user has clicks the button to change it in the settings screen. The input box is stored in the global variable "userNameInput" and can be referenced anywhere using that varable.
    userNameInput = createInput(getItem("userName"));
    userNameInput.size(180 * scale.x, 45 * scale.y);
    userNameInput.style("zIndex", "999");
    userNameInput.position(316 * scale.x, 150 * scale.y);
    userNameInput.addClass("username");
    userNameInput.id("username");
    userNameInput.input(updateUsername);
    userNameInput.style("visibility", "hidden");
    document.getElementById("username").placeholder = "Enter Name Here";

    // creates the input box for a users class code in the Settings screen. The input box is always hidden except for when the user has clicks the button to change it in the settings screen. The input box is stored in the global variable "classCodeInput" and can be referenced anywhere using that varable.
    classCodeInput = createInput(getItem("classCode"));
    classCodeInput.size(180 * scale.x, 45 * scale.y);
    classCodeInput.style("zIndex", "999");
    classCodeInput.position(316 * scale.x, 200 * scale.y);
    classCodeInput.addClass("classCode");
    classCodeInput.id("classCode");
    classCodeInput.input(updateClassCode);
    classCodeInput.style("visibility", "hidden");
    document.getElementById("classCode").placeholder = "Enter Class Code Here";


    // this connects to the database and gets the data needed to fill up the leaderboard. It then stores that data on the device
    await updateLeaderBoard();

    // this finds the screen called "Level Select" and adds a button to it for each level. Each button will navigate the user to that level when it's clicked. The button objects are added to that screens buttons properties
    let screenIndex = screens.findIndex(x => x.name == "Level Select");
    let screen = screens[screenIndex]
 
    for (let i = 0; i < levels.length; i++) 
    {
        let buttonX = ((200 * scale.x * (i * 1.5  * scale.x) ) + (100 * scale.x) + levelSelectOffset) / scale.x;
        let buttonY = height/3 / scale.y;
        let buttonWidth = 200;
        let buttonHeight = 200;

        //  the buttons propery for the screen is having buttons added to it
        screen.buttons.push( 
            new Button(
                {
                    x: buttonX, 
                    y: buttonY, 
                    width: buttonWidth, 
                    height: buttonHeight, 
                    title: "TRACK " + (i + 1), 
                    onClick: function(){ currentLevel = i; changeTrack(currentLevel); loadPercent = 0; navigateTo("Loading Screen");  }, 
                    shape: "Level", 
                    bgColor: "rgba(0,0,0,0.5)", 
                    fontColor: "white", 
                    fontSize: 14})
            )
    } 
        


        
    
    
    navigateTo(currentScreen); // this navigates to the first screen the users will see when he game is first opened. The screen the user first sees can be set in the variables.js file

    // let loadingDiv = document.getElementById("loadingScreen");
    // loadingDiv.remove();

    document.getElementById("defaultCanvas0").setAttribute("oncontextmenu", "return false");

    console.log("setup complete");

    if (getItem("firstOpen") == null) 
    {
        showPopUp("New User");
        storeItem("firstOpen", false);
        storeItem("gameVersion", "1.0");
    }

    if (getItem("playSounds") == null) 
    {
        storeItem("playSounds", true);
    }

    //showPopUp("New User")

    
}


function draw() // this function runs every frame. It's used to show the screen that is currently visible. the screen then has functions to show all the things that are supposed to be visible when the user is looking at that screen 
{

    screens.forEach(screen =>
    {
        if (screen.name == currentScreen) 
        {
            displayScreen(screen)
        }
    })

    checkScreenRotation()
}


function togglePlaySounds() 
{
    playSounds = !playSounds;

    // console.log("play sounds: ", playSounds);

    createScreens();

    let screenIndex = screens.findIndex(x => x.name == "Level Select");
    let screen = screens[screenIndex]
 
    for (let i = 0; i < levels.length; i++) 
    {
        let buttonX = ((200 * scale.x * (i * 1.5  * scale.x) ) + (100 * scale.x) + levelSelectOffset) / scale.x;
        let buttonY = height/3 / scale.y;
        let buttonWidth = 200;
        let buttonHeight = 200;

        //  the buttons propery for the screen is having buttons added to it
        screen.buttons.push( 
            new Button(
                {
                    x: buttonX, 
                    y: buttonY, 
                    width: buttonWidth, 
                    height: buttonHeight, 
                    title: "TRACK " + (i + 1), 
                    onClick: function(){ currentLevel = i; changeTrack(currentLevel); loadPercent = 0; navigateTo("Loading Screen");  }, 
                    shape: "Level", 
                    bgColor: "rgba(0,0,0,0.5)", 
                    fontColor: "white", 
                    fontSize: 14})
            )
    } 


    navigateTo(currentScreen);
}

function updateUsername()
{
    storeItem("userName", userNameInput.value());
    // console.log(localStorage.userName);
}

function updateClassCode()
{
    storeItem("classCode", classCodeInput.value());
}
function toggleColorBlindMode()
{
    colorBlindMode = !colorBlindMode;
    storeItem("colorBlindMode", colorBlindMode);
    
    // console.log("Colorblind Mode: " + colorBlindMode);
    chargeColor = getColors();
    textColor = getTextColors();

    createTextClasses();
    createScreens();

    let screenIndex = screens.findIndex(x => x.name == "Level Select");
    let screen = screens[screenIndex]
 
    for (let i = 0; i < levels.length; i++) 
    {
        let buttonX = ((200 * scale.x * (i * 1.5  * scale.x) ) + (100 * scale.x) + levelSelectOffset) / scale.x;
        let buttonY = height/3 / scale.y;
        let buttonWidth = 200;
        let buttonHeight = 200;

        //  the buttons propery for the screen is having buttons added to it
        screen.buttons.push( 
            new Button(
                {
                    x: buttonX, 
                    y: buttonY, 
                    width: buttonWidth, 
                    height: buttonHeight, 
                    title: "TRACK " + (i + 1), 
                    onClick: function(){ currentLevel = i; changeTrack(currentLevel); loadPercent = 0; navigateTo("Loading Screen");  }, 
                    shape: "Level", 
                    bgColor: "rgba(0,0,0,0.5)", 
                    fontColor: "white", 
                    fontSize: 14})
            )
    } 


    navigateTo(currentScreen);
}




function checkScreenRotation()
{
    // if (window.screen.orientation.type != "landscape-primary" &&  window.screen.orientation.type != "landscape-secondary")
    // {
    //     // document.body.setAttribute( "style", "-webkit-transform: rotate(-90deg);");

    //     // resizeCanvas(windowHeight, windowWidth);
    //     // scale = createVector(height/375, width/812);
    //     // windowSize = createVector(width, height).mag(); 
    //     push()
    //         fill(0);
    //         rect(0, 0, width, height);
    //     pop()
        
    // }
    // else
    // {
    //     // document.body.setAttribute( "style", "-webkit-transform: rotate(0deg);");
    // }
    //createScreens();
}

window.addEventListener("orientationchange", function(event) 
{
    console.log("the orientation of the device is now " + event.target.screen.orientation.type);
    checkScreenRotation();
});


function keyPressed() 
{
    if (keyCode === 46 && currentScreen == "Level") // when the "delete" key is pressed on a keyboard
    {
        deleteSelectedCharge()
    }
    if (keyCode === 32 && currentScreen == "Level") // when the space bar is hit on a keyboard
    {
        toggleGameMode()
    }
}


function mouseClickedLevel(buttonClicked)
{
    //console.log(buttonClicked);
    // let notTouchingACharge = true;
    // let selectedCharge = null;
    // let mousePosition = createVector(mouseX, mouseY);
    
    

    // if (!buttonClicked && gameMode == "Build" && mouseY < height - 20 && mouseTapped) 
    // {
        
    //     charges.forEach(charge => {
    //         charge.selected = false;
    //         charge.dragging = false;
    
    //         let distance = mousePosition.dist(charge.position);
    //         if (distance < chargeRadius)
    //         {
    //             notTouchingACharge = false;
    //             selectedCharge = charge;
    //         }
    //     });
        
        
    //     if (notTouchingACharge && selectedCharge == null && !finished)
    //     {
    //         if (mouseY > 50 && mouseY < height - 60) 
    //         {
    //             createCharge(mousePosition, 0);
    //         }

    //     }
    //     else
    //     {
    //         slider.value(selectedCharge.charge);
    //         selectedCharge.selected = true;
    //     }
    // }
    // else if(gameMode == "Play")
    // {
    //     // console.log(p5.Vector.sub(mousePosition, levels[currentLevel].trackOffset));
    // }
    
}

function mouseDraggedLevel()
{
    if (gameMode == "Build") 
    {
        let mousePosition = createVector(mouseX, mouseY);
        let draggingCharge = null;

        charges.forEach((charge, i) => {
            if (charge.dragging)
            {
                draggingCharge = i;
            }
        })


        if (draggingCharge == null)
        {
            charges.forEach(charge => {
                let distance = mousePosition.dist(charge.position);
                if (distance < chargeRadius)
                {
                    draggingCharge = charge;
                    charge.dragging = true;
                }
            })
        }
        else
        {
            charges.forEach(charge => {
                charge.dragging = false;
                charge.selected = false;
            });

            draggingCharge = charges[draggingCharge];
            draggingCharge.dragging = true;
            draggingCharge.x = constrain(mouseX,0,width);
            draggingCharge.y = constrain(mouseY,0,height);
            draggingCharge.position = createVector(mouseX, mouseY);

            createFieldLines();
        }
    }
    



    // console.log(Math.round(p5.Vector.dist(mousePosition, mousePosition2)));

    // let chargePositions = []
    // for (let i = 0; i < charges.length; i++) 
    // {
    //     chargePositions.push(p5.Vector.dist(charges[i].position, mousePosition));
    // }

    // if((mousePosition.y < height  || mousePosition.x < 50) && Math.min(...chargePositions) < chargeDiameter && !finished && gameMode == "Build")
    // {
    //     let chargeDragged = null;
    //     charges.forEach(charge =>
    //     {
    //         if (charge.selected)
    //         {
    //             chargeDragged = charge;
    //         }
    //     });


    //     if (chargeDragged == null)
    //     {
            
    //         for (let i = charges.length - 1; i >= 0; i--)
    //         {
    //             charges[i].dragging = false;
    //             let distance = mousePosition.dist(charges[i].position);
    //             if (distance < chargeDiameter && chargeDragged == null)
    //             {
    //                 chargeDragged = charges[i];
    //                 chargeDragged.dragging = true;
    //             }
    //         }
    //         if (chargeDragged != null && chargeDragged.dragging)
    //         {

    //             chargeDragged.x = constrain(mouseX, 0, width);
    //             chargeDragged.y = constrain(mouseY, 70, height);
    //             chargeDragged.position = createVector(mouseX, mouseY);
    //             chargeDragged.dragging = true;
    //             createFieldLines(); 
    //         }
    //     }
    //     else
    //     {
    //         for (let i = charges.length - 1; i >= 0; i--)
    //         {
    //             charges[i].selected = false;
    //         }

    //         chargeDragged.x = constrain(mouseX,0,width);
    //         chargeDragged.y = constrain(mouseY,70,height);
    //         chargeDragged.position = createVector(mouseX, mouseY);
    //         chargeDragged.dragging = true;
    //         createFieldLines(); 
    //     }   
    // }
    
    
}



function netForceAtPoint(position)
{
    let finalVector = createVector(0,0);
    
    charges.forEach(charge =>
    {
        let chargePosition = createVector(charge.x, charge.y);

        //F = KQ / (r^2)
        let kq = charge.charge * k;
        let r = p5.Vector.dist(position, chargePosition);
        if (r < 5)
        {
            r = 5;
        }
        let rSquared = Math.pow(r,2);

        //F = KQ / (r^2)
        let force = kq / rSquared;

        let theta = chargePosition.sub(position).heading();
        let forceX = force * cos(theta);
        let forceY = force * sin(theta);

        let forceVector = createVector(forceX, forceY).mult(-1);
        
        finalVector.add(forceVector);
    });

    prevoiusFinalVector = finalVector;
    return finalVector;
}


function displayFrameRate()
{
    if (frameCount % 20 == 0) 
    {
        currentFrameRate = frameRate();
    }
    push();
        noStroke();
        fill(100);
        textSize(20);
        text(round(currentFrameRate), width - 125, 25);
    pop();
}

function displayTime()
{
    push();
        textFont('Arial')
        noStroke();
        fill(255);
        textSize(20 * scale.x);
        text(millisecondsToTimeFormat(timeElapsed), 406 * scale.x, 30 * scale.y);
    pop();
}

function displayTrash()
{
    

    push();
        fill(255)
        noStroke()
        rect(0, height - 50, 50, 50);
    pop();

    let chargeIsBeingDragged = charges.some(charge => charge.dragging);
    let chargeIsSelected = charges.some(charge => charge.selected);

    if(chargeIsBeingDragged && mouseIsPressed)
    {
        image(icon.delete, 5 + (Math.random() * 5) - 2.5, height - 45+ (Math.random() * 5) - 2.5, 40, 40);
    }
    else
    {
        image(icon.delete, 5 , height - 45, 40, 40);
    }
    

    charges.forEach((charge, i) =>
    {
        if (charge.x < 50 && charge.y > height - 50)
        {
            charges.splice(i,1);
            createFieldLines(); 
        }
    })
    
}

function millisecondsToTimeFormat(millis) 
{
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(2);
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function windowResized()
{


    setup();    
    createTracks()
}

function openFullscreen() 
{
    fullscreen();
    resizeCanvas(windowWidth, windowHeight);
    windowSize = createVector(width, height).mag();

    // var elem = document.getElementById("defaultCanvas0");

    // if (elem.requestFullscreen) {
    //   elem.requestFullscreen();
    // } else if (elem.mozRequestFullScreen) { /* Firefox */
    //   elem.mozRequestFullScreen();
    // } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    //   elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) { /* IE/Edge */
    //   elem.msRequestFullscreen();
    // }
}




function getUserData()
{
    if(localStorage.length == 0)
    {
        let userScores = [];
        let userStars = [];
        let userTimes = [];

        levels.forEach(level =>
        {
            userScores.push(0);
            userStars.push(0);
            userTimes.push(0);
        })

        storeItem('userScores', JSON.stringify(userScores));
        storeItem('userStars', JSON.stringify(userStars));
        storeItem('userTimes', JSON.stringify(userTimes));

        // newDevice();
        

        totalStars = 0;
    }
    else
    {
        let stars = JSON.parse(getItem("userStars"))
 
        totalStars = 0;

        stars.forEach(stars =>
        {
            totalStars += stars;
        })
    }
}

function updateScore(levelGroup, level)
{

}

async function updateLeaderBoard()
{
    // for (let y = 100; y < height; y+=50) 
    //                 {
    //                     fill("rgba(255, 255, 255, 0.25)")
    //                     noStroke();
    //                     rect(75, y, width - 150, 40);

    //                     fill(255);
    //                     text(((y/50)-1) + ".", 125, y + 25);
    //                     text("NAME " + ((y/50)-1), width/2 - 100, y + 25);
    //                     text("IC PHYS 101", width /2 + 100, y + 25);
    //                     text(Math.round(10000/((y/25)-1)), width - 100, y + 25);
    //                 }

    // let example = "{id: “sdfsdf”, level: “level”, stars_collected: 10, score: 100000, time: 45}";
    


    
    let newLeaderboard = await getLevelScores()
    if (newLeaderboard == null || newLeaderboard.length == 0)
    {
        currentLeaderboard = []
    }
    else
    {
        currentLeaderboard = []

        newLeaderboard.forEach(attempt =>
            {
                currentLeaderboard.push(attempt)
            })

    }
    

    // let newLeaderboard = []

    // currentLeaderboard.forEach( entry => 
    //     {
    //         newLeaderboard.push({_id: entry._id, level: entry.attempt.level, score: entry.attempt.score, time: entry.attempt.time})
    //     })

    // currentLeaderboard = newLeaderboard;

    // let whatToSortBy = (leaderboardData.sort == "score") ? "score" : "time"

    // let sortAscOrDesc = (leaderboardData.sort == "time") ? "asc" : "desc"

    // currentLeaderboard.sort(compareValues(whatToSortBy, sortAscOrDesc))


    


    //   console.log(currentLeaderboard);

    




    // lv1scores 

    // for (let a = 0; a < 10; a++) 
    // {
    //     let id = "Username " + Math.round(random() * 1000);
    //     let randomTime = Math.round(random() * 100000);
    //     let randomStars = Math.round(random() * 3);
    //     let randomScore = randomStars > 0 ? (randomTime * randomStars) : 100;
        
    //     let exampleArray = {id: id, level: "level", stars_collected: randomStars, score: randomScore, time: randomTime }


    //     currentLeaderboard.push(JSON.stringify(exampleArray));
        
    // }


    

}

function compareValues(key, order = 'asc') 
{
    return function innerSort(a, b) 
    {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) 
      {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
}

// all requests from this device

async function updateUsernameOnServer() 
{ 
    // console.log("userId: ", localStorage.userId);

    let bodyData = {student_name: localStorage.userName, class_name: "PHYS-102"};
    let responseLink = "http://ic-research.eastus.cloudapp.azure.com:8080/device/" + localStorage.userId

    // console.log(bodyData);
    // console.log(responseLink);

    const response = await fetch(responseLink, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + window.btoa("test:test")
        },
        body: JSON.stringify(bodyData)
    }).then(data => {
        return data.json()
    }).catch(function(err) 
    {
      console.error("Can't Update Username :-S", err);
    });
}


async function requestTest()
{
    connectingToServer = true; 
    const response = await fetch('http://ic-research.eastus.cloudapp.azure.com:8080/leaderboard?limit=10&level=' + leaderboardData.level + '&global=true', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + window.btoa("test:test")
        },
    }).catch(function(err) 
    {
      console.error("Can't Get Leaderboard Data :-S", err);
    });

     

    //console.log(result);
    return await response.json();
}






function sendScore(data)
{
     // endScore({level: 1, group: currentLevel, time: Math.round(timeElapsed), stars: numberOfStarsCollected, score: score, userId: getItem("userId")})

    let dataToSend = {_id: data.userId, level: (track.level + 1).toString(), track: data.group.toString(), stars_collected: data.numberOfStarsCollected, score: data.score, time: data.time, timestamp: getDate()};

    // //{_id: “sdfsdf”, level: “level”, stars_collected: 10, score: 100000, time: 45 }
    // //let data = {_id: localStorage.userId, level: level, group: group, stars_collected: numberOfStarsCollected, score: score, time: timeElapsed };
    // let data = {"_id": localStorage.userId, "level": level, "stars_collected": numberOfStarsCollected, score: score, time: timeElapsed };

    let dataJSON = JSON.stringify(dataToSend);
    // console.log(dataJSON);



    fetch("http://ic-research.eastus.cloudapp.azure.com:8080/device/", {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + window.btoa("test:test")
    },

    body: dataJSON


    }).then( (response) => { 
        // console.log(response);
    }).catch(function(err) 
    {
      console.error("Can't Send Data :-S", err);
    });

    // console.log("data sent");
        
}


function getDate()
{
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();

    today = mm+'-'+dd+'-'+yyyy;
    return today;
}

function tryFetchData()
{
    //https://virtserver.swaggerhub.com/efieldrestful-api-IC/efield/1.0/device/
    //http://ic-research.eastus.cloudapp.azure.com:8080/class/
    fetch('http://ic-research.eastus.cloudapp.azure.com:8080/device/' + localStorage.userId)
        .then(
            function(response) 
            {
                if (response.status !== 200) 
                {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                
                response.json().then(function(data) 
                {
                    console.log(data);
                    return data;
                });
            } 
        )
    .catch(function(err) 
    {
      console.error('Fetch Error :-S', err);
    });



}

function newDevice()
{
    fetch('http://ic-research.eastus.cloudapp.azure.com:8080/device/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + window.btoa("test:test")
        },
    }).then(res => {
        return res.json()
    }).then((json) => {
        storeItem("userId", json.InsertedID)
        updateUsernameOnServer();
    })

    
}



async function getLevelScores(levelNumber) 
{
    const scores = await requestTest()

    return scores.stats;

}