<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">DEFI Game</h3>

  <p align="center">
    Documentation on how the game works and how you can add to it.
    <br />
    <a href="https://efieldsim.ithaca.edu/site/game.html"><strong>Play Game »</strong></a>
    <br />
    <br />

  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Languages-and-Libraries">Languages and Libraries</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://efieldsim.ithaca.edu/site/game.html)

Because electric fields cannot be touched or seen, simulations are often utilized to build students' understanding of them by providing them with a visual of electric fields and the motion of test charges through them. The objective of the simulation is to improve students’ qualitative understanding of how electric fields are impacted by a configuration of charges by creating a dynamic representation of the electric field lines, field vectors, equipotential lines and the voltage created by the charges on screen. After creating a charge configuration, the simulation visualizes the motion of test charges through the electric field. 

The core physics principles of the simulation have also been used as the foundation of the mechanics of an educational game. Our aim in the gamification of the simulation is to improve motivation and engagement in the material. Both the simulation and game were built in JavaScript so they will run on most browsers on a computer or mobile device. 


Learning Objectives:
* Predict the general shape and direction of electric field lines for a system of charges
* Relate the shape of equipotential lines to the shape of electric field lines
* Compare the curve of the electric field lines to the trajectory of a test charge


### Languages and Libraries

The entire game runs inside a canvas tag in a webpage. HTML and CSS are used to set up the page then p5.js creates the canvas with the game loop and everything else. Everything else is done in Javascript. 
* [Javascript](https://www.w3schools.com/js/default.asp)
* [p5.js](https://p5js.org/)
* [HTML](https://www.w3schools.com/html/default.asp)
* [CSS](https://www.w3schools.com/css/default.asp)



<!-- GETTING STARTED -->
## Design

The game is primarily designed the game itself to target the learning goals listed above. Intuition and other resources were used when making the smaller decisions in the game. 

The gameplay is broken down into a few distinct parts
While in "Build" mode:
* You add neutral charges to the screen by touching anywhere on the screen 
* You can then use the slider that appears on the bottom of the screen to adjust the magnitude and sign of the charge that you just created. 
* As you add, remove or adjust the magnitude of test charges, you will see a live representation of how the electric field changes as well as a small hint as to what the trajectory of the test charge will look like. 
* When you are satisfied with the electric field that you have created, you can press the “Play” button to see the full trajectory of the test charge in your electric field. 

While in "Play" mode:
* you cannot edit any charges location or magniude but not the test charge will move in accordace to the electric field. 
* When the test charge touches any of the stars, they are collected and will improve your score
* If the test charge hits the edge of the track, it stops moving and you need to click the "Build" button to edit your electric field


### Mayer's 







<!-- USAGE EXAMPLES -->
## Code

Object oriented programming is used throughout the game. The Screen, Button, FieldLine, Image, Screen, Star, TestCharge and Track classes can be found in own their self-titled files. Functions that primarily only use that one class can also be found in that classes self-titled file. 

There is a file called variables.js that has all global variables in it. They can technically be declared anywhere but this is a little more organized. 





### p5.js Basics

When the page is first loaded the p5.js library will look for the preload(), setup() and draw functions. They are ran in that order. 

The preload() function is used to handle asynchronous loading of external files in a blocking way. If a preload function is defined, setup() will wait until any load calls within have finished. This is where all of the images and fonts are moved to the user's RAM for later usage. 

The setup() function is called once when the program starts. It's used to create the canvas tag that you will see is not included in the HTML file. There can only be one setup() function for each program and it shouldn't be called again after its initial execution.

Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped. The number of times draw() executes in each second may be controlled with the frameRate() function.

All of these functions can be found in the game.js file. 

### Screens
The game works around different "screens" that are all created when the game first launches but only one screen is visible and can be interacted with at any given time. The createScreens() function in the screens.js file creates each screen and gives it its unique properties. These include the name of the screen, the textboxes and the buttons that are used in said screen. All screens are stored in an array called screens. 

This is how a screen is created. 
   ```sh
   new Screen({
            name: "",       // Will not be seen by tthe user. Only used for navigaiton - STRING
            title: "",      // This will be displayed on the screen - STRING
            titlePosition: createVector(0, 0),      // x-y vector position of title
            titleFontSize: 24,      // title font size - INT
            visibility: "",       // visibiliy of screen. Only visible when user is on the screen - STRING
            backgroundColor: "",       //  Background color - STRING 
            buttons: [],        // Create button objects for every button that will appear - ARRAY of objects
            textBoxes: [],      // create textbox objects fot every textbox that will appear - ARRAY of objects
            })
   ```


### Buttons
Each Screen has reassigned buttons. Buttons will visually showup on the screen and will do whatever funtion is assigned to them when they are clicked. They know they are clicked because of collision detection based on the buttons shape and size. 


This is how a Button is created. 
   ```sh
   new Button({
       x: 662,      // x position - INT
       y: 75,       // y position - INT
       width: 100,      //  width - INT
       height: 40,      // 
       title: "PLAY" ,      //  - STRING
       onClick: "Group Select",         // function ran when button is clicked - STRING
       shape: "Home",       // shape used for collision detection - STRING
       bgColor: "rgba(0,0,0,0)",        // background color - STRING
       fontColor: "white",      // font color - STRING
       fontSize: 24,        // font size - INT
       font: spaceFont      //  - Font decared in preload()
       })
   ```


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png