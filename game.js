'use strict';

// let calibri; 
// function preload() 
// {
//     calibri = loadFont('fonts/calibri.ttf');
// }
function preload() 
{
    spaceFont = loadFont('fonts/Anurati.otf');
    fontRegular = loadFont('fonts/Helvetica.ttf');

    backgroundImages = [loadImage('images/background1.png'), loadImage('images/background2.jpg'), loadImage('images/background3.jpg'), loadImage('images/background4.jpg')];
    homeTrack = loadImage('images/homeTrack.png');
    blueprint = loadImage('images/blueprint.png');

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

    tracks = [
        {play: loadImage('images/tracks/track1.png'), build: loadImage('images/tracks/track1build.png')},
        {play: loadImage('images/tracks/track2.png'), build: loadImage('images/tracks/track2build.png')},
        {play: loadImage('images/tracks/track3.png'), build: loadImage('images/tracks/track3build.png')},
        {play: loadImage('images/tracks/track4.png'), build: loadImage('images/tracks/track4build.png')},
        //{play: loadImage('images/tracks/track5.png'), build: loadImage('images/tracks/track5build.png')},
    ]
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    //textFont(calibri);
    textFont(fontRegular);
    windowSize = createVector(windowWidth, windowHeight).mag();
    scale = createVector(width/812, height/375);

    checkScreenRotation()

    angleMode(DEGREES);
    textAlign(CENTER);
    frameRate(60);
    createLevels();
    getUserData();
    

    // if(localStorage.getItem("highScores") == null)
    // {
    //     let highScores = [];
    //     let starsCollected = [];
    //     let fastestTime = []
    //     levels.forEach(level => 
    //     {
    //         let levelScores = [];
    //         let levelStars = [];
    //         let levelTimes = [];
    //         for (let i = 0; i < level.starPositions.length; i++) 
    //         {
    //             levelScores.push(0);   
    //             levelStars.push(0);   
    //             levelTimes.push(0);   
    //         }
    //         highScores.push(levelScores);   
    //         starsCollected.push(levelStars);   
    //         fastestTime.push(levelTimes); 
    //     })
        
    //     localStorage.setItem("highScores", JSON.stringify(highScores));
    //     localStorage.setItem("starsCollected", JSON.stringify(starsCollected));
    //     localStorage.setItem("fastestTime", JSON.stringify(fastestTime));    
    // }
    // else
    // {
    //     let highScores = JSON.parse(localStorage.getItem("highScores"));
    //     let starsCollected = JSON.parse(localStorage.getItem("starsCollected"));
    //     let fastestTime = JSON.parse(localStorage.getItem("fastestTime"));
        
    //     for (let i = 0; i < levels.length - 1; i++) 
    //     {
    //         levels[i].fastestTime = highScores[i];
    //         levels[i].starsCollected = starsCollected[i];
    //         levels[i].highScore = fastestTime[i];
    //         if (levels[i].fastestTime != 0)
    //         {
    //             let nextLevel = i + 1;
    //             levels[nextLevel].locked = false;
    //         }
    //     }
    // }

    // levels.forEach((level, i) => 
    // {
    //     levelTemplates.push(new LevelTemplate(i * levelSelectTileSize, i, level.fastestTime, level.highScore, level.starsCollected, level.locked));
    // });

    createScreens();

    

    slider = createSlider(-5, 5, 0, 1);
    slider.size(width - 200);
    slider.value(0);
    slider.style("zIndex", "999");
    slider.style("visibility", "hidden");
    slider.addClass("slider");
    slider.input(sliderChanged);
    slider.changed(sliderChanged);
    slider.visibility = "hidden";

    slider.position(100, height - 40, "fixed");

    let savedUsername;
    if (localStorage.userName != null)
    {
        savedUsername = localStorage.userName;
    }
    else
    {
        savedUsername = "Enter Name Here"
    }

    let classCode;
    if (localStorage.classCode != null)
    {
        classCode = localStorage.classCode;
    }
    else
    {
        classCode = "Enter Class Code"
    }

    userNameInput = createInput(savedUsername);
    userNameInput.size(212 * scale.x, 40 * scale.y);
    userNameInput.style("zIndex", "999");
    userNameInput.position(300 * scale.x, 70 * scale.y);
    userNameInput.addClass("username");
    userNameInput.input(updateUsername);
    userNameInput.style("visibility", "hidden");

    classCodeInput = createInput(classCode);
    classCodeInput.size(212 * scale.x, 40 * scale.y);
    classCodeInput.style("zIndex", "999");
    classCodeInput.position(300 * scale.x, 130 * scale.y);
    classCodeInput.addClass("classCode");
    classCodeInput.input(updateClassCode);
    classCodeInput.style("visibility", "hidden");


    
    updateLeaderBoard();
    navigateTo(currentScreen);

}

