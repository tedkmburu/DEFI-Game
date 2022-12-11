

// class LevelTemplate
// {
//   constructor(x, level, time, highScore, starsCollected , locked)
//   {
//     this.x = x;
//     this.level = level;
//     this.time = time;
//     this.highScore = highScore;
//     this.starsCollected = starsCollected;
//     this.locked = locked;
//   }


//     display()
//     {
//         let color = this.locked ? 25 : 255;
//         push();
//             fill(0);
//             rect((this.level * levelSelectTileSize) + 10 + levelSelectOffset, 75, levelSelectTileSize - 20, height - 85);

//             noStroke();
//             fill(color);
//             textSize(24);

//             if(this.locked)
//             {
//                 text("Locked", (this.level * levelSelectTileSize) + (levelSelectTileSize/2) + levelSelectOffset, height/2 - 80);
//             }
//             else
//             {
//                 text("Level " + (this.level + 1), (this.level * levelSelectTileSize) + (levelSelectTileSize/2) + levelSelectOffset, 105);
//                 stroke(255);
//                 strokeWeight(2)
//                 line((this.level * levelSelectTileSize) + (levelSelectTileSize/2) + levelSelectOffset - 100, 115,(this.level * levelSelectTileSize) + (levelSelectTileSize/2) + levelSelectOffset + 100, 115);
//                 if(this.time != 0)
//                 {
//                     noStroke()
//                     textSize(14);
//                     //text("stars: " + this.starsCollected, (this.level * levelSelectTileSize) + (levelSelectTileSize/2) + levelSelectOffset, height - 65);
//                     text("High Score: " + Math.round(this.highScore), (this.level * levelSelectTileSize) + (levelSelectTileSize/2) + levelSelectOffset, height - 45);
//                     text("Best time: " + millisecondsToTimeFormat(this.time), (this.level * levelSelectTileSize) + (levelSelectTileSize/2) + levelSelectOffset, height - 25);

//                     let starsIcons = [false, false, false];
//                     for (let i = 0; i < this.starsCollected; i++) 
//                     {
//                         starsIcons[i] = true;
//                     }

//                     starsIcons.forEach( (star, i) => 
//                     {
//                         if (star == true) 
//                         {
//                             image(icon.star, (this.level * levelSelectTileSize) + (levelSelectTileSize/2 - 25) + levelSelectOffset + (i * 20), 120, 15, 15);
//                         }
//                         else
//                         {
//                             image(icon.starEmpty, (this.level * levelSelectTileSize) + (levelSelectTileSize/2 - 25) + levelSelectOffset + (i * 20), 120, 15, 15);
//                         }
//                     });
//                 }
//             }
//             //console.log(levels[this.level]);
//             new Track(this.level, 0.4, createVector(((0.4 * levels[this.level].trackOffset.x ) - (50)) + (this.level * levelSelectTileSize) + 50 + levelSelectOffset, (height-60)/1.5 ), this.locked).display();
//         pop();
//     }

//     clicked()
//     {
//         if(!this.locked)
//         {
//             createTrack(this.level);

//             if (this.level == 0) 
//             {
//                 gameMode = "Play";
//             }
            
//             finished = false;
//             timeElapsed = 0;
//             //openFullscreen();
//             removeAllCharges();
//             navigateTo("Level");
//         }
        
//     }
// }
