//import context from "react-bootstrap/esm/AccordionContext";

let screen = new Registry();

let camera_x = 0;
let camera_y = 0;

let x = 0;

let sprite_0_img = new Image();
sprite_0_img.src = "sprites/0.png";
let sprite_1_img = new Image();
sprite_1_img.src = "sprites/1.png";
let sprite_2_img = new Image();
sprite_2_img.src = "sprites/2.png";
let sprite_3_img = new Image();
sprite_3_img.src = "sprites/3.png";
let sprite_4_img = new Image();
sprite_4_img.src = "sprites/4.png";
let sprite_5_img = new Image();
sprite_5_img.src = "sprites/5.png";
let cloud_0_img = new Image();
cloud_0_img.src = "sprites/cloud_0.png";

let bg = new BackgroundFill("#00CCFF");

screen.register(bg);

var clouds = [];

class Cloud extends Sprite {

    constructor() {
        //this.speed = Math.random() * 0.1 + 0.1;
        super(0, 0, 45, 25);
        super.speed = Math.random() * 0.1 + 0.1;
        this.pos_x = Math.floor(Math.random() * -500 - 20);
        this.pos_y = Math.floor(Math.random() * 50 + 10);

        //this.sprite = new Sprite(cloud_0_img, this.pos_x, this.pos_y, 45, 25);
        //screen.register(this.sprite);
    }

    /*
    move() {

        this.pos_x += this.speed;
        this.sprite.x = this.pos_x;
        this.sprite.y = this.pos_y;

        if (this.pos_x > 350) {
            this.speed = Math.random() * 0.1 + 0.1;
            this.pos_x = -100
            this.pos_y = Math.floor(Math.random() * 50 + 10);
        }
    }
    */

}

function init() {

    const canvas = document.getElementById("myCanvas");
    canvas.getContext("2d").imageSmoothingEnabled = false;

    wait_for_sprites();
}

function wait_for_sprites() {
    if (sprites_loaded_check()) {
        sprites_loaded()
    } else {
        setTimeout(wait_for_sprites, 100);
    }
}

function sprites_loaded_check() {

    return sprite_0_img.complete && sprite_1_img.complete && sprite_2_img.complete && sprite_3_img.complete && sprite_4_img.complete && sprite_5_img.complete;

}

function sprites_loaded() {
    //screen.register(sprite);
    for (var i = 0; i < 5; i++) {
        //clouds.push(new Cloud());
        screen.register(new Cloud())
    }

    gameLoop();
}

let gameLoop = () => {
    
    //if (sprite.complete) {
    //    test_sprite.x = x
    //}

    //x+=0.1

    /*
    clouds.forEach(x => {
        x.draw();
        //console.log(x.pos_x)
    });
    */

    screen.forEach(element => {
        if (typeof element === Cloud) {
            element.moveLeft(5)
        }
    });

    screen.updateFrame();
    requestAnimationFrame(gameLoop);
}

//wait_for_sprites();
init();