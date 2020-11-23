'use strict';
let spaceFont;
let fontRegular;
let backgroundImage;
let homeTrack;
let blueprint;

let tracks;
let userNameInput;

let dataSent;

let currentLeaderboard;

let gameMode = "Build";
let charges = [];
let testCharges = [];
let stars = [];
let numberOfStarsCollected = 0;
let fieldLines = [];
let fieldLineArrows = [];
let points = [];
let track;
let levels = [];
let buttons = [];
let finished = false;
let timeElapsed = 0;
let currentFrameRate = 60;
let currentLevel = 0;
let currentLevelGroup = 3;
let noPositiveCharges = false;
let score = 100;
let totalStars = 0;

let slider;
let windowSize;

let colorBlindMode = false;

let icon;

let screens = [];
let screenStack = ["Home"];
let currentScreen = "Home";

let noiseValues = {x: 0, y: 0};

const k = 8990000; // const k = 8.99 * Math.pow(10, 9) adjusted because all charges are in micro coulombs;
const testChargeCharge = 0.000005; //5 micro coulombs
const chargeDiameter = 40;
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 10;
const testChargeRadius = testChargeDiameter / 2;
const starRadius = 5;
const starDiameter = starRadius * 2;
const buttonRadius = 30;

const buttonDimentions = {x: buttonRadius * 6, y: buttonRadius * 1.5};
const fieldLinesPerCoulomb = 4;


 
 
function getColors()
{
    if (colorBlindMode) 
    {
        return {positive: "green", negative: "yellow", neutral: "#616161"};
    }
    else
    {
        return {positive: "#D32F2F", negative: "#303F9F", neutral: "#616161"};
    }
}
function getTextColors()
{
    if (colorBlindMode) 
    {
        return {positive: 255, negative: 0, neutral: 255};
    }
    else
    {
        return {positive: 255, negative: 255, neutral: 255};
    }
}
let chargeColor = getColors();
let textColor = getTextColors();
let testChargeColor = "#D32F2F";
 
let trackColor = {play: "black", build: "black"};
let backgroundColor = {play: "black", build: "#37474F"};
let finishLineColor = {play: "grey", build: "white"};
 
let decorationText = ["E = F/q", "E = V/D", "E = (kQ)/(d^2)", "Equation", "Equation", "Equation", "Equation", "Equation", "Equation", "Equation"];


// context.font='14px FontAwesome';
// context.fillText('\uF047',20,50);


class Icon 
{
    constructor(name, position, size, color)
    {
        this.name = name;
        this.position = position;
        this.size = size;
        this.color = color;
    }

    display()
    {
        // let theCanvas = document.getElementById('defaultCanvas0');
        // let context = theCanvas.getContext('2d');
        // context.font= `${this.size}px Font Awesome 5 Free`;
        // context.fillText('\f5ae', this.position.x, this.position.y);
    }
}

// hey @everyone. I'm looking for volunteeers to test out a physics education game that Colleen's research group worked on over the summer. I'f your're interested in testing it out and giving us feedback, please DM me and we can find a time that works for both of us when you'll be able to test the game and I'll get your feedback over Zoom.