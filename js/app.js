'use strict'

var rowPosition = [60, 140, 220, 310];
var colPosition = [-2, 99, 200, 301, 402];
var gemImage = ['images/Gem Blue.png','images/Gem Green.png', 'images/Gem Orange.png'];
var LEFT_BORDER = 0;
var RIGHT_BORDER = 354;
var UP_BORDER = 399;
var DOWN_BORDER = 0;
var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)+1) + min;
}


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    if (this.x > 550) {
       this.x = -300;
       this.y = rowPosition[getRandomInt(-1,3)]
       this.speed = getRandomInt(100,520);
   }

   if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.reset();
        player.level -= 1;
        Enemy.prototype.resetEnemy();
        Enemy.prototype.spawnEnemy();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.spawnEnemy = function(){
  for (var i = 0; i < player.level; i +=2){
    var positionY = getRandomInt(-1, 3);
    var enemy = new Enemy (-100, rowPosition[positionY], getRandomInt(100,200));
    //put them into the array
    allEnemies.push(enemy);
  }
}

Enemy.prototype.resetEnemy = function(){
  allEnemies = [];
}

// gem class
var Gem = function(x, y){
  this.x = x;
  this.y = y;
  // randomly generate different types of gems
  this.gem = gemImage[getRandomInt(0,2)];
}

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.gem), this.x, this.y);
}

Gem.prototype.update = function() {
  if (player.x < this.x + 60 &&
       player.x + 37 > this.x &&
       player.y < this.y + 25 &&
       30 + player.y > this.y) {
         var index = allGems.indexOf(this);
         allGems.splice(index, 1);
       }
}

Gem.prototype.spawnGem = function(){
  //randomly generate a certain number of gems
  var gemNumber = getRandomInt(0,3);
  for (var i = 0; i <= gemNumber; i++){
    var positionX = getRandomInt(0, 4);
    var positionY = getRandomInt(0, 3);
    var newGem = new Gem (colPosition[positionX],rowPosition[positionY]);
    //put them into the array
    allGems.push(newGem);
  }
}

Gem.prototype.gemReset = function() {
  allGems = [];
}


// player class
var Player = function(x, y){
  this.x = x;
  this.y = y;
  this.level = 1;
  this.playerImage = 'images/char-boy.png';
}

Player.prototype.handleInput = function(input){
  if (input === 'left' && this.x > LEFT_BORDER){
    this.x -= 101;
  } else if (input === 'right' && this.x < RIGHT_BORDER) {
    this.x += 101;
  } else if (input === 'up' && this.y > DOWN_BORDER) {
    this.y -= 83;
  } else if (input === 'down' && this.y <UP_BORDER) {
    this.y += 83;
  }
}

Player.prototype.update = function(){
  if( this.y < 0 ){
        this.reset();
        Gem.prototype.gemReset();
        Gem.prototype.spawnGem();
        this.level += 1;
        Enemy.prototype.resetEnemy();
        Enemy.prototype.spawnEnemy();
      }
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.playerImage), this.x, this.y);
};





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var allGems = [];
var player = new Player(200,400);
var enemy;

Enemy.prototype.spawnEnemy();
Gem.prototype.spawnGem();






// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
