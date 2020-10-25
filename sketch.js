// some global variables
let imgs = [];
let level;
let counter = 0;
let numLevels;
let person;
let score = 0; 
let gameOver = false;
let playerColor = [120, 202,90];




//a function to make a sign for each level
class Sign{
  loadedImage;
  constructor(){
    this.loadedImage = sign;
    this.x = 310;
    this.y = 280;
   
  }

  //draw the sign
  display(){
    image(this.loadedImage, this.x, this.y);
  }
}




function preload(){

  //load the player image
  person = loadImage("img/person.png"); 
  //load the background images
  imgs[0] = loadImage("img/0.png");
  imgs[1] = loadImage("img/1.png");
   imgs[2] = loadImage("img/2.png");
   imgs[3] = loadImage("img/3.png");
//load sign image
  sign = loadImage("img/sign.png");

}


function setup() {
  createCanvas(400, 400);
  numLevels = imgs.length;
  //check the start game function way at the bottom to see what we do there
  startGame();  
}

function draw() {
  //if the game isn't over then draw the game
  if(!gameOver){
    drawGame();
  } else {
    //if the game is over draw the game over screen
    background(0)
    drawGameOver();
  }
}



//our player constructor, gets remade for every level
class Player{
  constructor(targetX, targetY){
  this.x = 0;
  this.y = 250;
  this.width = 250;
  this.height = 250;
  this.targetX = targetX;
  this.targetY = targetY;
  this.atGoal = false;
  }
  
  //draw the player
  display(){
    image(person, this.x, this.y, this.width,this.height);  
  }
  
  //functions to move the player by incrementing its x and y values
  moveUp(){
     this.y-=10; 
  }
  
    moveDown(){
     this.y+=10; 
  }
  
    moveLeft(){
     this.x-=10; 
  }
  
    moveRight(){
     this.x+=10; 
  }
  
  //check if the person is near the sign
  checkPerson(){
      let goal = dist(this.x + this.width/2, this.y, this.targetX, this.targetY);

      if(goal < 20 ){
        this.atGoal = true;
      }  
  }



}



//this is a class which keeps track of all the aspects of a level
class Level{
constructor(img){
    this.bg = img;
    this.sign = new Sign();
    this.targetX = this.sign.x;
    this.targetY = this.sign.y;
    this.player = new Player(this.targetX, this.targetY);
}

  
  //draw the level
  display(){
    image(this.bg, 0, 0, width, height);
    this.sign.display();
    this.player.display();
        
    //draw score
    drawScoreBox();
    drawScore();
  }
}


// one way to get key input to move the character
function keyPressed(){
  if(keyCode === UP_ARROW){
      level.player.moveUp();
  } else if(keyCode === LEFT_ARROW){
      level.player.moveLeft();
  } else if(keyCode === RIGHT_ARROW){
      level.player.moveRight();
  }else if(keyCode === DOWN_ARROW){
      level.player.moveDown();
  }
}

//make a white box to show the scoreboard in
function drawScoreBox(){
  fill(255);
  noStroke();
  rect(0,0,width, 20);
}

//draw current score to the screen
function drawScore(){
  fill(0);
  textSize(20);
  text("score: ", 10,15);
  text(score, 70, 15)
}



function drawGame(){
    //the level has a player which has a method to check to see if it reached the goal
    level.player.checkPerson();
 
  //if the player has reached the goal then update the counter and make a new level
  if(level.player.atGoal){
      score++
      counter++
      level = new Level(imgs[counter%imgs.length]);  
  } 
    //display the level
    level.display(); 
}



//gets called when the time runs out (not using timer)
//function drawGameOver(){
//  fill(255);
  //text('game over', 100, 200);
  //text('click to restart', 100, 250);
//}



//if the game is over and we click, start the game again
function mousePressed(){
  if(gameOver){
    startGame();
  }
}
//reset all the global variables to the initial state and make a new Level
function startGame(){
    score = 0;
    gameOver = false;
    level = new Level(imgs[counter]);
}