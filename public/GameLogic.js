export const screen = new Registry();

export let camera_x_raw = 0;
export let camera_y_raw = 0;

export let camera_x = 0;
export let camera_y = 0;

export let cloud_0_img = new Image();
cloud_0_img.src = "sprites/cloud_0.png";

export let delta_time = 0;
export let timer_start = Date.now();
export let timer = 0;

export let last_timer = 0;
export let current_timer = 0;

export let tiles = [];

export function Lerp(start, end, time) {
    return (end-start)*time + start;
}

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

import Cloud from "./game/Cloud.js"
import Player from "./game/Player.js"
import Tile from "./game/Tile.js"

let player = new Player(0, 0, 0.8, 5, 100);

let tileset = {
    0: sprite_0_img,
    1: sprite_1_img,
    2: sprite_2_img,
    3: sprite_3_img,
    4: sprite_4_img,
    5: sprite_5_img
}

let clouds = [];

const level_loader = document.getElementById('file');
level_loader.addEventListener('change', (event) => {
    
    const files = event.target.files;

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        load_map(JSON.parse(event.target.result));
    });

    for (const file of files) {
        reader.readAsText(file);
    }

})

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

function load_map(file_data) {

    screen.registry = [];

    let bg = new BackgroundFill(file_data.settings['background_color']);
    screen.register(bg);

    if (file_data.settings['clouds_enabled']) {
        for (var i = 0; i < 5; i++) {
            let cloud = new Cloud();
            clouds.push(cloud);
            screen.register(cloud);
        }
    }

    file_data.tiles.forEach(x => {
        let tile = new Tile(x['x']*20, x['y']*20, tileset[x['id']]);
        tiles.push(tile);
        screen.register(tile);
    });

    player.raw_x = file_data.settings['spawn_x']*32;
    player.raw_y = file_data.settings['spawn_y']*32;
    player.gravity = file_data.settings['gravity'];
    player.jump_force = file_data.settings['jump_force'];
    player.speed = file_data.settings['jump_force'];

    camera_x_raw = file_data.settings['spawn_x']*32;
    camera_y_raw = file_data.settings['spawn_y']*32;

    screen.register(player);

}

function sprites_loaded() {

    Mouse.init();
    Keyboard.init();

    fetch('levels/default.level')
    .then(response => response.json())
    .then(jsonResponse => load_map(jsonResponse));

    gameLoop();
}

let gameLoop = () => {
    
    timer = Date.now() - timer_start;
    current_timer = Date.now();

    delta_time = current_timer - last_timer;

    //if (sprite.complete) {
    //    test_sprite.x = x
    //}

    //x+=0.1

    camera_x_raw = Lerp(camera_x_raw, player.raw_x, 0.1);
    camera_y_raw = Lerp(camera_y_raw, player.raw_y, 0.1);
    camera_x = camera_x_raw - 145;
    camera_y = -camera_y_raw - 70;

    clouds.forEach(x => {
        x.update_movement();
        //console.log(x.x);
    });

    tiles.forEach(x => {
        x.update_position();
    });

    player.update_movement();

    last_timer = current_timer;

    screen.updateFrame();
    requestAnimationFrame(gameLoop);
}

//wait_for_sprites();
init();