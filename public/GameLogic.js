import context from "react-bootstrap/esm/AccordionContext";

let screen = new Registry();

let camera_x = 0;
let camera_y = 0;

let x = 0;

let sprite_0_img = new Image();
sprite_0_img.src = "sprites/0.png";
let sprite_1_img = new Image().src = "sprites/1.png";
sprite_1_imgsrc = "sprites/1.png";
let sprite_2_img = new Image().src = "sprites/2.png";
sprite_2_img.src = "sprites/2.png";
let sprite_3_img = new Image().src = "sprites/3.png";
sprite_3_img.src = "sprites/3.png";
let sprite_4_img = new Image().src = "sprites/4.png"
sprite_4_img.src = "sprites/4.png"
let sprite_5_img = new Image().src = "sprites/5.png"
sprite_5_img.src = "sprites/5.png"

let bg = new BackgroundFill("#000000");

screen.register(bg);

sprite_0_img.loaded = new function() {
    let sprite = new Sprite(sprite_0_img, 0, 0, 10, 10);
    screen.register(sprite)
}

function init() {


   // Context.instance.imageSmoothingEnabled = false;
    //canvas = document.getElementById("myCanvas");
    //canvas.width = document.body.clientWidth;
    //canvas.height = document.body.clientHeight;

    gameLoop();
}

function sprites_loaded() {

    return sprite_0_img.completed && sprite_1_img.completed && sprite_2_img.completed && sprite_3_img.completed && sprite_4_img.completed && sprite_5_img.completed;

}

function wait_for_sprites() {
    console.log("Test")
    if (sprites_loaded()) {
        add_registers()
    } else {
        setTimeout(wait_for_sprites, 100);
    }
}


function add_registers() {
    screen.register(sprite);
    gameLoop();
}

let gameLoop = () => {
    
    //if (sprite.complete) {
    //    test_sprite.x = x
    //}

    //x+=0.1

    screen.updateFrame();
    requestAnimationFrame(gameLoop);
}

//wait_for_sprites();
init();