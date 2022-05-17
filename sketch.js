var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedDog;
var foodObj;
var testarComida;

//create feed and lastFed variable here
var feed, lastFeed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('comida');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog = createButton("Alimente o cão");
  feedDog.position(700,95);
  feedDog.mousePressed(feed);

  addFood=createButton("Adicionar comida");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFeed = database.ref("hrComida").on("value", function(data){
    lastFed = data.val()
  });
 
  //write code to display text lastFed time here
  fill("black");
  text("Última refeição : " + lastFed, 500,95);
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feed(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  testarComida = foodObj.getFoodStock();
  if (testarComida > 0){
    foodObj.updateFoodStock(testarComida - 1);
    database.ref("/").update({
      hrComida:hour(),
    })
  }

}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    comida:foodS
  })
}
