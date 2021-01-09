function createLevels()
{
  levels = [
    
    
    
    
    {name: "TRACK 1",
    locked: false,
    testChargeStartingPosition: createVector(50, 50), 
    starPositions: [
      // {x: , y: },{x: , y: },{x: , y: },
        [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
        [createVector(200, 50), createVector(300, 50), createVector(450, 75)],
        [createVector(150, 40), createVector(300, 10), createVector(450, 50)],
        [createVector(150, 75), createVector(300, 30), createVector(450, 75)],
        [createVector(60, 30), createVector(250, 80), createVector(450, 20)]
      ],
    points: [
      {x: 2, y: 2},
      {x: 538, y: 2},
      {x: 538, y: 98},
      {x: 2, y: 98},
      {x: 2, y: 2},
    ],
    finishLine: {x: 480, y:  2, width:  58, height: 96},
    dimentions: createVector(540, 100)
    },



    














    {name: "TRACK 2",
      locked: true,
      testChargeStartingPosition: createVector(35, 50), 
      starPositions: [
        [createVector(70, 65), createVector(90, 135), createVector(54, 175)],
        [createVector(70, 65), createVector(100, 140), createVector(60, 225)],
        [createVector(83, 101), createVector(89, 130), createVector(73, 157)],
        [createVector(123, 53), createVector(99, 134), createVector(58, 194)],
        [createVector(142, 74.5), createVector(161, 128.5), createVector(137, 191.5)],
      ],
      finishLine: {x: 0, y:  150, width:  50, height: 100},
      points: [
        {x: 5, y: 5},
        {x: 66, y: 5},
        {x: 107, y: 15},
        {x: 139, y: 37},
        {x: 164, y: 73},
        {x: 174, y: 115},
        {x: 171, y: 151},
        {x: 161, y: 183},
        {x: 141, y: 213},
        {x: 115, y: 232},
        {x: 80, y: 247},
        {x: 5, y: 247},
        {x: 5, y: 151},
        {x: 61, y: 151},
        {x: 77, y: 136},
        {x: 77, y: 118},
        {x: 61, y: 104},
        {x: 5, y: 103},
        {x: 5, y: 5}
      ]
    },




    {name: "TRACK 3",
      locked: true,
      testChargeStartingPosition: createVector(50, 50), 
      starPositions: [
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(400, 75), createVector(425, 90), createVector(445, 110)],
          [createVector(100, 50), createVector(455, 50), createVector(480, 180)],
          [createVector(175, 75), createVector(325, 20), createVector(465, 100)],
          [createVector(435, 25), createVector(475, 50), createVector(500, 85)],
        ],
      finishLine: {x: 425, y:  200, width:  100, height: 50},
      points: [
        {x: 2, y: 2},
        {x: 400, y: 2},
        {x: 444, y: 2},
        {x: 485, y: 20},
        {x: 512, y: 50},
        {x: 523, y: 81},
        {x: 523, y: 126},
        {x: 523, y: 246},
        {x: 423, y: 246},
        {x: 423, y: 123},
        {x: 420, y: 107},
        {x: 409, y: 100},
        {x: 400, y: 100},
        {x: 2, y: 100},
        {x: 2, y: 2}
      ]
    },






      



      {name: "TRACK 4",
      locked: false,
      testChargeStartingPosition: createVector(125, 50), 
      starPositions: [
        [createVector(250, 55), createVector(350, 56), createVector(450, 125)],
        [createVector(450, 125), createVector(250, 200), createVector(334, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
      ],
      points: [
        {x: 2, y: 2},
        {x: 538, y: 2},
        {x: 538, y: 98},
        {x: 2, y: 98},
        {x: 2, y: 2},
      ],
      finishLine: {x: 0, y:  150, width:  50, height: 100},
    },
  ]
}
