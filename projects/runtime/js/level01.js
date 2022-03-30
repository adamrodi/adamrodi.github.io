var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
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
                { "type": "enemy", "x": 4700, "y": groundY - 50},
                { "type": "enemy", "x": 5900, "y": groundY - 50},
                { "type": "enemy", "x": 6100, "y": groundY - 50},
                { "type": "enemy", "x": 6700, "y": groundY - 50},
                { "type": "enemy", "x": 7900, "y": groundY - 50},
                { "type": "enemy", "x": 8200, "y": groundY - 50},

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
            sawBladeHitZone.rotationalVelocity = 10;

        }

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

            enemy.rotationalVelocity = 0;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
            };

            enemy.onProjectileCollision = function() {
                console.log('The projectile has hit Halle');
                game.changeIntegrity(5);
                game.increaseScore(1000);
                enemy.fadeOut();

            };
        }
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

            reward.rotationalVelocity = 0;

            reward.onPlayerCollision = function() {
                console.log('The Reward has hit Halle');
                game.changeIntegrity(+10);
                reward.fadeOut();
            };

        }
    

        for (var i = 0; i < levelData.gameItems.length; i++){ //iterates through the levelData object to create sawblades, enemies, and reward
            var gameItem = levelData.gameItems[i];

            if (gameItem.type === "sawblade"){
                createSawBlade(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y);
            } 
            if (gameItem.type === "reward"){
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
