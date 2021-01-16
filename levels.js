function createLevels()
{
  levels = [
    
    
    
    
    {name: "TRACK 1",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
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
    finishLines: [{x: 480, y:  2, width:  58, height: 96}],
    },



    














    {name: "TRACK 2",
      locked: true,
      testChargeStartingPositions: [createVector(35, 50)], 
      starPositions: [
        [createVector(70, 65), createVector(90, 135), createVector(54, 175)],
        [createVector(70, 65), createVector(100, 140), createVector(60, 225)],
        [createVector(83, 101), createVector(89, 130), createVector(73, 157)],
        [createVector(123, 53), createVector(99, 134), createVector(58, 194)],
        [createVector(142, 74.5), createVector(161, 128.5), createVector(137, 191.5)],
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
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(400, 75), createVector(425, 90), createVector(445, 110)],
          [createVector(100, 50), createVector(455, 50), createVector(480, 180)],
          [createVector(175, 75), createVector(325, 20), createVector(465, 100)],
          [createVector(435, 25), createVector(475, 50), createVector(500, 85)],
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
      testChargeStartingPositions: [createVector(50, 50)],
      starPositions: [
          [createVector(175, 50), createVector(425, 90), createVector(475, 180)],
          [createVector(400, 75), createVector(425, 90), createVector(445, 110)],
          [createVector(100, 50), createVector(455, 50), createVector(480, 180)],
          [createVector(175, 75), createVector(325, 20), createVector(465, 100)],
          [createVector(435, 25), createVector(475, 50), createVector(500, 85)],
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
      locked: false,
      testChargeStartingPositions: createVector(125, 50), 
      starPositions: [
        [createVector(250, 55), createVector(350, 56), createVector(450, 125)],
        [createVector(450, 125), createVector(250, 200), createVector(334, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
        [createVector(175, 75), createVector(200, 125), createVector(175, 200)],
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





    {name: "TRACK 6",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
    starPositions: [
      // {x: , y: },{x: , y: },{x: , y: },
        [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
        [createVector(200, 50), createVector(300, 50), createVector(450, 75)],
        [createVector(150, 40), createVector(300, 10), createVector(450, 50)],
        [createVector(150, 75), createVector(300, 30), createVector(450, 75)],
        [createVector(60, 30), createVector(250, 80), createVector(450, 20)]
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
    finishLines: [{x: 480, y:  2, width:  58, height: 96}],
    },







    




    {name: "TRACK 7",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
    starPositions: [
      // {x: , y: },{x: , y: },{x: , y: },
        [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
        [createVector(200, 50), createVector(300, 50), createVector(450, 75)],
        [createVector(150, 40), createVector(300, 10), createVector(450, 50)],
        [createVector(150, 75), createVector(300, 30), createVector(450, 75)],
        [createVector(60, 30), createVector(250, 80), createVector(450, 20)]
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









    {name: "TRACK 8",
    locked: false,
    testChargeStartingPositions: [createVector(240, 50), createVector(490, 50)], 
    starPositions: [
      // {x: , y: },{x: , y: },{x: , y: },
        [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
        [createVector(200, 50), createVector(300, 50), createVector(450, 75)],
        [createVector(150, 40), createVector(300, 10), createVector(450, 50)],
        [createVector(150, 75), createVector(300, 30), createVector(450, 75)],
        [createVector(60, 30), createVector(250, 80), createVector(450, 20)]
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
    








    {name: "TRACK 9",
    locked: false,
    testChargeStartingPositions: [createVector(360, 40), createVector(40, 120)], 
    starPositions: [
      // {x: , y: },{x: , y: },{x: , y: },
        [createVector(200, 50), createVector(300, 50), createVector(400, 50)],
        [createVector(200, 50), createVector(300, 50), createVector(450, 75)],
        [createVector(150, 40), createVector(300, 10), createVector(450, 50)],
        [createVector(150, 75), createVector(300, 30), createVector(450, 75)],
        [createVector(60, 30), createVector(250, 80), createVector(450, 20)]
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
    








    {name: "TRACK 10",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
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








    {name: "TRACK 11",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
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
    finishLines: [{x: 480, y:  2, width:  58, height: 96}],
    },








    {name: "TRACK 12",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
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
    finishLines: [{x: 480, y:  2, width:  58, height: 96}],
    },








    {name: "TRACK 13",
    locked: false,
    testChargeStartingPositions: [createVector(50, 50)], 
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
    finishLines: [{x: 480, y:  2, width:  58, height: 96}],
    },
  ]




  
}
