const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var backgroundImg,bk_song;

var fruit;
var food;
var cutsound;
var cut,cut1;
var eating;
var bunny;
var fruit_con;
var fruit_con_2;
var rope,rope2;
var ground;
var sad_sound;

var eat;
var sad;

var Edges;

function preload() {

backgroundImg = loadImage("backgroundpng-03.png");
cut1 = loadImage("cut_button.png");
cut = loadImage("cut_btn.png");
sad_sound = loadSound("sad.wav");
cutsound = loadSound("rope_cut.mp3");
  
eating = loadSound("eating_sound.mp3");
bk_song = loadSound("sound1.mp3");
food = loadImage("melon.png");
eat = loadAnimation("eat_0.png","eat_1.png","eat_3.png")
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png") 
}



function setup() {
  createCanvas(400,400);
  canvas = createCanvas(windowWidth - 200, windowHeight - 150);

  //Edges = body.Edges;
  //Edges[0]=300;
  //Edges[0]=800;
  
  engine = Engine.create();
  world = engine.world;

  bk_song.play();
  bk_song.setVolume(0.5);


  cut = createImg('cut_btn.png');
  cut.position(120,90);
  cut.size(50,50);
  cut.mouseClicked(drop);

  cut1 = createImg('cut_button.png');
  cut1.position(1060,80);
  cut1.size(50,50);
  cut1.mouseClicked(drop2);

  rope = new Rope(7,{x:120,y:90});
  rope2 = new Rope(7,{x:1090,y:80});
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
 fruit_con_2 = new Link(rope2,fruit);


 
  bunny= createSprite(200,height-80,100,100);  
  bunny.scale = 0.2;


  eat.frameDelay = 20;
  
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);


}


function draw() 
{
  background(51);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);


  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();


  rope.show();
  rope2.show();

  drawSprites();

if(collide(fruit,bunny)==true)
{
  World.remove(engine.world,fruit);
  fruit = null;
  bunny.changeAnimation('eating');
  eating_sound.play();
}
if(fruit!=null && fruit.position.y>=650)
{
  bunny.changeAnimation('crying');
  bk_song.stop();
  sad_sound.play();
  fruit=null;
 }
 
  if (isKeyPressed) {
    
    if(keyCode==38){

      //if(bunny.y > Edges[0].y-140)
      {
        //bunny.y= bunny.y-3;
      }//else
      {
        bunny.y = bunny.y -1;
      }


  }else if(keyCode==37){
    //if (Edges[1].x+40 == bunny.x) 
          {
            bunny.x = bunny.x -2;
        
          }//else
          {
          //  bunny.x=  bunny.x-1;   

          }
        } else if(keyCode==40){

          //if(bunny.y > Edges[0].y-140)
          {
            //bunny.y= bunny.y-3;
          }//else
          {
            bunny.y = bunny.y +1;
          }
  }else if(keyCode==39){

    //if(bunny.x > Edges[0].x -140)
    {
      //bunny.x= bunny.x-3;
    }//else
    {
      bunny.x = bunny.x +2;
    }
}


}
}
  


function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}



function drop()
{
  cutsound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cutsound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}