function createLevels()
{
  levels = [
    
    
    
    
    {name: "TRACK 1",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
    starPositions: [
        createVector(150, 40), 
        createVector(300, 10), 
        createVector(450, 50)
      ],
    points: [
      {x: 2, y: 2},
      {x: 538, y: 2},
      {x: 538, y: 98},
      {x: 2, y: 98},
      {x: 2, y: 2},
    ],
    finishLines: [{x: 480, y:  2, width:  58, height: 96}],
    },



    














    {name: "TRACK 2",
      locked: true,
      testChargeStartingPositions: [createVector(35, 50)], 
      starPositions: [
        createVector(123, 53), 
        createVector(99, 134), 
        createVector(58, 194)
      ],
      finishLines: [{x: 0, y:  150, width:  50, height: 100}],
      points: [
        {x: 5, y: 0},
        {x: 66, y: 0},
        {x: 107, y: 10},
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
        {x: 5, y: 0}
      ]
    },









    {name: "TRACK 3",
      locked: true,
      testChargeStartingPositions: [createVector(50, 50)],
      starPositions: [
        createVector(175, 50), 
        createVector(425, 90), 
        createVector(475, 180)
      ],
      finishLines: [{x: 425, y:  200, width:  100, height: 50}],
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
      locked: true,
      testChargeStartingPositions: [createVector(388, 50)],
      starPositions: [
          createVector(466, 118), 
          createVector(368, 199), 
          createVector(156, 200)
        ],
        finishLines: [{x: 2, y:  145, width:  50, height: 100}],
      points: [
        {x: 343, y: 0}, 
        {x: 426, y: 2}, 
        {x: 477, y: 27}, 
        {x: 509, y: 70}, 
        {x: 520, y: 112}, 
        {x: 515, y: 161}, 
        {x: 489, y: 205}, 
        {x: 442, y: 235}, 
        {x: 408, y: 243}, 
        {x: -1, y: 244}, 
        {x: 1, y: 145}, 
        {x: 406, y: 145}, 
        {x: 420, y: 132}, 
        {x: 422, y: 114}, 
        {x: 407, y: 98}, 
        {x: 344, y: 96}, 
        {x: 344, y: 1}
      ]
    },








    {name: "TRACK 5",
      locked: true,
      testChargeStartingPositions: [
        createVector(100, 111), 
        createVector(150, 63),
        createVector(200, 36), 
        createVector(250, 25),
        createVector(300, 25), 
        createVector(350, 30),
        createVector(400, 50), 
        createVector(450, 89)],
      starPositions: [
          createVector(150, 150), 
          createVector(300, 150), 
          createVector(400, 150)
        ],
        finishLines: [{x: 0, y:  164, width:  520, height: 45}],
      points: [
        {x: 0, y: 0}, 
        {x: 520, y: 0}, 
        {x: 520, y: 209}, 
        {x: 0, y: 209}, 
        {x: 0, y: 0}, 
      ]
    },






      





      {name: "TRACK 6",
      locked: false,
      testChargeStartingPositions: [createVector(125, 50)], 
      starPositions: [
        createVector(250, 55), 
        createVector(350, 56), 
        createVector(450, 125)
      ],
      points: [
        {x: 5, y: 4},
        {x: 404, y: 4},
        {x: 466, y: 26},
        {x: 499, y: 62},
        {x: 514, y: 119},
        {x: 504, y: 165},
        {x: 465, y: 210},
        {x: 399, y: 234},
        {x: 2, y: 233},
        {x: 1, y: 143},
        {x: 399, y: 140},
        {x: 411, y: 133},
        {x: 417, y: 117},
        {x: 410, y: 103},
        {x: 394, y: 95},
        {x: 3, y: 93},
        {x: 6, y: 4}
      ],
      finishLines: [{x: 0, y:  140, width:  50, height: 100}],
    },





    {name: "TRACK 7",
    locked: false,
    testChargeStartingPositions: [createVector(75, 75)], 
    starPositions: [
      createVector(125, 145), 
      createVector(250, 250), 
      createVector(440, 140)
      ],
    points: [
      {x: 95, y: 0}, 
      {x: 263, y: 169}, 
      {x: 437, y: 0}, 
      {x: 529, y: 91},
      {x: 351, y: 268}, 
      {x: 319, y: 287}, 
      {x: 278, y: 300}, 
      {x: 247, y: 299}, 
      {x: 205, y: 286}, 
      {x: 171, y: 262}, 
      {x: -1, y: 91}, 
      {x: 93, y: 0},
    ],
    finishLines: [{x: 390, y:  2, width:  158, height: 136}],
    },







    




    {name: "TRACK 8",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
    starPositions: [
        createVector(200, 50), 
        createVector(279, 120), 
        createVector(420, 150)
      ],
    points: [
      {x: 0, y: 2}, 
      {x: 233, y: 0}, 
      {x: 264, y: 10}, 
      {x: 287, y: 29}, 
      {x: 302, y: 60}, 
      {x: 315, y: 82}, 
      {x: 332, y: 92}, 
      {x: 533, y: 91}, 
      {x: 533, y: 187}, 
      {x: 304, y: 187}, 
      {x: 277, y: 181}, 
      {x: 254, y: 164}, 
      {x: 232, y: 134}, 
      {x: 223, y: 110}, 
      {x: 199, y: 94}, 
      {x: 3, y: 90}, 
      {x: 0, y: 1}
    ],
    finishLines: [{x: 490, y:  90, width:  45, height: 96}],
    },









    {name: "TRACK 9",
    locked: false,
    testChargeStartingPositions: [createVector(240, 50), createVector(490, 50)], 
    starPositions: [
        createVector(580, 21), 
        createVector(660, 50), 
        createVector(70, 50)
      ],
    points: [
      {x: 0, y: 4}, 
      {x: 272, y: 1}, 
      {x: 271, y: 93}, 
      {x: 0, y: 94}, 
      {x: 1, y: 3}, 
      {x: 463, y: 1}, 
      {x: 738, y: 1}, 
      {x: 738, y: 97}, 
      {x: 464, y: 95}, 
      {x: 462, y: 1}, 
    ],
    finishLines: [{x: 0, y:  2, width:  58, height: 96}, {x: 680, y:  2, width:  58, height: 96}],
    },
    








    {name: "TRACK 10",
    locked: false,
    testChargeStartingPositions: [createVector(360, 40), createVector(40, 120)], 
    starPositions: [
      createVector(417, 13), 
      createVector(480, 70), 
      createVector(65, 180)
      ],
    points: [
      {x: 336, y: 2}, 
      {x: 534, y: -1}, 
      {x: 533, y: 80}, 
      {x: 335, y: 80}, 
      {x: 335, y: 0}, 
      {x: 81, y: 102}, 
      {x: 81, y: 298}, 
      {x: -1, y: 296}, 
      {x: -1, y: 103}, 
      {x: 80, y: 102}, 
    ],
    finishLines: [{x: 490, y:  0, width:  50, height: 85}, {x: 0, y:  260, width:  85, height: 40}],
    },
    








    {name: "TRACK 11",
    locked: false,
    testChargeStartingPositions: [createVector(50, 40), createVector(50, 60)], 
    starPositions: [
        createVector(200, 50), 
        createVector(300, 50), 
        createVector(400, 50)
      ],
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
    ],
    finishLines: [{x: 480, y:  2, width:  58, height: 96}],
    },








    {name: "TRACK 12",
    locked: false,
    testChargeStartingPositions: [createVector(50, 134)], 
    starPositions: [
      createVector(200, 50), 
      createVector(300, 50), 
      createVector(400, 50)
      ],
    points: [
      {x: 1, y: 134}, 
      {x: 14, y: 88}, 
      {x: 59, y: 53}, 
      {x: 135, y: 17}, 
      {x: 220, y: 1}, 
      {x: 290, y: 0}, 
      {x: 384, y: 11}, 
      {x: 450, y: 31}, 
      {x: 496, y: 59}, 
      {x: 514, y: 75}, 
      {x: 636, y: 77}, 
      {x: 637, y: 195}, 
      {x: 515, y: 193}, 
      {x: 453, y: 233}, 
      {x: 380, y: 257}, 
      {x: 290, y: 266}, 
      {x: 225, y: 266}, 
      {x: 131, y: 247}, 
      {x: 51, y: 212}, 
      {x: 13, y: 177}, 
      {x: -1, y: 130},
    ],
    finishLines: [{x: 580, y:  76, width:  58, height: 126}],
    },








    {name: "TRACK 13",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
    starPositions: [
        createVector(151, 151), 
        createVector(253, 68), 
        createVector(346, 152)
      ],
    points: [
      {x: 4, y: 61}, {x: 58, y: 2}, {x: 156, y: 102}, {x: 251, y: 4}, {x: 346, y: 96}, {x: 439, y: 3}, {x: 501, y: 61}, {x: 344, y: 218}, {x: 250, y: 123}, {x: 155, y: 220}, {x: -2, y: 62}, {x: 57, y: 2}
    ],
    finishLines: [{x: 420, y:  2, width:  158, height: 96}],
    },








    {name: "TRACK 14",
    locked: false,
    testChargeStartingPositions: [createVector(120, 170)], 
    starPositions: [
        createVector(167, 92), 
        createVector(95, 27), 
        createVector(27, 98)
      ],
    points: [
      {x: 102, y: 198}, 
      {x: 151, y: 183}, 
      {x: 181, y: 150}, 
      {x: 197, y: 101}, 
      {x: 177, y: 38}, 
      {x: 137, y: 9}, 
      {x: 79, y: 3}, 
      {x: 31, y: 28}, 
      {x: 8, y: 61}, 
      {x: 1, y: 114}, 
      {x: 18, y: 153}, 
      {x: 48, y: 181}, 
      {x: 90, y: 197}, 
      {x: 90, y: 143}, 
      {x: 60, y: 122}, 
      {x: 56, y: 88}, 
      {x: 79, y: 60}, 
      {x: 117, y: 59}, 
      {x: 138, y: 78}, 
      {x: 142, y: 109}, 
      {x: 129, y: 132}, 
      {x: 103, y: 144}, 
      {x: 102, y: 195},
    ],
    finishLines: [{x: 62, y:  120, width:  30, height: 96}],
    },
  ]




  
}
