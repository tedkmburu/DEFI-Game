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
                // popUpImage = {
                //     portal: loadImage('images/popups/popup (1).png'), 
                //     multipleTestCharges: loadImage('images/popups/popup (2).png'), 
                //     gameMode: loadImage('images/popups/popup (3).png'), 
                //     slider: loadImage('images/popups/popup (4).png'), 
                //     eField: loadImage('images/popups/popup (5).png'), 
                // }
                new MyImage({image: popUpImage.gameMode, x: 450, y: 150, size: createVector(220, (220 * (384/600)))}),
                new MyImage({image: popUpImage.track, x: 1260, y: 150, size: createVector(230, (230 * (309/600)))}),
                new MyImage({image: popUpImage.slider, x: 2100, y: 130, size: createVector(160, (160 * (600/537)))}),
                new MyImage({image: popUpImage.eField, x: 2900, y: 130, size: createVector(200, (200 * (537/600)))}),
            ],
            buttons: [
                new Button({x: 730, y: 60 , width: 20, height: 20, title: "x" , onClick: function(){ closePopup()      }, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                new Button({x: 80 , y: 190, width: 20, height: 20, title: "<" , onClick: function(){ movePopup("left") }, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                new Button({x: 710, y: 190, width: 20, height: 20, title: ">" , onClick: function(){ movePopup("right")}, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
            ],
            // functions: {},
        }),

        new Popup({
            name: "New User",
            numberOfSlides: 1,
            size: createVector(700,300),
            textBoxes: [
                new TextBox({x: 406, y: 110, id: "title", text: "Welcome to D.E.F.I. \n Please enter your username below.", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: CENTER}), 
            ],
            buttons: [
                new Button({x: 354, y: 300 , width: 100, height: 30, title: "Save" , onClick: function(){ closePopup(); newDevice();  }, shape: "Rect", bgColor: "rgb(108,164,104)", fontColor: "white", fontSize: 14}), 
                new Button({x: 80 , y: 190, width: 20, height: 20, title: "<" , onClick: function(){ movePopup("left") }, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                new Button({x: 710, y: 190, width: 20, height: 20, title: ">" , onClick: function(){ movePopup("right")}, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
            ],
            images: [

            ],
            functions: function(){ newUserPopUp() },
        }),

        new Popup({
            name: "username",
            numberOfSlides: 1,
            size: createVector(700,300),
            textBoxes: [
                new TextBox({x: 406, y: 110, id: "title", text: "Please enter your new username below.", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: CENTER}), 
            ],
            buttons: [
                // new Button({x: 516, y: 150 , width: 100, height: 45, title: "Save" , onClick: function(){ closePopup(); updateUsernameOnServer(); }, shape: "Rect", bgColor: "rgb(108,164,104)", fontColor: "white", fontSize: 14}), 
                new Button({x: 516, y: 150 , width: 100, height: 45, title: "Save" , onClick: function(){ closePopup(); }, shape: "Rect", bgColor: "rgb(108,164,104)", fontColor: "white", fontSize: 14}), 
                new Button({x: 80 , y: 190, width: 20, height: 20, title: "<" , onClick: function(){ movePopup("left") }, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                new Button({x: 710, y: 190, width: 20, height: 20, title: ">" , onClick: function(){ movePopup("right")}, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
            ],
            images: [

            ],
            functions: function(){ newUserPopUp() },
        }),

        new Popup({
            name: "gameProgress",
            numberOfSlides: 1,
            size: createVector(700,300),
            textBoxes: [
                new TextBox({x: 406, y: 210, id: "title", text: "Are you sure you want to reset all of your progress?", font: fontRegular, fontSize: 20, color: "black", visibility: "visible", align: CENTER}), 
            ],
            buttons: [
                new Button({x: 730, y: 60 , width: 20, height: 20, title: "x" , onClick: function(){ closePopup()      }, shape: "Rect", bgColor: "black", fontColor: "white", fontSize: 14}), 
                //new Button({x: 304, y: 300 , width: 100, height: 30, title: "No" , onClick: function(){ closePopup()  }, shape: "Rect", bgColor: "White", fontColor: "black", fontSize: 14}), 
                new Button({x: 366, y: 300 , width: 100, height: 30, title: "Yes" , onClick: function(){ closePopup(); resetGame(); location.reload();  }, shape: "Rect", bgColor: "rgb(255,0,0)", fontColor: "white", fontSize: 14}), 
            ],
            images: [

            ],
            // functions: function(){ newUserPopUp() },
        }),
    ]
}

function newUserPopUp() // this function runs every frame when a new user opens the game for the first time 
{
    if (popupVisibile) 
    {
        userNameInput.position(316 * scale.x, 150 * scale.y);
        // classCodeInput.position(316 * scale.x, 200 * scale.y);
        userNameInput.style("visibility", "visible");
        // classCodeInput.style("visibility", "visible");
    }
    
}

function showPopUp(name) // call this function with a popup name in it to display that popup
{
    deselectAllCharges();
    let popupToShow = popups.find(popup => popup.name == name);
    popupToShow.visibility = "visible";
    popupToShow.currentSlide = 0;

}

function displayPopups() // this runs every frame and if a popup's visibility is set to visible, it will display it. 
{
    popups.forEach(popUp => {
        if (popUp.visibility == "visible") 
        {
            popUp.display()
            popupVisibile = true;
        }
    })
}

function closePopup() // this function sets all the popups visibility to hidden
{
    popups.forEach(popup => {
    popup.visibility = "hidden";    
    popupVisibile = false;
    })

    hideInputs();
    createPopups()
}

function movePopup(direction) // when the left or right buttons are clicked in a popup, this function will move alll the buttons, images and textboxes in that popup to the left or right by a screen width ammount.
{
    let popupIndex = popups.findIndex(x => x.visibility == "visible");

    let currentPopup = popups[popupIndex];

    currentPopup.textBoxes.forEach(textBox => { // this moves all the textboxes

        if (direction == "left" && currentPopup.currentSlide > 0) 
        {
            textBox.x += width;
        }
        else if (direction == "right" && currentPopup.currentSlide < currentPopup.numberOfSlides)
        {
            textBox.x -= width;
        }
    });

    currentPopup.images.forEach(image => { // this moves all the images

        if (direction == "left" && currentPopup.currentSlide > 0) 
        {
            image.x += width;
        }
        else if (direction == "right" && currentPopup.currentSlide < currentPopup.numberOfSlides)
        {
            image.x -= width;
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

    //console.log(currentPopup.currentSlide);
}


class Popup
{
    constructor(props)
    {
        this.name = props.name;
        this.size = createVector(props.size.x * scale.x, props.size.y * scale.y);
        this.textBoxes = props.textBoxes;
        this.buttons = props.buttons;
        this.functions = props.functions;
        this.images = props.images;
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
            let popupX = (width - popup.size.x) / 2;
            let popupY = (height - popup.size.y) / 2;
            rect(popupX, popupY, popup.size.x, popup.size.y)
        pop()

        popup.textBoxes.forEach(textBox => {
            textBox.display();
        });

        popup.images.forEach(myImage => {
            myImage.display();
        });

        popup.buttons.forEach(button =>
        {
            if ((button.title == ">" && popup.currentSlide < popup.numberOfSlides-1) || 
            (button.title == "<" && popup.currentSlide > 0) || 
            (button.title != "<" && button.title != ">" )) 
            {
                button.visibility = "visible";
                button.display();
            }
            else
            {
                button.visibility = "hidden";
            }
        });

        if (popup.functions != null) 
        {
            popup.functions();
        }
    } 
}