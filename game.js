// data to send: {"time":12299,"timestamp":"11-28-2022","score":19754,"stars_collected":2,"track":"1","_id":123456}


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

    // these are all the images that are used in popups 
    popUpImage = {
        portal: loadImage('images/popups/popup (1).png'), 
        toggle: loadImage('images/popups/toggle.png'), 
        multipleTestCharges: loadImage('images/popups/popup (2).png'), 
        gameMode: loadImage('images/popups/popup (3).png'), 
        slider: loadImage('images/popups/popup (4).png'), 
        eField: loadImage('images/popups/popup (5).png'), 
        track: loadImage('images/popups/popup (6).png'), 
        negative: loadImage('images/popups/popup (7).png'), 

    }
    
    // all sound files that he game plays must be in an mp3 format
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

    // Here I decrease the volume that these specific sounds are played at. They are too loud without the reductions
    sounds.victory.setVolume(0.1);
    sounds.portal.setVolume(0.3);
}


async function setup()    // This function only runs once when the page first loads. 
{
    
    let scaledHeight = windowWidth * (375 / 812);  // 375 / 812 is the aspect ratio of an iphone X. All of the sizes and positions of things are modeled aroung that
    let scaledWidth = windowWidth;
    createCanvas(windowWidth, windowHeight);  // here I create a canvas with the dimentions that fit on the screen

    textFont(fontRegular); // this is the font that I defined in the preload() function

    windowSize = createVector(scaledWidth, scaledHeight).mag();     // this is the size of the screen diagonally.
    scale = createVector(scaledWidth/812, scaledHeight/375);    // this scale is used to scale the size of things in the game up or down depending on the size of the screen

    checkScreenRotation() // checks to make sure the device is in landscape mode

    angleMode(DEGREES);     // this switches the angle mode from radians to degrees. It's important for drawing the feild lines to be in degrees mode
    textAlign(CENTER);      // all text drawn on the screen will now be centered by default
    
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
                levels[i].locked = false; 
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


    if (getItem("firstOpen") == null) 
    {
        showPopUp("New User");
        storeItem("firstOpen", false);
        storeItem("gameVersion", "3.0");
    }
    else
    {
        if (localStorage.gameVersion != "3.0")  
        {
            console.log("Old Version");    
            resetGame();
            location.reload();
            return;
        }
    }

    if (getItem("playSounds") == null) 
    {
        storeItem("playSounds", true);
    }

    


    // this connects to the database and gets the data needed to fill up the leaderboard. It then stores that data on the device
    await updateLeaderBoard();

    // this finds the screen called "Level Select" and adds a button to it for each level. Each button will navigate the user to that level when it's clicked. The button objects are added to that screens buttons properties. These buttons appear as grey squares in the level select screen
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
                    title: "TRACK " + (i + 1), // this is the title at the top of the level
                    onClick: function() // when the button is clicked, the game creates the new track for that level and navigates to the loading screen
                    { 
                        if (levels[i].locked == false) 
                        {
                            currentLevel = i; 
                            changeTrack(currentLevel); 
                            loadPercent = 0; 
                            navigateTo("Loading Screen");  
                        }
                    }, 
                    shape: "Level", 
                    bgColor: "rgba(0,0,0,0.5)", // here is the gray backgrounhd color seen in these buttons in the level select screen
                    fontColor: "white", 
                    fontSize: 14})
            )
    } 
        


        
    
    
    navigateTo(currentScreen); // this navigates to the first screen the users will see when he game is first opened. The screen the user first sees can be set in the variables.js file

    // let loadingDiv = document.getElementById("loadingScreen");
    // loadingDiv.remove();

    document.getElementById("defaultCanvas0").setAttribute("oncontextmenu", "return false"); // this disables the right click context menu on the webpage

    console.log("setup complete"); // this message won't show up in the console if there is an error somewhere in the setup funtion. Useful for debugging on certain devices. 
    
}


