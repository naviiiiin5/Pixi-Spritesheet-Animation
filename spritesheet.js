var app = new PIXI.Application({ width: 1920, height: 950 });
document.body.appendChild(app.view);
document.addEventListener("keydown",onkeydown);
document.addEventListener("keyup",onkeyup);
PIXI.loader.add('images/spritesheet.json').load(onAssetsLoaded);
let background,bg;
let frameCount=1;
let capguyAnim,manholeAnim;
let stageWidth=app.screen.width;
let stageHeight=app.screen.height;

function onAssetsLoaded()
{
    //Background Sprite
    bg = PIXI.Texture.from("background.png");
    background=new PIXI.Sprite(bg);
    app.stage.addChild(background);
   
    // Bus Bench
    staticSprite(180,stageHeight/2-70,"objects/Bus Bench.png");

    // Fruits Stand
    staticSprite(stageWidth/2+40,stageHeight/2+200,"objects/Fruitstand0001.png");

    // Flower Pot
    staticSprite(stageWidth-120,stageHeight/2+170,"objects/Flower Pot 20001.png");

    //Mail Box1
    spriteAnimation(stageWidth/2+550,stageHeight/2+245,"objects/mailbox1/Mailbox",5,frameCount);
    frameCount++;

    //Mail Box2
    spriteAnimation(stageWidth/2-330,stageHeight/2+230,"objects/mailbox2/Mailbox",11,frameCount);
    frameCount++;

    // News Paper Box
    spriteAnimation(stageWidth/2-200,stageHeight/2+270,"objects/newspaperbox/NewspaperBox_",4,frameCount);
    frameCount++;

    // Store Sign
    spriteAnimation(160,stageHeight-200,"objects/storesign/StoreSign_",5,frameCount);
    frameCount++;

    // Dustbin
    spriteAnimation(stageWidth/2+380,stageHeight-200,"objects/trashcan/Trashcan_",6,frameCount);
    frameCount++;

    // Crates
    spriteAnimation(stageWidth/2+150,stageHeight/2+200,"objects/Crate",5,frameCount);
    frameCount++;

     // Capguy
     capguyAnimation(200,stageHeight-200,"capguy_",8);

     //Man Hole
     manHole(stageWidth/2+400,stageHeight-70,"objects/manhole/Manhole_",8);
     

}

function spriteAnimation(x,y,texturePath,totalAnimation,frameNo){
    frame="fr"+frameNo;
    var frame=[];
    for (var i = 1; i <=totalAnimation; i++) {

        frame.push(PIXI.Texture.from(texturePath+ i + ".png"));
    }

    textureId = new PIXI.extras.AnimatedSprite(frame);
    textureId.x =x;
    textureId.y =y;
    textureId.anchor.set(0.5);
    textureId.animationSpeed = 0.05;
    textureId.interactive=true;
    textureId.on("pointerdown",onClick);
    app.stage.addChild(textureId);
    //textureID.play();
}
function manHole(x,y,texturePath,totalAnimation){
    var frames1=[];
    for (var i = 1; i <=totalAnimation; i++) {

        frames1.push(PIXI.Texture.from(texturePath+ i + ".png"));
    }

    manholeAnim = new PIXI.extras.AnimatedSprite(frames1);
    manholeAnim.x =x;
    manholeAnim.y =y;
    manholeAnim.anchor.set(0.5);
    manholeAnim.animationSpeed = 0.2;
    app.stage.addChild(manholeAnim);
    
    // manholeAnim.gotoAndStop(2);
}
function capguyAnimation(x,y,texturePath,totalAnimation)
{
    var frames=[];
    for (var i = 1; i <=totalAnimation; i++) {

        frames.push(PIXI.Texture.from(texturePath+ i + ".png"));
    }

    capguyAnim = new PIXI.extras.AnimatedSprite(frames);
    capguyAnim.x =x;
    capguyAnim.y =y;
    capguyAnim.anchor.set(0.5);
    capguyAnim.animationSpeed = 0.2;
    app.stage.addChild(capguyAnim);

}
function staticSprite(x,y,texturePath){
    let textureID,spriteID;
    textureID = PIXI.Texture.from(texturePath);
    spriteID=new PIXI.Sprite(textureID);
    spriteID.x=x;
    spriteID.y=y;
    app.stage.addChild(spriteID); 
}
function gameLoop(delta)
{
    onClick;
    onkeydown;
    onkeyup;
    if(capguyAnim.x==manholeAnim.x-140){
        capguyAnim.gotoAndStop(6);
        app.stage.removeChild(capguyAnim);
        manholeAnim.play();
        manholeAnim.loop=false;
        //manholeAnim.gotoAndStop(8);
    }
    
}
function onkeydown(key){
    if(key.keyCode==39){
       app.ticker.add(delta => gameLoop(delta));
        capguyAnim.play();
        capguyAnim.x+=10;
    }
}
function onkeyup(key){
    if(key.keyCode==39){
        app.ticker.add(delta => gameLoop(delta));
        capguyAnim.gotoAndStop(6);
    }
}
function onClick(e){
    app.ticker.add(delta => gameLoop(delta));
    e.currentTarget.play();
    //e.currentTarget.loop=false;
}
