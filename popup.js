function createPopups()
{
    popups = [
        new Popup({
            name: "Help",
            size: createVector(700,300),
            numberOfSlides: 4,
            textBoxes: [
                new TextBox({x: (812 * 0), y: 80, class: textClass.popUpTitle, text: "Goal"}), 
                new TextBox({x: 150 + (812 * 0), y: 130, class: textClass.popUpBody, text: "Get the test charge to the finish line by building an electric field.\n\nDo not hit the walls of the track.\n\nCollect as many stars as possible \n\nFinish the level as fast as possible"}), 

                new TextBox({x: (812 * 1), y: 80, class: textClass.popUpTitle, text: "Two Modes"}), 
                new TextBox({x: 150 + (812 * 1), y: 130, class: textClass.popUpBody, text: " There are two game modes.\n\nIn the “Build” mode you can build an electric field\n\nIn the “Play” mode, your electric field pushes the test charge through."}), 

                new TextBox({x: (812 * 2), y: 80, class: textClass.popUpTitle, text: "Creating an Electric Field"}), 
                new TextBox({x: 150 + (812 * 2), y: 130, class: textClass.popUpBody, text: "While in the “Build” mode, click anywhere on the screen to place a charge there.\n\nUse the slider to change the slider’s magnitude and sign.\n\nYou can drag charges around.\n\nDrag charges to the bottom right to delete them."}), 

                new TextBox({x: (812 * 3), y: 80, class: textClass.popUpTitle, text: "Electric Fields"}), 
                new TextBox({x: 150 + (812 * 3), y: 130, class: textClass.popUpBody, text: "Electric fields will only exert a force on test charge in “Play” mode.\n\nAll test charges are positive so they will be pushed away from positive charges and pulled towards negative charges. "}), 
            ],
            images: [
                //image(icon.star, starPosition.x - starRadius - 2 + imageX, starPosition.y - starRadius - 2 + imageY, starDiameter + 4, starDiameter + 4)
            
            ],
            buttons: [
                new Button({x: 730, y: 60 , width: 20, height: 20, title: "x" , onClick: function(){ closePopup()      }, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                new Button({x: 80 , y: 190, width: 20, height: 20, title: "<" , onClick: function(){ movePopup("left") }, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                new Button({x: 710, y: 190, width: 20, height: 20, title: ">" , onClick: function(){ movePopup("right")}, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                
            ]
        }),

        new Popup({
            name: "Help2",
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

function showPopUp(name)
{
    deselectAllCharges();
    let popupToShow = popups.find(popup => popup.name == name);
    popupToShow.visibility = "visible";
    popupToShow.currentSlide = 0;

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

    createPopups()
}

function movePopup(direction)
{
    let popupIndex = popups.findIndex(x => x.visibility == "visible");

    let currentPopup = popups[popupIndex];

    currentPopup.textBoxes.forEach(textBox => {

        if (direction == "left" && currentPopup.currentSlide > 0) 
        {
            textBox.x += width;
        }
        else if (direction == "right" && currentPopup.currentSlide < currentPopup.numberOfSlides)
        {
            textBox.x -= width;
        }
    });

    if (direction == "left" && currentPopup.currentSlide > 0) 
    {
        currentPopup.currentSlide--
    }
    else if (direction == "right" && currentPopup.currentSlide < currentPopup.numberOfSlides)
    {
        currentPopup.currentSlide++
    }

    console.log(currentPopup.currentSlide);
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
        this.numberOfSlides = props.numberOfSlides;
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
            if ((button.title == ">" && popup.currentSlide < popup.numberOfSlides-1) || (button.title == "<" && popup.currentSlide > 0) || (button.title != "<" && button.title != ">" )) 
            {
                button.visibility = "visible";
                button.display();
            }
            else
            {
                button.visibility = "hidden";
            }
        });
    } 
}