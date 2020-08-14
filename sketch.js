//Create variables here
var dog,happydog;
var database;
var foodS,foodStock;
var dogimg1,dogimg2;
var feedButton,addFood;
var fedTime,lastFed;
var foodObj;


function preload()
{
  //load images here
  dogimg1=loadImage("images/dogImg.png");
  dogimg2=loadImage("images/dogImg1.png");

}

function setup() {
  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
	createCanvas(500, 500);
   dog=createSprite(250,250,50,50);
   dog.addImage(dogimg1);
   dog.scale=0.25;

   foodObj=new Food();
   
   feedButton=createButton("feed");
   feedButton.position(700,95);
   feedButton.mousePressed(feedDog);

   addFood=createButton("add food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);

   lastFed=database.ref('lastFed');
   lastFed.on("")

}


function draw() {  
  background (46, 139, 87);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last feed:"+lastFed%12+"PM",350,30);

  }
  else if(lastFed==0){
    text("Last Feed:12 AM",3500,30);
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30);
  }


  

  drawSprites();
  //add styles here
textSize(20);
fill("white");
stroke("white");
text("FoodStock:"+foodS,150,100)
}



function readStock(data){
  foodS=data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })

}

function feedDog(){
  dog.addImage(dogimg2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}