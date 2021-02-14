'use strict';

// The preload function is used to load in all the fonts and images. I assign each one to a global variable so I can use it anywhere in the code. Because they are all loaded in the beginning, the user never waits for images to load. After the preload function is complete, the setup() function starts
function preload() 
{
    spaceFont = loadFont('fonts/Anurati.otf');
    fontRegular = loadFont('fonts/Helvetica.ttf');

    backgroundImages = [
        loadImage('images/background1.png'),
        //  loadImage('images/background2.jpg'),
        //   loadImage('images/background3.jpg'),
        //    loadImage('images/background4.jpg')
        ];
    homeTrack = loadImage('images/homeTrack.png');
    blueprint = loadImage('images/blueprint2.png');

    helpScreen = loadImage('images/helpScreen.png');

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
        play: loadImage('images/play.png')
    };

    trackImages = [ 
        {play: loadImage('images/tracks/track (22).png'), build: loadImage('images/tracks/track (23).png')},
        {play: loadImage('images/tracks/track (26).png'), build: loadImage('images/tracks/track (1).png')},
        {play: loadImage('images/tracks/track (24).png'), build: loadImage('images/tracks/track (25).png')},
        {play: loadImage('images/tracks/track (12).png'), build: loadImage('images/tracks/track (13).png')},
        {play: loadImage('images/tracks/track (28).png'), build: loadImage('images/tracks/track (27).png')},
        {play: loadImage('images/tracks/track (2).png'), build: loadImage('images/tracks/track (4).png')},
        {play: loadImage('images/tracks/track (8).png'), build: loadImage('images/tracks/track (9).png')},
        {play: loadImage('images/tracks/track (6).png'), build: loadImage('images/tracks/track (7).png')},
        {play: loadImage('images/tracks/track (20).png'), build: loadImage('images/tracks/track (21).png')},
        {play: loadImage('images/tracks/track (14).png'), build: loadImage('images/tracks/track (16).png')},
        {play: loadImage('images/tracks/track (24).png'), build: loadImage('images/tracks/track (25).png')},
        {play: loadImage('images/tracks/track (11).png'), build: loadImage('images/tracks/track (19).png')},
        {play: loadImage('images/tracks/track (10).png'), build: loadImage('images/tracks/track (18).png')},
        {play: loadImage('images/tracks/track (15).png'), build: loadImage('images/tracks/track (17).png')},
    ]

    soundFormats('mp3');
    sounds = {
        click: loadSound('sounds/click (1).wav'),
        lose: loadSound('sounds/lose.wav'),
        };
}


function setup()    // This function only runs once when the page first loads. 
{
    console.log("setup");
    
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
    userNameInput.input(updateUsername);
    userNameInput.style("visibility", "hidden");

    // creates the input box for a users class code in the Settings screen. The input box is always hidden except for when the user has clicks the button to change it in the settings screen. The input box is stored in the global variable "classCodeInput" and can be referenced anywhere using that varable.
    classCodeInput = createInput(getItem("classCode"));
    classCodeInput.size(180 * scale.x, 45 * scale.y);
    classCodeInput.style("zIndex", "999");
    classCodeInput.position(316 * scale.x, 200 * scale.y);
    classCodeInput.addClass("classCode");
    classCodeInput.input(updateClassCode);
    classCodeInput.style("visibility", "hidden");


    // this connects to the database and gets the data needed to fill up the leaderboard
    updateLeaderBoard();

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

    let loadingDiv = document.getElementById("loadingScreen");
    loadingDiv.remove();
    console.log("setup complete");

    //popups[0].visibility = "visible"
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




function updateUsername()
{
    //storeItem("userName") = userNameInput.value()
}

function updateClassCode()
{
    //storeItem("classCode") = classCodeInput.value()
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
    if (keyCode === 46) // when the "delete" key is pressed on a keyboard
    {
        deleteSelectedCharge()
    }
    if (keyCode === 32) // when the space bar is hit on a keyboard
    {
        toggleGameMode()
    }
}


function mouseClickedLevel(buttonClicked)
{
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

        storeItem('userId', newDevice());
        console.log("userId: ",getItem('userId'));
        storeItem('userName', "Enter Name Here");
        storeItem('classCode', "Enter Class Code Here");

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

function updateLeaderBoard()
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

    let example = "{id: “sdfsdf”, level: “level”, stars_collected: 10, score: 100000, time: 45 }";
    


    currentLeaderboard = []
    for (let a = 0; a < 10; a++) 
    {
        let id = "Username " + Math.round(random() * 1000);
        let randomTime = Math.round(random() * 100000);
        let randomStars = Math.round(random() * 3);
        let randomScore = randomStars > 0 ? (randomTime * randomStars) : 100;
        
        let exampleArray = {id: id, level: "level", stars_collected: randomStars, score: randomScore, time: randomTime }


        currentLeaderboard.push(JSON.stringify(exampleArray));
        
    }


    

}

function sendScore(data)
{
     // endScore({level: 1, group: currentLevel, time: Math.round(timeElapsed), stars: numberOfStarsCollected, score: score, userId: getItem("userId")})

    let dataToSend = {_id: data.userId, level: "1", track: data.group.toString(), stars_collected: data.numberOfStarsCollected, score: data.score, time: data.time};


    // //{_id: “sdfsdf”, level: “level”, stars_collected: 10, score: 100000, time: 45 }
    // //let data = {_id: localStorage.userId, level: level, group: group, stars_collected: numberOfStarsCollected, score: score, time: timeElapsed };
    // let data = {"_id": localStorage.userId, "level": level, "stars_collected": numberOfStarsCollected, score: score, time: timeElapsed };

    let dataJSON = JSON.stringify(dataToSend);
    console.log(dataJSON);



    // fetch("http://ic-research.eastus.cloudapp.azure.com:8080/class/", {
    // method: "post",
    // headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    // },

    // body: dataJSON

    // }).then( (response) => { 
    //     console.log(response);
    // })

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
    fetch('http://ic-research.eastus.cloudapp.azure.com:8080/class/')
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
      console.log('Fetch Error :-S', err);
    });

    

    // fetch("http://ic-research.eastus.cloudapp.azure.com:8080/class/", {
    // method: "post",
    // headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'


    // },

    // //make sure to serialize your JSON body
    // body: JSON.stringify({"_id": "11"})})
    // .then( (response) => { 
    //     console.log(response);
    // //do something awesome that makes the world a better place
    // })



    
}

function newDevice()
{
    fetch('http://ic-research.eastus.cloudapp.azure.com:8080/class/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + window.btoa("test:test")
        },
    }).then((res) => {
        return res.json();
    }).then((json) => {
        storeItem("userId", json.InsertedID);
        console.log(json)
    })
}



// type Attempt struct {
// 	AttemptId      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	Level          string             `json:"level,omitempty" bson:"level,omitempty"`
// 	StarsCollected uint8              `json:"stars_collected,omitempty" bson:"stars_collected,omitempty"`
// 	Score          uint16             `json:"score,omitempty" bson:"score,omitempty"`
// 	Time           uint32             `json:"time,omitempty" bson:"time,omitempty"`
// 	Timestamp      string             `json:"timestamp,omitempty" bson:"timestamp,omitempty"`
// }


// fetch("http://example.com/api/endpoint/", {
//   method: "post",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },

//   //make sure to serialize your JSON body
//   body: JSON.stringify({
//     name: myName,
//     password: myPassword
//   })
// })
// .then( (response) => { 
//    //do something awesome that makes the world a better place
// });



// unlock hard mode at the end