function updateUsername()
{
    localStorage.userName = userNameInput.value()
}

function updateClassCode()
{
    localStorage.classCode = classCodeInput.value()
}

function draw()
{
    // translate(-(width/2),-(height/2));

    screens.forEach(screen =>
    {
        if (screen.name == currentScreen) 
        {
            displayScreen(screen)    
        }
    })

    checkScreenRotation()
}



function checkScreenRotation()
{
    if (window.screen.orientation.type != "landscape-primary" &&  window.screen.orientation.type != "landscape-secondary")
    {
        // document.body.setAttribute( "style", "-webkit-transform: rotate(-90deg);");

        // resizeCanvas(windowHeight, windowWidth);
        // scale = createVector(height/375, width/812);
        // windowSize = createVector(width, height).mag(); 
        push()
            fill(0);
            rect(0, 0, width, height);
        pop()
        
    }
    else
    {
        // document.body.setAttribute( "style", "-webkit-transform: rotate(0deg);");
    }
    //createScreens();
}

window.addEventListener("orientationchange", function(event) 
{
    console.log("the orientation of the device is now " + event.target.screen.orientation.type);
    checkScreenRotation();
});

function mouseClickedLevel(buttonClicked)
{
    let notTouchingACharge = true;
    let selectedCharge = null;
    let mousePosition = createVector(mouseX, mouseY);
    
    

    if (!buttonClicked && gameMode == "Build" && mouseY < height - 60) 
    {
        
        charges.forEach(charge => {
            charge.selected = false;
            charge.dragging = false;
    
            let distance = mousePosition.dist(charge.position);
            if (distance < chargeDiameter)
            {
                notTouchingACharge = false;
                selectedCharge = charge;
            }
        });
        
        
        if (notTouchingACharge && selectedCharge == null && !finished)
        {
            if (mouseY > 50 && mouseY < height - 60) 
            {
                createCharge(mousePosition);
            }
          
          slider.value(0);
        }
        else
        {
            slider.value(selectedCharge.charge);
            selectedCharge.selected = true;
        }
    }
    else if(gameMode == "Play")
    {
        // console.log(p5.Vector.sub(mousePosition, levels[currentLevelGroup].trackOffset));
    }
    
}

