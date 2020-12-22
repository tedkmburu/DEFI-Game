function createLevels()
{
  levels = [
      {name: "TRACK 1",
      locked: false,
      trackOffset: createVector(width/2 - 250, height/2 - 50),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [
          [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
          [createVector(200, 50), createVector(300, 50), createVector(450, 75)],
          [createVector(150, 40), createVector(300, 10), createVector(450, 50)],
          [createVector(150, 75), createVector(300, 30), createVector(450, 75)],
          [createVector(60, 30), createVector(250, 80), createVector(450, 20)]
        ],
      fixedCharges: [
        [],
        [],
        [],
        [],
        []
        ],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 540, height: 100, type: "track"},
      {shape: "Rect",   x: 485, y:  0, width:  50, height: 100, type: "finish"}],
      dimentions: createVector(540, 100)
    },








    {name: "TRACK 2",
      locked: true,
      trackOffset: createVector(width/2 - 50, height/2 - 100),
      testChargeStartingPosition: createVector(35, 50), 
      starPositions: [
        [createVector(70, 65), createVector(90, 135), createVector(54, 175)],
        [createVector(70, 65), createVector(100, 140), createVector(60, 225)],
        [createVector(83, 101), createVector(89, 130), createVector(73, 157)],
        [createVector(123, 53), createVector(99, 134), createVector(58, 194)],
        [createVector(142, 74.5), createVector(161, 128.5), createVector(137, 191.5)],
      ],
      shapes: [
      {shape: "Rect",   x: 0, y:   0, width: 50, height: 100,  type: "track"},
      {shape: "Rect",   x: 0, y: 150, width: 50, height: 100,  type: "track"},
      {shape: "Circle", x: 50, y: 125, radius: 125,             type: "track"}, 
    
      {shape: "Rect",   x: -100, y:   0, width: 100, height: 250, type: "remove"},
      {shape: "Rect",   x:  -50, y: 100, width: 100, height: 50,  type: "remove"},
      {shape: "Circle", x: 53, y: 125, radius: 25,              type: "remove"},
        
      {shape: "Rect",   x: 0, y: 150, width:  50, height: 100, type: "finish"}],
      dimentions: createVector(180, 255)
    },




    {name: "TRACK 3",
      locked: true,
      trackOffset: createVector(width/2 - 250, height/2 - 100),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(400, 75), createVector(425, 90), createVector(445, 110)],
          [createVector(100, 50), createVector(455, 50), createVector(480, 180)],
          [createVector(175, 75), createVector(325, 20), createVector(465, 100)],
          [createVector(435, 25), createVector(475, 50), createVector(500, 85)],
        ],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 400, height: 100, type: "track"},
      {shape: "Circle", x: 425, y: 100, radius:100,             type: "track"},
      {shape: "Rect",   x: 425, y: 125, width: 100, height: 125, type: "track"}, 
      {shape: "Rect",   x:   0, y: 100, width: 400, height:  50, type: "remove"},
      {shape: "Circle", x: 405, y: 120, radius: 20,              type: "remove"},
      {shape: "Rect",   x: 225, y: 125, width: 200, height: 125, type: "remove"},
      {shape: "Rect",   x: 425, y: 200, width: 100, height: 50, type: "finish"}],
      dimentions: createVector(525, 250)
    },






      



      {name: "TRACK 4",
      locked: false,
      trackOffset: createVector(width/2 - 250, height/2 - 100),
      testChargeStartingPosition: createVector(125, 50), 
      starPositions: [
        [createVector(250, 55), createVector(350, 56), createVector(450, 125)],
        [createVector(450, 125), createVector(250, 200), createVector(334, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
      ],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 400, height: 100, type: "track"},
      {shape: "Rect",   x:   0, y: 150, width: 400, height: 100, type: "track"},
      {shape: "Circle", x: 400, y: 125, radius: 125,             type: "track"}, 
      {shape: "Rect",   x:   0, y: 100, width: 400, height:  50, type: "remove"},
      {shape: "Circle", x: 400, y: 125, radius: 25,              type: "remove"},
      {shape: "Rect",   x:   0, y: 150, width:  50, height: 100, type: "finish"},
      ],
      dimentions: createVector(525, 250)
    },
  ]
}

