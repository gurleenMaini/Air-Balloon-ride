//variables
var bg,backgroundImage; 
var balloon, position;
var database;

function preload(){
  bg = loadImage("Hot Air Ballon-01.png");
  backgroundImage = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");

}
function setup() {
  //creating a canvas
  createCanvas(800,500);
  database = firebase.database();

  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readHeight, showError);

  bgImage= createSprite(0,0,50,50);
  bgImage.addImage(bg);

  //creating a balloon sprite and adding animation
  balloon = createSprite(100, 300, 50, 50);
  balloon.addAnimation("moving",backgroundImage);
  balloon.scale= 0.32;

}

function draw() {
  background(0);  

  drawSprites();

  //writing the position on the database, making the balloon move with arrow keys
  //changing scale of the balloon when it goes up or down
  if (keyDown(UP_ARROW)){
    balloon.scale=0.25
   updateHeight(0,-1);
  }
  if (keyDown(RIGHT_ARROW)){
    updateHeight(1,0);
    }
    if (keyDown(LEFT_ARROW)){
      updateHeight(-1,0);
      }
      if (keyDown(DOWN_ARROW)){
        updateHeight(0,+1);
        }
 }

//function to read the position
function readHeight(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  console.log(position);
}

//function to show a string in the console if there is an error
function showError(){
  console.log("Error");
}

//function to write the position onto the database
function updateHeight(x, y){
  database.ref("balloon/position").set({
    x : position.x + x,
    y : position.y + y
  })
}