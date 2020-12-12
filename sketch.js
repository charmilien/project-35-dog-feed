
var dog,dogimg1, dogimg,bottle,bottleImg;
var database,loc,dbStock,feedAgain;


function preload()
{
  dogimg1=loadImage("images/dogImg1.png")
  dogimg=loadImage("images/dogImg.png")
  bottleImg=loadImage("images/milk bottle.png")
}

function setup() {
  database=firebase.database();
  loc=database.ref("Food")
  loc.on("value",readStock)
  createCanvas(600, 500);
  
  dog=createSprite(300,300,20,20)
  dog.addImage(dogimg)
  dog.scale=0.4;
  
  feedAgain=createSprite(500,450,100,30); feedAgain.shapeColor="green";
  bottle=createSprite(225,315,70,15);  bottle.addImage(bottleImg); bottle.scale=0.4;bottle.visible=false;
}

function draw() 
{  
 background("lightgreen")

  if(keyWentDown("up") ) 
  {  writeStock(dbStock) }

  if(mousePressedOver(feedAgain))
  {
    database.ref("/").update({Food:10}); dog.addImage(dogimg)
  }
  drawSprites();
  fill("blue");  textSize(20);  
  text("****Feed dog by pressing 'Up Arrow Key****",120,30);
  text("**MILK BOTTLE***  :  " + dbStock, 220, 150)
  textSize(15);  text("BUY MILK",460,460)
}

function writeStock(x)
{
 
  if(x>0) 
  {   
    x=x-1; bottle.visible=true; 
  }
  if(x==0) 
  {  
    dog.addImage(dogimg1); 
    bottle.visible=false;
  }
  database.ref("/").update({Food:x})
  
}

function readStock(data)
{  
  dbStock=data.val(); 
}

