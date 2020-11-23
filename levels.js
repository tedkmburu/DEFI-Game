function createLevels()
{
  levels = [
      {name: "TRACK 1",
      locked: false,
      trackOffset: createVector(width/2 - 250, height/2 - 50),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [
          [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
          [createVector(250, 50), createVector(300, 50), createVector(400, 50)],
          [createVector(300, 50), createVector(300, 50), createVector(400, 50)],
          [createVector(350, 50), createVector(300, 50), createVector(400, 50)],
          [createVector(400, 50), createVector(300, 50), createVector(400, 50)]
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
      trackOffset: createVector(width/2 - 250, height/2 - 100),
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
        ],
      shapes: [
      {shape: "Rect",   x:   0, y:   0, width: 400, height: 100, type: "track"},
      {shape: "Circle", x: 405, y: 115, radius:120,             type: "track"},
      {shape: "Rect",   x: 425, y: 125, width: 100, height: 125, type: "track"}, 
      {shape: "Rect",   x:   0, y: 100, width: 400, height:  50, type: "remove"},
      {shape: "Circle", x: 397, y: 125, radius: 25,              type: "remove"},
      {shape: "Rect",   x: 225, y: 125, width: 200, height: 125, type: "remove"},
      {shape: "Rect",   x: 425, y: 200, width: 100, height: 50, type: "finish"}],
      dimentions: createVector(525, 250)
    },






      {name: "TRACK 3",
      locked: true,
      trackOffset: createVector(width/2 - 50, height/2 - 100),
      testChargeStartingPosition: createVector(125, 50), 
      starPositions: [
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
      ],
      shapes: [
      {shape: "Rect",   x: 0, y:   0, width: 50, height: 100,  type: "track"},
      {shape: "Rect",   x: 0, y: 150, width: 50, height: 100,  type: "track"},
      {shape: "Circle", x: 50, y: 125, radius: 125,             type: "track"}, 
    
      {shape: "Rect",   x:   -100, y:   0, width: 100, height: 250, type: "remove"},
      {shape: "Rect",   x:  -50, y: 100, width: 100, height: 50,  type: "remove"},
      {shape: "Circle", x: 50, y: 125, radius: 25,              type: "remove"},
        
      {shape: "Rect",   x: 0, y: 150, width:  50, height: 100, type: "finish"}],
      dimentions: createVector(180, 255)
    },



      {name: "TRACK 4",
      locked: false,
      trackOffset: createVector(width/2 - 250, height/2 - 100),
      testChargeStartingPosition: createVector(125, 50), 
      starPositions: [
        [createVector(250, 55), createVector(350, 70), createVector(450, 125)],
        [createVector(250, 50), createVector(450, 125), createVector(250, 200)],
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