function draw() // this function runs every frame. It's used to show the screen that is currently visible. the screen then has functions to show all the things that are supposed to be visible when the user is looking at that screen 
{
    frameRate(60);  // the game will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can

    screens.forEach(screen =>
    {
        if (screen.name == currentScreen) 
        {
            displayScreen(screen) // every frame, the game finds the screen object in the screens array that has a name that matches the currentScreen variable and displays that screen. This will show all buttons, images and textboxes in that screen as well as run its functions
        }
    })

    // checkScreenRotation()
}


function createLevelNavigationButtons() 
{
    let screenIndex = screens.findIndex(x => x.name == "Level Select");
    let screen = screens[screenIndex]
 
    for (let i = 0; i < levels.length; i++) 
    {
        let buttonX = ((200 * scale.x * (i * 1.5  * scale.x) ) + (100 * scale.x) + levelSelectOffset) / scale.x;
        let buttonY = height/3 / scale.y;
        let buttonWidth = 200;
        let buttonHeight = 200;

        screen.buttons.push( 
            new Button(
                {
                    x: buttonX, 
                    y: buttonY, 
                    width: buttonWidth, 
                    height: buttonHeight, 
                    title: "TRACK " + (i + 1), // this is the title at the top of the level
                    onClick: function() // when the button is clicked, the game creates the new track for that level and navigates to the loading screen
                    { 
                        if (levels[i].locked == false) 
                        {
                            currentLevel = i; 
                            changeTrack(currentLevel); 
                            loadPercent = 0; 
                            navigateTo("Loading Screen");  
                        }
                    }, 
                    shape: "Level", 
                    bgColor: "rgba(0,0,0,0.5)", // here is the gray backgrounhd color seen in these buttons in the level select screen
                    fontColor: "white", 
                    fontSize: 14})
            )
    } 

    // the gmae then navigates back to the screen you were looking at when the function was called
    navigateTo(currentScreen); 
}

function togglePlaySounds() 
{
    playSounds = !playSounds; // this toggles the playSounds variable between true and false

    createScreens();    // you then have to createScreens again to update the buttons in the settings menu to have the right background color and text

    // after that, I recreate the buttons in the level select screen because they were removed in the createScreeens() function
    createLevelNavigationButtons() 
}

function updateUsername()
{
    storeItem("userName", userNameInput.value());
}

function updateClassCode()
{
    storeItem("classCode", classCodeInput.value());
}

