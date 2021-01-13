//Create variables here
var dog,happyDog,foods,foodStock,database,dogImage,happyDogImage,milkImage
var button1,button2,currentTime,foodStockImage
var bedRoomImage,gardenImage,livingRoomImage,WashRoomImage,lastfeed

function preload()
{
  //load images here
  dogImage=loadImage("Dog.png")
  happyDogImage=loadImage("happydog.png")
  milkImage=loadImage("Milk.png")
  bedRoomImage=loadImage("Bed Room.png")
  gardenImage=loadImage("Garden.png")
  livingRoomImage=loadImage("Living Room.png")
  WashRoomImage=loadImage("Wash Room.png")
  foodStockImage=loadImage("Food Stock.png")
}

function setup() {
  createCanvas(500, 500);
 // dog=createSprite(250,250,50,50);
  //dog.addImage(dogImage)
 // dog.scale=0.1
 button1=createButton("feed")
 button1.position(230,100)
 button2=createButton("refill")
 button2.position(280,100)
  database=firebase.database()
  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  var FeedingTime=database.ref('feedingTime');
  FeedingTime.on("value",readFeedingTime);
}


function draw() {  
  background(foodStockImage)
  console.log(hour())
 
  stroke ("black")
  text("food remaining:"+foods,250,50)
  button1.mousePressed(function(){
    writeStock(foods);
  })
  button2.mousePressed(function(){
    writeStock(51)
  }) 
 currentTime=hour()
 if(currentTime==lastfeed+1)
 {
   background(livingRoomImage)
   button1.hide()
   button2.hide()
 }  
 else if(currentTime==lastfeed+2)
{
  background(washRoomImage)
  button1.hide()
  button2.hide()
}
else if(currentTime==lastfeed+3)
{
  background(gardenImage)
  button1.hide()
  button2.hide()
}
 else{
   background(foodStockImage)
   button1.show()
   button2.show()
 } 

  drawSprites();
 
  

}
function readStock(data)
{
  foods=data.val();

}
function writeStock(x)
{
  
  if(x>0){
    x=x-1;
  }

  database.ref('/').update({
food:x,
feedingTime:hour()
  })
}
function display()
{
  var x=50
  for(i=1;i<=foods;i=i+1)
  {
  image(milkImage,x,50,30,30)
  x=x+10
  }
}
function readFeedingTime(data)
{
lastfeed=data.val();
}





