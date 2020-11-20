// 'use strict';
// function displayPopUp()
// {
//     let levelTime = timeElapsed;

//     if(levels[track.level].fastestTime == 0 || levels[track.level].fastestTime > levelTime)
//     {
//         let scores = JSON.parse(localStorage.getItem("scores"));
//         let scoresLocal = [];
//         for (let i = 0; i < scores.length; i++)
//         {
//             if(i != track.level)
//             {
//                 scoresLocal.push(scores[i]);
//             }
//             else
//             {
//                 scoresLocal.push(levelTime);
//                 levels[track.level].fastestTime = levelTime;
//                 levelTemplates[track.level] = new LevelTemplate(track.level * levelSelectTileSize, track.level, levelTime, false); 
//             }
//         }
//         localStorage.setItem("scores", JSON.stringify(scoresLocal));
//     }
    

//     let nextLevel = track.level + 1;
//     levels[nextLevel].locked = false;
//     levelTemplates[nextLevel] = new LevelTemplate(nextLevel * levelSelectTileSize, nextLevel, 0, false);

//     let starsCollected = 0;
//     stars.forEach(star =>
//     {
//         if(star.collected)
//         {
//             starsCollected++;
//         }
//     });

//     console.log("asdf");


//     push()
//         noStroke();
//         fill("rgba(0,0,0,0.9)");
//         rect(0, 0, width, height);


//         noStroke();
//         fill(255);
//         textSize(20);
//         text("Level " + (track.level + 1),width/2,height/2 - 150);
//         text("Time: " + millisecondsToTimeFormat(levelTime),width/2,height/2);
//         text("Score: " + score,width/2,height/2 + 25);
//         text("Stars: " + numberOfStarsCollected,width/2,height/2 + 50);

//         buttons = [];
//         createGameButton(createVector(width/2, height/1.25), "Level Select");
//         createGameButton(createVector(width/2 - (buttonRadius*3), height/1.25), "Next");
//         createGameButton(createVector(width/2 + (buttonRadius*3), height/1.25), "Redo");
//         displayButtons();

//     pop();

    
// }