function toggleColorBlindMode()
{
    colorBlindMode = !colorBlindMode; // this toggles the colorBlindMode variable between true and false
    storeItem("colorBlindMode", colorBlindMode); // the users color preference is then stored locally on the device for the next time they play the game
    

    chargeColor = getColors(); // this function changes the charge colors to match the color mode. The chargeColor variable is also used to display the color of some buttons. Those will change too. 
    textColor = getTextColors(); // this function changes the text colors to match the color mode

    createTextClasses(); // the classes for textboxes are recreated with the new color mode
    createScreens(); // you then have to createScreens again to update the buttons in the settings menu to have the right background color and text

    createLevelNavigationButtons() // recreate the buttons in the level select screen because they were removed in the createScreeens() function
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
        deleteSelectedCharge() // if a charge has its selected propoerty as true, it gets deleted from the charges array
    }
    if (keyCode === 32 && currentScreen == "Level") // when the space bar is hit on a keyboard
    {
        toggleGameMode() // toggles between differnt game modes
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

function mouseDraggedLevel() // only runs when the screen that's currently being displayed is the level screen
{
    if (gameMode == "Build") 
    {
        let mousePosition = createVector(mouseX, mouseY);
        let draggingCharge = null; // this will store the index of the charge that's being dragged

        charges.forEach((charge, i) => { // loop through all charges. Used a JavaScript array function
            if (charge.dragging)    // if the charge's dragging property is true
            {
                draggingCharge = i; // set dragging chages to that charges index
            }
        })


        if (draggingCharge == null) // if no charge is being dragged
        {
            charges.forEach(charge => { // loop through all charges. Used a JavaScript array function
                let distance = mousePosition.dist(charge.position); // get distance between two points. Used p5 vector.dist(vector) function
                if (distance < chargeRadius)    // this is true when the user is dragging a point inside a charge
                {
                    draggingCharge = charge;
                    charge.dragging = true; // this sets dragging equal to true so the next time the mouseDraggedLevel() funciton is called, draggingCharge will not be null
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



function netForceAtPoint(position) // this return the net force at a point as a Vector object
{
    let finalVector = createVector(0,0); // new force will start as a 0 vector then I will add all the force from each charge to it to get the net force
    
    charges.forEach(charge => // loop through all the charges
    {
        let chargePosition = createVector(charge.x, charge.y); 

        //F = KQ / (r^2)
        let kq = charge.charge * k;
        let r = p5.Vector.dist(position, chargePosition);
        if (r < 5)
        {
            r = 5; // this will avoid having extremely large or infinite forces 
        }
        let rSquared = Math.pow(r,2);

        //F = KQ / (r^2)
        let force = kq / rSquared; // magnitude of force

        let theta = chargePosition.sub(position).heading(); // angle of force
        let forceX = force * cos(theta); // x component of force
        let forceY = force * sin(theta); // y component of force

        let forceVector = createVector(forceX, forceY).mult(-1); // force as a vector at one point
        
        finalVector.add(forceVector); // add the force from the charge to the net force.
    });

    prevoiusFinalVector = finalVector;
    return finalVector;
}


function displayFrameRate() // every 20 frames, this will update the frame rate displayed on the screen. If I change it every frame, it is too fast to read
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

function displayTime() // this will display the timer at the top of the level
{
    push();
        textFont('Arial')
        noStroke();
        fill(255);
        textSize(20 * scale.x);
        text(millisecondsToTimeFormat(timeElapsed), 406 * scale.x, 30 * scale.y);
    pop();
}

function displayTrash() // this will display the trash can icon at the bottom left of the screen.
{
    

    push();
        fill(255)
        noStroke()
        rect(0, height - 50, 50, 50);
    pop();

    
    let chargeIsBeingDragged = charges.some(charge => charge.dragging);
    let chargeIsSelected = charges.some(charge => charge.selected);

    if(chargeIsBeingDragged && mouseIsPressed) // if a charge is being dragged, the trash can will move around 
    {
        image(icon.delete, 5 + (Math.random() * 5) - 2.5, height - 45+ (Math.random() * 5) - 2.5, 40, 40);
    }
    else    // if no cahrge is being dragged, the trash can will remain in place
    {
        image(icon.delete, 5 , height - 45, 40, 40);
    }
    

    charges.forEach((charge, i) => 
    {
        if (charge.x < 50 && charge.y > height - 50) // if a charge is positined in the same place as the trash can, it will be deleted
        {
            charges.splice(i,1); // this removes the charge from the charges array or "deletes" it
            createFieldLines(); // after the charge is deleted, the game needs to recalculate the field lines
        }
    })
    
}

function millisecondsToTimeFormat(millis) // this converts time from a millisecond format to a minutes:seconds.milliseconds format
{
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(2);
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function windowResized() // when the windown is resized, these functions will run. This is a p5 inbuilt function
{
    setup();    
    createTracks();
}

function openFullscreen() // this funciton will launch the game in fullscreen. It's currently not called anywhere 
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
    console.log("userID", getItem("userID"));
    if(getItem("userID") == null)
    {
        
        newDevice();

        
        
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

function updateUsernameOnServer() 
{ 
    
    if (getItem("userName") != null && getItem("userName") != "")
    {
        console.log("updated username on server");
        $.ajax({
            type: "GET",
            url: "http://localhost:5000/createStudent",
            data: {
                username: localStorage.userName,
                classCode: "123"
            }, 
            success: function(msg){
                if (msg == "studentAlreadyExists")
                {
                    showPopUp("student already exists");
                }
                else
                {
                    // console.log(msg);
                    storeItem("userID", msg)
                    console.log("user Id is:", getItem("userID"));
                }
                
            }
        });
    }
}

function updateClassCodeOnServer()
{
    if (getItem("userID") != null && getItem("userID") != "")
    {
        $.ajax({
            type: "GET",
            url: "http://localhost:5000/updateClassCode",
            data: {
                user_ID: localStorage.userID,
                classCode: getItem("classCode")
            }, 
            success: function(msg){
                if (msg == "classDoesNotExist")
                {
                    showPopUp("classDoesNotExist");
                    storeItem("classCode", defaultClassCode);
                }
                else
                {
                    console.log("classCodeUpdated");
                    // console.log(msg);
                    // storeItem("userID", msg)
                    // console.log("user Id is:", getItem("userID"));
                }
                
            }
        });
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function sendScore(data)
{
    connectingToServer = true; 

    // let currentdate = new Date(); 
    // let datetime = currentdate.getDate() + "/"
    //                 + (currentdate.getMonth()+1)  + "/" 
    //                 + currentdate.getFullYear() + " @ "  
    //                 + currentdate.getHours() + ":"  
    //                 + currentdate.getMinutes() + ":" 
    //                 + currentdate.getSeconds();
    // {_id: data.userId, level: (track.level + 1).toString(), track: data.group.toString(), stars_collected: data.numberOfStarsCollected, score: data.score, time: data.time, timestamp: getDate()};

    // {"time":9133,"timestamp":"8-4-2021","score":19817,"track":"1","_id":"086cf177-f53f-11eb-bb0b-000d3a162721"}
    // {time:"3456", timestamp:"10/20/2021", score:"264", stars_collected:"1", track:"1", _id:"8a7436fe-f3c2-11eb-bb0b-000d3a162721"}
    // console.log( "stars: " + data.stars);
    // let bodyData = {
    //     time: data.time, 
    //     timestamp: getDate(), 
    //     score: data.score, 
    //     stars_collected: data.stars, 
    //     track: (track.level + 1).toString(), 
    //     _id: 3
    // }

    // let dataToSend = JSON.stringify(bodyData);

    // console.log("data to send: " + dataToSend);
    // console.log("date and time of completion; ", datetime);

    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:5000/sendData",
    //     data: {
    //         _id: 3,
    //         time: data.time, 
    //         timestamp: getDate(),
    //         score: data.score,
    //         stars_collected: data.stars,
    //         track: (track.level + 1)
    //     },   // <== change is here
    //     success: function(msg){
            
    //     }
    // });

    let sendDataLink = `http://localhost:5000/sendData?_id=${data.userID}&time=${data.time}&timestamp=${getDate()}&score=${data.score}&stars_collected=${data.stars}&track=${data.level}`
    let response = await fetch(sendDataLink, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    


    // fetch(".backend/sendData?_id=12345678&time=213&timestamp=213&score=123456&stars_collected=3&track=1").then(function(response) {
    //     return response.json();
    //   }).then(function(data) {
    //     console.log(data);
    //   }).catch(function() {
    //     console.log("Booo");
    //   });

    // fetch('.backend/sendData?_id=12345678&time=213&timestamp=213&score=123456&stars_collected=3&track=1').then(
    //     (response) => response.json()).then(
    //         (data) => console.log(data));


}

async function updateLeaderBoard()
{
    connectingToServer = true; 

    let leaderboardLink = 'http://localhost:5000/leaderboardGame'
    let response = await fetch(leaderboardLink);
    let responseJSON = await response.text()
    currentLeaderboard = JSON.parse(responseJSON.slice(0, -2) + "]");

    console.log("leaderboard updated");
}

async function testSendData()
{
    let bodyData = {
        time: 987123456, 
        timestamp: getDate(), 
        score: 123456, 
        stars_collected: 5, 
        track: 1, 
        _id: 3
    }

    // let formDataList = new FormData();
    // formDataList.append("_id", 4)
    // formDataList.append("time", 5784573)
    // formDataList.append("timestamp", getDate())
    // formDataList.append("score", 12334634)
    // formDataList.append("stars_collected", 6)
    // formDataList.append("track", 1)

    // console.log(formDataList);

    // let sendDataLink2 = 'http://localhost:5000/sendData?_id=1234567890123&time=213&timestamp=213&score=123456&stars_collected=3&track=1'
    // let response = await fetch(sendDataLink2).then(
    //     (response) => response.json()).then(
    //         (data) => console.log(data));

    //         postData('https://example.com/answer', { answer: 42 })
    //         .then((data) => {
    //           console.log(data); // JSON data parsed by `data.json()` call
    //         });
    
    
    let sendDataLink = 'http://localhost:5000/sendData?_id=1234567890123&time=213&timestamp=213&score=123456&stars_collected=3&track=1'
    let response2 = await fetch(sendDataLink, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    console.log(encodeURIComponent(JSON.stringify(JSON.parse(bodyData))))

    // let sendDataLink = 'http://localhost:5000/sendData'
    // let response2 = await fetch(sendDataLink, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: formDataList
    // })

    // console.log(response2);
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:5000/sendData",
    //     data: {
    //         _id: localStorage.userId,
    //         time: 123456, 
    //         timestamp: 123,
    //         score: 123456,
    //         stars_collected: 3,
    //         track: 1
    //     },   // <== change is here
    //     success: function(msg){
    //         // alert(msg);
            
    //     }
        
    // });

    // $.get( "http://localhost:5000/sendData?_id=12345678&time=213&timestamp=213&score=123456&stars_collected=3&track=1" );

    // return false
    // let xhttp = new XMLHttpRequest();
    // xhttp.open("GET", "http://localhost:5000/sendData?_id=1234567890&time=213&timestamp=213&score=123456&stars_collected=3&track=1");
    // xhttp.send();
}

function testleaderboard(level)
{
    // fetch('http://localhost:5000/leaderboardGame/' + level).then(
    //     (response) => response.json()).then(
    //         (data) => console.log(data));

    // let xhttp = new XMLHttpRequest();
    // xhttp.open("GET", "http://localhost:5000/leaderboardGame/" + level);
    // xhttp.send();

//     $.getJSON("localhost:5000/leaderboardGame/" + level, function(data) {
//     console.log(data);
// });

    // fetch("http://localhost:5000/leaderboardGame" + level).then(function(response) {
    //     return response.json();
    //   }).then(function(data) {
    //     console.log(data);
    //   }).catch(function() {
    //     console.log("Booo");
    //   });

    //   $.ajax({
    //     type: "GET",
    //     url: "http://localhost:5000/leaderboardGame/" + level,
    //     data: {
    //         _id: localStorage.userId,
    //         time: 123456, 
    //         timestamp: 123,
    //         score: 123456,
    //         stars_collected: 3,
    //         track: 1
    //     },   // <== change is here
    //     success: function(msg){
    //         alert(msg);
            
    //     }
    // });
}

function updateLeaderBoardScreen() 
{
    // setTimeout(function(){ updateLeaderBoardScreen(); console.log("updated data"); }, 5000);

    // connectingToServer = true; 
    // const response = await fetch('https://ic-research.eastus.cloudapp.azure.com:9000/leaderboard?limit=10&level=' + leaderboardData.level + '&global=true', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    // }).then(res => res.json())
    // .then(json => currentLeaderboard = json)
    // .catch(function(err) 
    // {   
    //   console.error("Can't Get Leaderboard Data: ", err);
    // }); 

    // return await response;
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


function newDevice()
{
    updateUsernameOnServer();

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
    storeItem('classCode', defaultClassCode);
    // console.log("end");

}

async function getLevelScores(levelNumber) 
{
    const scores = await requestTest()

    return scores;

}