function mouseDraggedLevel()
{
    let mousePosition = createVector(mouseX, mouseY);

    if((mousePosition.y < height - 50 || mousePosition.x < 50) && !finished && gameMode == "Build")
    {
        let chargeDragged = null;
        charges.forEach(charge =>
        {
            if (charge.selected)
            {
                chargeDragged = charge;
            }
        });

        if (chargeDragged == null)
        {
            
            for (let i = charges.length - 1; i >= 0; i--)
            {
                charges[i].dragging = false;
                let distance = mousePosition.dist(charges[i].position);
                if (distance < chargeDiameter && chargeDragged == null)
                {
                    chargeDragged = charges[i];
                    chargeDragged.dragging = true;
                }
            }
            if (chargeDragged != null && chargeDragged.dragging)
            {

                chargeDragged.x = constrain(mouseX,0,width);
                chargeDragged.y = constrain(mouseY,70,height);
                chargeDragged.position = createVector(mouseX, mouseY);
                chargeDragged.dragging = true;
                createFieldLines(); 
            }
        }
        else
        {
            for (let i = charges.length - 1; i >= 0; i--)
            {
                charges[i].selected = false;
            }

            chargeDragged.x = constrain(mouseX,0,width);
            chargeDragged.y = constrain(mouseY,70,height);
            chargeDragged.position = createVector(mouseX, mouseY);
            chargeDragged.dragging = true;
            createFieldLines(); 
        }   
    }
    
    
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
        if (r < 10)
        {
            r = 10;
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
    // let chargeIsBeingDragged = charges.some(charge => charge.dragging);
    // if(chargeIsBeingDragged)
    // {
        push();
            fill(255)
            rect(0, height - 50, 50, 50);
        pop();

        image(icon.delete, 5, height - 45, 40, 40);
    
        charges.forEach((charge, i) =>
        {
            if (charge.x < 50 && charge.y > height - 50)
            {
                charges.splice(i,1);
                createFieldLines(); 
            }
        })
    //}
    
}

function millisecondsToTimeFormat(millis) 
{
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(2);
    return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
//   levelSelectTileSize = window.innerWidth / 2.5;
    scale = createVector(width/812, height/375);
    windowSize = createVector(width, height).mag(); 
    createScreens();

    
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


function makeid(length) 
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


function getUserData()
{
    //console.log(localStorage);
    if(localStorage.length == 0)
    {
        let userScores = [];
        let userStars = [];
        let userTimes = [];

        levels.forEach(level =>
        {
            let tempArray = [];

            level.starPositions.forEach(starPosition =>
            {
                tempArray.push(0);
            })

            userScores.push(tempArray);
            userStars.push(tempArray);
            userTimes.push(tempArray);
        })

        
        localStorage.setItem('userScores', JSON.stringify(userScores));
        localStorage.setItem('userStars', JSON.stringify(userStars));
        localStorage.setItem('userTimes', JSON.stringify(userTimes));
        
        var d = new Date();
        var n = d.getTime();

        let randomID = makeid(10) + month() + day() + year() + n;
        localStorage.setItem('userId', randomID);
        localStorage.setItem('userName', "Enter Name Here");
    }
    else
    {
        // totalStars

        // JSON.parse()
        
        
        let stars = JSON.parse(localStorage.getItem("userStars"))
        totalStars = 0;
        stars.forEach(starGroup =>
        {
            starGroup.forEach(stars =>
            {
                totalStars += stars;
            })
        })
        //console.log(totalStars);
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

function sendScore(level, group, timeElapsed, stars)
{
    // let levelTime = timeElapsed;
    // let numberOfStarsCollected = 0;
    // stars.forEach(star =>
    // {
    //     if(star.collected)
    //     {
    //         numberOfStarsCollected++;
    //     }
    // });

    // let score = 10000;
    // score = constrain(score - levelTime / 100, 100, 10000);
    // if (numberOfStarsCollected > 0) 
    // {
    //     score *= numberOfStarsCollected
    // }
    // score = Math.round(score);

    // //{_id: “sdfsdf”, level: “level”, stars_collected: 10, score: 100000, time: 45 }
    // //let data = {_id: localStorage.userId, level: level, group: group, stars_collected: numberOfStarsCollected, score: score, time: timeElapsed };
    // let data = {"_id": localStorage.userId, "level": level, "stars_collected": numberOfStarsCollected, score: score, time: timeElapsed };
    // let dataJSON = JSON.stringify(data);
    // console.log(data);



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
    // fetch('http://ic-research.eastus.cloudapp.azure.com:8080/device/-1/')
    //     .then(
    //         function(response) 
    //         {
    //             if (response.status !== 200) 
    //             {
    //                 console.log('Looks like there was a problem. Status Code: ' + response.status);
    //                 return;
    //             }
        
                
    //             response.json().then(function({data}) 
    //             {
    //                 console.log({});
    //                 return data;
    //             });
    //         }
    //     )
    // .catch(function(err) 
    // {
    //   console.log('Fetch Error :-S', err);
    // });


    fetch("http://ic-research.eastus.cloudapp.azure.com:8080/class/", 
    {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authenticateUser("test", "test"),
        
        
    },

    }).then((response) => { 
        console.log(response);
    })

    // console.log("data sent");
}


function authenticateUser(user, password)
{
    let token = user + ":" + password;

    // Should i be encoding this value????? does it matter???
    // Base64 Encoding -> btoa
    let hash = btoa(token); 

    return "Basic " + hash;
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
