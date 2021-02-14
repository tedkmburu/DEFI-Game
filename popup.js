function createPopups()
{
    popups = [
        new Popup({
            name: "Help",
            size: createVector(700,300),
            numberOfSlides: 3,
            textBoxes: [
                new TextBox({x: 406, y: 80, id: "Help", text: "Help", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: LEFT}), 
                new TextBox({x: 271, y: 110, id: "hint1", text: "The goal of each level is to collect all of the stars \n and get to the finish line as fast as possible. The test \n charge should remain inside the track at all times. \n \n To move the red test charge, you create a configuration \n of charges while in the “Build” mode then hit \n the play button to test your build. \n \n You can edit your charge configuraions at any time \n by going back into the “Build” mode. \n \n Dragging a charge to the trash icon deletes it.", font: fontRegular, fontSize: 14, color: "black", visibility: "visible", align: CENTER}), 
            ],
            buttons: [
                new Button({x: 730 , y: 60 , width: 20 , height: 20, title: "x" , onClick: function(){ closePopup() }, shape: "Rect", bgColor: "black"             , fontColor: "white", fontSize: 14}), 
                new Button({x: 80 , y: 190 , width: 20 , height: 20, title: "<" , onClick: function(){ movePopup("left") }, shape: "Rect", bgColor: "black"             , fontColor: "white", fontSize: 14}), 
                new Button({x: 710 , y: 190 , width: 20 , height: 20, title: ">" , onClick: function(){ movePopup("right") }, shape: "Rect", bgColor: "black"             , fontColor: "white", fontSize: 14}), 
                
            ]
        }),

        new Popup({
            name: "Help",
            size: createVector(700,300),
            textBoxes: [
                new TextBox({x: 501, y: 110, id: "title", text: "Objectives: ", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: LEFT}), 
                new TextBox({x: 501, y: 150, id: "hint1", text: "1. Collect all the stars  [0/3]", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: LEFT}), 
                new TextBox({x: 501, y: 180, id: "hint2", text: "2. Finish as fast as possible", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: LEFT}), 
                new TextBox({x: 501, y: 210, id: "hint3", text: "3. Stay inside the track", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: LEFT}),
            ],
            buttons: [
                new Button({x: 60 , y: 60 , width: 20 , height: 20, title: "x" , onClick: function(){ closePopup() }, shape: "Rect", bgColor: "black"             , fontColor: "white", fontSize: 14}), 
                new Button({x: 60 , y: 120 , width: 20 , height: 20, title: ">" , onClick: function(){ closePopup() }, shape: "Rect", bgColor: "black"             , fontColor: "white", fontSize: 14}), 
                new Button({x: 600 , y: 120 , width: 20 , height: 20, title: "<" , onClick: function(){ closePopup() }, shape: "Rect", bgColor: "black"             , fontColor: "white", fontSize: 14}), 
                
            ]
        }),
    
    
    ]
}

function displayPopups()
{
    popups.forEach(popUp => {
        if (popUp.visibility == "visible") 
        {
            popUp.display()
            popupVisibile = true;
        }
    })
}

function closePopup()
{
    popups.forEach(popup => {
    popup.visibility = "hidden";    
    popupVisibile = false;
    })
}

function movePopup(direction)
{
    let popupIndex = popups.findIndex(x => x.visibility == "visible");

    let currentPopup = popups[popupIndex];

    currentPopup.textBoxes.forEach(textBox => {

        if (direction == "left") 
        {
            textBox.x += width;
        }
        else
        {
            textBox.x -= width;
        }
    });

    if (direction == "left") 
    {
        currentPopup.currentSlide--
    }
    else
    {
        currentPopup.currentSlide++
    }
    //console.log(currentPopup.currentSlide);
    
}


class Popup
{
    constructor(props)
    {
        this.name = props.name;
        this.size = props.size;
        this.textBoxes = props.textBoxes;
        this.buttons = props.buttons;
        this.visibility = props.visibility || "hidden";

        this.currentSlide = 0;
    }

    display() 
    {
        let popup = this;
        push()
            fill("rgba(0,0,0,0.75)");
            rect(0, 0, width, height);

            fill(255);
            let popupX = (width - (popup.size.x * scale.x)) / 2;
            let popupY = (height - (popup.size.y * scale.y)) / 2;
            rect(popupX, popupY, popup.size.x * scale.x, popup.size.y * scale.y)
        pop()

        popup.textBoxes.forEach(textBox => {
            textBox.display();
        });

        popup.buttons.forEach(button =>
        {
            button.display();
        });
    } 
}