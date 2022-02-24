var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'lightblue');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            //everytime the loop runs it creates a circle with a random x and y respective to the canvas and is added to the background
            for (var i = 0; i <= 100; i++){
                var circle = draw.circle(4,'white','LightGray',2); //variable called circle that holds each circle
                circle.x = canvasWidth*Math.random(); //multiplies canvaswidth * a random decimal between .1 and .99 and assigns it to circle.x
                circle.y = groundY*Math.random(); //multiplies groundY * a random decimal between .1 and .99 and assigns it to circle.y
                background.addChild(circle); //adds circle to background
            }
         
         
            var moon = draw.bitmap('img/moon.png'); // create a var called moon. draw.bitmap draws the var and stores it in the variable
            moon.x = canvasWidth - 300; //holds the x value
            moon.y = groundY - 400; //holds the y value
            moon.scaleX = 0.4; //changes the x scale of the moon
            moon.scaleY = 0.4; //changes the y value of the moon
            background.addChild(moon); //adds the moon to the background


            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png'); //reassigns the drawn image tree to the variable tree
            tree.x = canvasWidth - 300; //assigns an x value to the tree
            tree.y = groundY - 150; //assigns a y value to the tree
            tree.scaleX = 0.5; //changes the x scale of the tree
            tree.scaleY = 0.5; //changes the y scale of the tree
            background.addChild(tree); //add tree to the background
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; // taking the value of tree.x and decreasing it by 1 pixel every time the update function runs. 

            if(tree.x < -200) {
                tree.x = canvasWidth;
            }

            
            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
