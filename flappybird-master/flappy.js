//the Game object used by the phaser.io library
      var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
      var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
      var labelScore;
      var score = -1;
      var player;
      var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/oie_transparent.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
      // set the background colour of the scene
  game.stage.setBackgroundColor("#00CCFF");
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
  generatePipe();

  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(playerJump);
  player.body.velocity.x = 5;
  player.body.gravity.y = 400;
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval, generatePipe);
}



function moveRight() {
  player.x = player.x + 10;
}



/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}
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
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;

}
function update() {

game.physics.arcade.overlap(

player,

pipes,

gameOver);

}

function gameOver(){

game.destroy();

}

function gameOver() {

location.reload();
}