/*

function createLevels()
{
  levels = [

    {locked: false,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 250, height/2 - 50),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 500, height: 100, type: "track"},
      {shape: "Rect",   x: 450, y:  0, width:  50, height: 100, type: "finish"}]},




    {locked: true,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 250, height/2 - 50),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [createVector(100, 40), createVector(200, 10), createVector(400, 50)],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 500, height: 100, type: "track"},
      {shape: "Rect",   x: 450, y:  0, width:  50, height: 100, type: "finish"}]},




    {locked: true,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 250, height/2 - 50),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [createVector(100, 60), createVector(200, 90), createVector(400, 50)],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 500, height: 100, type: "track"},
      {shape: "Rect",   x: 450, y:  0, width:  50, height: 100, type: "finish"}]},




    {locked: true,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 250, height/2 - 50),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [createVector(100, 40), createVector(250, 10), createVector(400, 50)],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 500, height: 100, type: "track"},
      {shape: "Rect",   x: 450, y:  0, width:  50, height: 100, type: "finish"}]},





    {locked: true,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 250, height/2 - 100),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 400, height: 100, type: "track"},
      {shape: "Circle", x: 400, y: 125, radius:125,             type: "track"},
      {shape: "Rect",   x: 425, y: 125, width: 100, height: 125, type: "track"}, 
      {shape: "Rect",   x:   0, y: 100, width: 400, height:  50, type: "remove"},
      {shape: "Circle", x: 400, y: 125, radius: 25,              type: "remove"},
      {shape: "Rect",   x: 225, y: 125, width: 200, height: 125, type: "remove"},
      {shape: "Rect",   x: 425, y: 200, width: 100, height: 50, type: "finish"}]},


    
    {locked: true,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 150, height/2 - 100),
      testChargeStartingPosition: createVector( 125, 50), 
      starPositions: [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
      shapes: [
      {shape: "Rect",   x: 100, y:   0, width: 50, height: 100,  type: "track"},
      {shape: "Rect",   x: 100, y: 150, width: 50, height: 100,  type: "track"},
      {shape: "Circle", x: 150, y: 125, radius: 125,             type: "track"}, 
    
      {shape: "Rect",   x:   0, y:   0, width: 100, height: 250, type: "remove"},
      {shape: "Rect",   x:  50, y: 100, width: 100, height: 50,  type: "remove"},
      {shape: "Circle", x: 150, y: 125, radius: 25,              type: "remove"},
        
      {shape: "Rect",   x: 100, y: 150, width:  50, height: 100, type: "finish"},
      ]},

    {locked: true,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 250, height/2 - 100),
      testChargeStartingPosition: createVector(50,50), 
      starPositions: [createVector(200, 50), createVector(450, 125), createVector(200, 200)],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 400, height: 100, type: "track"},
      {shape: "Rect",   x:   0, y: 150, width: 400, height: 100, type: "track"},
      {shape: "Circle", x: 400, y: 125, radius: 125,             type: "track"}, 
      {shape: "Rect",   x:   0, y: 100, width: 400, height:  50, type: "remove"},
      {shape: "Circle", x: 400, y: 125, radius: 25,              type: "remove"},
      {shape: "Rect",   x:   0, y: 150, width:  50, height: 100, type: "finish"},]},


    {locked: true,
      fastestTime: 0,
      starsCollected: 0,
      highScore: 0,
      trackOffset: createVector(width/2 - 150, height/2 - 200),
      testChargeStartingPosition: createVector(37.5, 75), 
      starPositions: [createVector(37.5, 175), createVector(160, 175), createVector(285, 175)],
      shapes: [
      {shape: "Rect",   x:   0, y: 50 , width: 75, height: 200, type: "track"},
      {shape: "Rect",   x: 125, y: 100, width: 75, height: 150, type: "track"},
      {shape: "Rect",   x: 250, y: 100, width: 75, height: 200, type: "track"},
    
      {shape: "Circle", x: 100, y: 250, radius: 100,            type: "track"},
      {shape: "Circle", x: 225, y: 100, radius: 100,            type: "track"},
    
      {shape: "Circle", x: 100, y: 250, radius: 25,             type: "remove"},
      {shape: "Circle", x: 225, y: 100, radius: 25,             type: "remove"},
    
      {shape: "Rect",   x:  75, y:  50, width: 50, height: 200, type: "remove"},
      {shape: "Rect",   x: 200, y: 100, width: 50, height: 200, type: "remove"},
    
      {shape: "Rect",   x: 250, y: 250, width:  75, height: 50, type: "finish"},]},
  ];
}
*/