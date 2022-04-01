var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        //object that defines where and how many sawBlades, enemies, and rewards.
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 600, "y": groundY - 50},
                { "type": "sawblade", "x": 1100, "y": groundY - 50},
                { "type": "sawblade", "x": 2000, "y": groundY - 50},

                { "type": "enemy", "x": 900, "y": groundY - 50},
                { "type": "enemy", "x": 1500, "y": groundY - 50},
                { "type": "enemy", "x": 2500, "y": groundY - 50},
                { "type": "enemy", "x": 3500, "y": groundY - 50},
                { "type": "enemy", "x": 4100, "y": groundY - 50},
                { "type": "enemy", "x": 4600, "y": groundY - 50},
                { "type": "enemy", "x": 5100, "y": groundY - 50},
                { "type": "enemy", "x": 6000, "y": groundY - 50},
                { "type": "enemy", "x": 6700, "y": groundY - 50},
                { "type": "enemy", "x": 7100, "y": groundY - 50},

                { "type": "reward", "x": 1700, "y": groundY - 50},
                { "type": "reward", "x": 3000, "y": groundY - 50},
                { "type": "reward", "x": 3900, "y": groundY - 50},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
            //container for the sawBlade code
        function createSawBlade(x, y){
            var hitZoneSize = 25; //creates size of the hitzone
            var damageFromObstacle = 10; //sets the damage of the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone
            sawBladeHitZone.x = x; //x position of hitzone
            sawBladeHitZone.y = y; //y position of hitzone
            game.addGameItem(sawBladeHitZone);  //adds the hitzone
    
            var obstacleImage = draw.bitmap('img/fireball.png'); // drawing the image and storing it in the variable
            sawBladeHitZone.addChild(obstacleImage); // add the image to the hitzone so we can see it
            obstacleImage.x = - 25 // tweaks the image 25 pixels to the left
            obstacleImage.y = - 25 // tweaks the image 25 pixels up
            obstacleImage.scaleX = 0.18; //controls the x scale of the obstacle
            obstacleImage.scaleY = 0.18; //controls the y scale of the obstacle
            sawBladeHitZone.rotationalVelocity = 10; //how fast the sawblade rotates

        }
            //container for the enemy code
        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25); // creating the game item and storing it in the var enemy
            var redSquare = draw.bitmap('img/enemy.png'); // creates rectangle and stores as redSquare
            redSquare.x = -25; //x position of the enemy
            redSquare.y = -25; //y position of the enemy
            redSquare.scaleX = 0.18; //controls the x scale of the enemy
            redSquare.scaleY = 0.18; //controls the y scale of the enemy

            enemy.addChild(redSquare); // add the redSquare to the enemy game item
        
            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy); // adds enemy to the game

            enemy.velocityX = -1; // this cause the enemy to move one pixel to the left on the x position

            enemy.rotationalVelocity = 0; //how fast the enemy rotates

            enemy.onPlayerCollision = function() {  // when the player collides with the enemy this happens
                console.log('The enemy has hit Halle'); //prints to the console, "the enemy has hit halle" when the enemy collides with halle
                game.changeIntegrity(-10); //takes away 10 health when the player collides with the enemy
            };

            enemy.onProjectileCollision = function() { // when the projectile collides with the enemy this happens
                console.log('The projectile has hit Halle'); //prints to the console, "the projectile has hit halle" when the enemy collides with the projectile
                game.changeIntegrity(5); //adds 5 health when the projectile collides with the enemy
                game.increaseScore(1000); //increases the score by 1000 when the projectile collides with the enemy
                enemy.fadeOut(); //makes the enemy disappear when the projectile collides with the enemy

            };
        }
            //container for the reward code
        function createReward(x, y){
            var reward = game.createGameItem('reward',25); // creating the game item and storing it in the var Reward
            var blueSquare = draw.bitmap('img/rewardCoin.png'); // creates rectangle and stores as redSquare
            blueSquare.x = -25; //x position of the reward
            blueSquare.y = -25; //y position of the reward
            blueSquare.scaleX = 0.1; //controls the x scale of the reward
            blueSquare.scaleY = 0.1; //controls the y scale of the reward
            reward.addChild(blueSquare); // add the blueSquare to the Reward game item
        
            reward.x = x;
            reward.y = y;

            game.addGameItem(reward); // adds Reward to the game

            reward.velocityX = -1; // this cause the Reward to move one pixel to the left on the x position

            reward.rotationalVelocity = 0; //how fast the reward rotates

            reward.onPlayerCollision = function() { // when the player collides with the reward this happens
                console.log('The Reward has hit Halle'); //prints to the console, "the Reward has hit halle" when the Reward collides with halle
                game.changeIntegrity(10); //adds 10 health when the player collides with the reward
                game.increaseScore(1000); //adds 1000 score when the player collides with the reward
                reward.fadeOut(); //makes the Reward disappear when the projectile collides with the Reward
            };

        }
    

        for (var i = 0; i < levelData.gameItems.length; i++){ //iterates through the levelData object to create sawblades, enemies, and reward
            var gameItem = levelData.gameItems[i];

            if (gameItem.type === "sawblade"){ //if gameItem is the sawBlade it creates the sawBlade at the x and y position given in the object
                createSawBlade(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "enemy"){ //if gameItem is the enemy it creates the enemy at the x and y position given in the object
                createEnemy(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "reward"){ //if gameItem is the Reward it creates the Reward at the x and y position given in the object
                createReward(gameItem.x, gameItem.y);
            } 
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
