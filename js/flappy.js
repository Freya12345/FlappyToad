//the Game object used by the phaser.io library
      var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var gameSpeed = 200;
var gameGravity = 200;
var jumpPower = 200;
      var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
      var labelScore;
      var score = -1;
      var player;
      var pipes = [];
      var balloons = [];
 // Loads all resources for the game and gives them names.
 //
function preload() {
  game.load.image("playerImg", "../assets/oie_transparent.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/redpipe.png");
  game.load.image("background","../assets/back.png");
  game.load.image("balloons","../assets/balloons.png");
  game.load.image("weight","../assets/weight.png");
}
/*
 * Initialises the game. This function is only called once.
 */
function create() {
      // set the background colour of the scene
      var background = game.add.image(0,0, "background");
  //game.stage.setBackgroundColor("#00CCFF");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.text(400, 10, "Welcome to the game",{font: "40px Times New Roman", fill: "#000099"});
  game.input.onDown.add(clickHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  player = game.add.sprite(100, 200, "playerImg");
  player.scale.setTo(0.25, 0.25);
  game.physics.arcade.enable(player);
  labelScore = game.add.text(20, 20, "0");

  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);
  generate();

  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(playerJump);
  player.body.velocity.x = 5;
  player.body.gravity.y = 400;
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval, generate);
}


function moveRight() {
  player.x = player.x + 10;
}


/*
 * This function updates the scene. It is called for every new frame.
 */

function clickHandler(event) {
  //alert("Click!");
  //alert("The position is: " + event.x + "," + event.y);
  game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
}

function playerJump() {
player.body.velocity.y = -200;
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}

function generatePipe() {
// calculate a random position for the gap
var gap = game.rnd.integerInRange(1 ,5);
// generate the pipes, except where the gap should be
for (var count=0; count<8; count++) {
  if (count != gap && count != gap+1) {
    addPipeBlock(750, count * 50);
  }
}
changeScore();
}


function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipeBlock.scale.setTo(0.008, 0.008);
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}

function update() {
game.physics.arcade.overlap(player,pipes,gameOver);
  if(player.body.y < 0 || player.body.y > 400){
  gameOver();
game.state.restart();
}

}


function generate() {
var diceRoll = game.rnd.integerInRange(1,4);
if(diceRoll==1) {
generateBalloons();
} else if(diceRoll==2) {
generateWeight();
} else {
generatePipe();

}

}


function generateBalloons(){
  var bonus = game.add.sprite(width, height, "balloons");
balloons.push(bonus);
game.physics.arcade.enable(bonus);
bonus.body.velocity.x = - 200;
bonus.body.velocity.y = - game.rnd.integerInRange(60,100);
}

function generateWeight(){
  var bonus = game.add.sprite(width, height, "weight");
balloons.push(bonus);
game.physics.arcade.enable(bonus);
bonus.body.velocity.x = - 200;
bonus.body.velocity.y = - game.rnd.integerInRange(60,100);
}

function gameOver(){
  game.state.restart();

}
