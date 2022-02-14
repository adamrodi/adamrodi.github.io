var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;           // var to hold a single circle
        var circles = [];     // var that stores all circles in an array

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){      // function and code that draws each circle when called
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
            physikz.addRandomVelocity(circle, canvas, 8, 8);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 8 : Call the drawCircle() function 
        for(var i = 0; i<= 100; i++){    // loop that draws 100 circles
            drawCircle();                // function to draw a circle that is being called 100 times
        }


        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            /* commented out bc todo 9 replaces it without having to repeat yourself
            physikz.updatePosition(circles[0])
            physikz.updatePosition(circles[1])
            physikz.updatePosition(circles[2])
            physikz.updatePosition(circles[3])
            physikz.updatePosition(circles[4])
            */
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
           /* commented out bc todo 9 replaces it without having to repeat yoourself 100 times
            game.checkCirclePosition(circles[0])
            game.checkCirclePosition(circles[1])
            game.checkCirclePosition(circles[2])
            game.checkCirclePosition(circles[3])
            game.checkCirclePosition(circles[4])
            */

            // TODO 9 : Iterate over the array
           for(var k = 0; k <= circles.length - 1; k++){  //loop that moves the circles and keeps them in bounds
            physikz.updatePosition(circles[k])            //makes the circles move!!
            game.checkCirclePosition(circles[k])          //keeps circles in the screen
           }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) { // if the circle goes off the right side of the screen it reappears on the left
                circle.x = 0;
            }
            if ( circle.x < 0 ) {            // if the circle goes off the left side of the screen it reappears on the right
                circle.x =  - canvas.width;
            }
            if ( circle.y < 0 ) {            // if the circle goes off the top of the screen it reappears on the bottom
                circle.y = canvas.height;
            }
            if ( circle.y > canvas.height ) { // if the circle goes off the bottom of the screen it reappears on the top
                circle.y = 0;
            }
            // TODO 7 : YOUR CODE STARTS HERE //////////////////////
            


            // YOUR TODO 7 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
