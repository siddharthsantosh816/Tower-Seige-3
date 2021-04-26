
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var box, ground1, ground2, ground3;
var hexagon, slingshot;
var hexPos = 0, attempt = 5,score = 0;
var backgroundImg;


var PLAY = 1;
var END = 0;
var gameState=PLAY;

function preload(){
	getTime();
}

function setup() {
	createCanvas(1200, 600);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;
		
	//Create the Bodies Here.
	// first pyramid
	ground1 = new Ground(600,450,330,20);
	ground2 = new Ground(900,250,250,20);
	ground3 = new Ground(width/2,height,width,20);
	hexagon = new Hexagon(200,200,50,50);
	slingshot = new Slingshot(hexagon.body,{x:150,y:300});
	for (var x = 0; x < 7; x++){
		box[x]=new Box(480+x*40,420,40,40);
	}	
	for (var x = 7; x < 12; x++){
		box[x]=new Box(520+(x-7)*40,380,40,40);
	}
	for (var x = 12; x < 15; x++){
		box[x]=new Box(560+(x-12)*40,340,40,40);
	}
	box[15]=new Box(600,300,40,40);
	
	// second pyramid
	for (var x = 16; x < 21; x++){
		box[x]=new Box(820+(x-16)*40,220,40,40);
	}
for (var x = 21; x < 24; x++){
		box[x]=new Box(860+(x-21)*40,180,40,40);
	}
	box[24]=new Box(900,140,40,40);
	
	Engine.run(engine);	
}

function draw() {
	if(backgroundImg){
		background(backgroundImg);
	}
	ground1.display();
	ground2.display();
	ground3.display();
	hexagon.display();
	slingshot.display();

	for (var x = 0; x < 7; x++){
		fill("blue")
		box[x].display();
	}
	for (var x = 7; x < 12; x++){
		fill("green")
		box[x].display();
	}
	for (var x = 12; x < 15; x++){
		fill("purple")
		box[x].display();
	}
	fill("grey")
	box[15].display();

	for (var x = 16; x < 21; x++){
		fill("yellow")
		box[x].display();
	}
	for (var x = 21; x < 24; x++){
		fill("pink")
		box[x].display();
	}
	fill("red")
	box[24].display();
	
		if((score === 25)){
			gameState = END;
			textSize(30)
			text("Good Job! You Won!!",width/3+30,height/2-50);
		}
			
	if(attempt<=0){
		gameState=END;
	}
	if(gameState===PLAY){
		textSize(30);
		text("Press Spacebar to Continue",width/3+30,height-20);
	}
	if (gameState === END) {
		textSize(30);
		text("Press 'R' if you want to restart the Game!!",width/3-40, height-30);
		
		if (score < 25) {
			textSize(30);
	 		text("You Lost. Don't Give up. Try Again!!", width/3-30, 50);
		}
	}

	textSize(30)
	text("Attempts Left: "+ attempt,50,50)
	text("Score: "+ score, width-250,50);
	drawSprites();	
}
 
 
 function mouseDragged(){
	if ((hexPos === 0) && (mouseX <400) && (gameState === PLAY)) {
		Matter.Body.setPosition(hexagon.body,{x:mouseX,y:mouseY});
	}
 }
 
 function mouseReleased(){
	 if (gameState === PLAY) {
		slingshot.fly();
		hexPos = 1;
		attempt = attempt - 1;
	 }
  }
  
  function keyPressed(){
    if((keyCode===32) && (gameState === PLAY)){
    	Matter.Body.setPosition(hexagon.body, {x:150, y:200});
		slingshot.attach(hexagon.body);
		hexPos=0;
    }
	if((keyCode===82) && (gameState === END)){
		gameState = PLAY;
		attempt = 5;
		hexPos = 0;
		score=0;
		setup();
	}
}

async function getTime(){
	var option = Math.round(random(0,1));
	console.log(option);
	if (option === 0) {
		var d = new Date();
		var hour = d.getHours();
	} else {
        var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata");
		var responseJSON=await response.json();
		console.log(response);
		var hour =responseJSON.datetime.slice(11,13);
	}
    console.log(hour);

    if(hour>=6 && hour<=18){
        backgroundImg=loadImage("sprites/bg.png");
    }
    else{
        backgroundImg=loadImage("sprites/bg2.jpg");

    }
}
