
let spaceFont;
let fontRegular;

let backgroundImage;
let homeTrack;
let blueprint;
let icon;
let popUpImage;

let sounds;
let playSounds = (localStorage.playSounds != null) ? (localStorage.playSounds == "true") : true;

let trackImages;

let userNameInput;
let classCodeInput;

let dataSent;
let connectingToServer = false;

let consoleLog = "";
let mouseTapped;

let gameMode = "Build";
let hitEdge = false;
let finished = false;
let finishedSoundsPlaying = false;
let timeElapsed = 0;
let currentFrameRate = 60;
let currentLevel = 0;
let noPositiveCharges = true;
let score = 100;
let totalStars = 0;

let charges = [];
let testCharges = [];
let stars = [];
let numberOfStarsCollected = 0;
let fieldLines = [];
let fieldLineArrows = [];
let points = [];

let allTracks = [];
let track;
let levels = [];
let buttons = [];

let windowSize;
let scale;
let onScrollBar = false;

let colorBlindMode = (localStorage.colorBlindMode != null) ? (localStorage.colorBlindMode == "true") : false;

let popups = []
let popupVisibile = false;

let screens = [];
let screenStack = ["Home"];
let currentScreen = "Home";

let currentLeaderboard;
let leaderboardData = {sort: "score", group: 1, level: 1, section: "Global"};

let noiseValues = {x: 0, y: 0};

const k = 8990000; // const k = 8.99 * Math.pow(10, 9) adjusted because all charges are in micro coulombs;
const testChargeCharge = 0.000005; //5 micro coulombs
const chargeDiameter = 40;
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 10;
const testChargeRadius = testChargeDiameter / 2;
const starRadius = 7;
const starDiameter = starRadius * 2;
const buttonRadius = 30;
const portalRadius = 10;
const portalDiameter = portalRadius * 2;

const defaultClassCode = 000;

const fieldLinesPerCoulomb = 4;

let displayScore = 0;
 
 
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
 
// let trackColor = {play: "black", build: "black"};
// let backgroundColor = {play: "black", build: "#37474F"};
// let finishLineColor = {play: "grey", build: "white"};
 

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


let textClass;
let buttonClass;

function createTextClasses()
{
    textClass = {
        popUpTitle: {
            font: fontRegular, 
            fontSize: 24, 
            visibility: "visible", 
            align: CENTER, 
            color: "black",
            size: createVector(812, 50),
        }, 
        popUpBody: {
            font: fontRegular, 
            fontSize: 14, 
            visibility: "visible", 
            align: LEFT, 
            color: "black",
            size: createVector(300, 300),
        }, 
        loadingScreen: {
            font: fontRegular, 
            fontSize: 20, 
            visibility: "visible", 
            align: LEFT, 
            color: "white",
        },
        credits: {
            font: fontRegular, 
            fontSize: 12, 
            visibility: "visible", 
            align: CENTER, 
            color: "white",
        }, 
                   
    }
}

function createButtonClasses()
{
    buttonClass = {
        back: {
            font: fontRegular, 
            fontSize: 24, 
            visibility: "visible", 
            align: CENTER, 
            color: "black",
            size: createVector(812, 50),
        }, 
        delfault: {
            font: fontRegular, 
            fontSize: 14, 
            visibility: "visible", 
            align: LEFT, 
            color: "black",
            size: createVector(350, 250),
        }, 
        icon: {
            font: fontRegular, 
            fontSize: 20, 
            visibility: "visible", 
            align: LEFT, 
            color: "white",
        },
                   
    }
}


// hey @everyone. I'm looking for volunteeers to test out a physics education game that Colleen's research group worked on over the summer. I'f your're interested in testing it out and giving us feedback, please DM me and we can find a time that works for both of us when you'll be able to test the game and I'll get your feedback over Zoom.