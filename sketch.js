var bground, backgroundImage;
var balloon, balloonImage;
var myDataBase, databaseRef;
var position;

function preload(){
backgroundImage = loadImage("./Hot Air Ballon-01.png")
balloonImage = loadAnimation("./Hot Air Ballon-02.png","./Hot Air Ballon-03.png","./Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(800,400);
  bground= createSprite(400, 200, 800, 400);
  bground.addImage("city",backgroundImage);
  bground.scale=0.35
  balloon=createSprite(100,300,20,20);
  balloon.addAnimation("fly",balloonImage);
  balloon.scale=0.3

  myDataBase= firebase.database();
  databaseRef= myDataBase.ref("bodyposition");
  databaseRef.on("value",readPosition,problem);
}

function draw() {
  background(255,255,255);  
  if (keyDown(UP_ARROW)){
    changeposition(0,-1)
    balloon.scale=balloon.scale-0.0009
  }
  if (keyDown(LEFT_ARROW)){
    changeposition(-1,0)
  }
  if(keyDown(RIGHT_ARROW)){
    changeposition(1,0)
  }
  if (keyDown(DOWN_ARROW)){
    changeposition(0,1)
    balloon.scale=balloon.scale+0.0009
  }
  drawSprites();
}
function changeposition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}
function readPosition(data){
  position=data.val()
  balloon.x=position.x
  balloon.y=position.y

}
function problem(){
  console.log("error in your database")
}
function writePosition(x,y){
  myDataBase.ref("balloon/position").set({
      "x": position.x+ x, 
      "y":position.y+ y
  })
  }