export const screen = new Registry();

export let camera_raw_x = 0;
export let camera_raw_y = 0;
export let camera_x = 0;
export let camera_y = 0;

export let real_mouse_x = 0;
export let real_mouse_y = 0;

export let grid_x = 0;
export let grid_y = 0;

export let cloud_0_img = new Image();
cloud_0_img.src = "sprites/cloud_0.png";

export let delta_time = 0;
export let timer_start = Date.now();
export let timer = 0;

export let last_timer = 0;
export let current_timer = 0;

export let tiles = [];

export function Lerp(start, end, t) {
    return start + (end-start) * t;
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

import EditorCloud from "./game/EditorCloud.js"
import EditorTile from "./game/EditorTile.js"

let tileset = {
    0: sprite_0_img,
    1: sprite_1_img,
    2: sprite_2_img,
    3: sprite_3_img,
    4: sprite_4_img,
    5: sprite_5_img
}

let clouds = [];

let pos_text = new TextItem(5, 10, "X:0, Y:0", 8);

const level_loader = document.getElementById('file');
level_loader.addEventListener('change', (event) => {
    
    const files = event.target.files;

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        let data = JSON.parse(event.target.result);
        load_map(data);
        loadEditorVars(data);
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
            let cloud = new EditorCloud();
            clouds.push(cloud);
            screen.register(cloud);
        }
    }

    file_data.tiles.forEach(x => {
        let tile = new EditorTile(x['x']*20, x['y']*20, tileset[x['id']], x['id']);
        tiles.push(tile);
        screen.register(tile);
    });


    addGrid();

    screen.register(pos_text);

}

function loadEditorVars(file_data) {
    document.getElementById("Setting0").value = file_data.settings['spawn_x'];
    document.getElementById("Setting1").value = file_data.settings['spawn_y'];
    document.getElementById("Setting2").value = file_data.settings['background_color'];
    document.getElementById("Setting3").value = file_data.settings['clouds_enabled'];
    document.getElementById("Setting4").value = file_data.settings['gravity'];
    document.getElementById("Setting5").value = file_data.settings['jump_force'];
    document.getElementById("Setting6").value = file_data.settings['speed'];

}

function sprites_loaded() {

    Mouse.init();
    Keyboard.init();

    fetch('levels/footage_level.level')
    .then(response => response.json())
    .then(jsonResponse => load_map(jsonResponse));

    gameLoop();
}

const blockSize = 20;

let grid_h = [];
let grid_v = [];

function addGrid() {
    let posX = blockSize;
    let posY = blockSize;
    for (let i = 0; i < Canvas.getWidth()*2 / blockSize; i++) {
        let x = new Line(posX+0.5, 0, posX + 0.5, Canvas.getHeight());
        grid_v.push(x);
        screen.register(x)
        posX += blockSize;
    }

    for (let j = 0; j < Canvas.getHeight()*2 / blockSize; j++) {
        let x = new Line(0, posY + 0.5, Canvas.getWidth(), posY + 0.5);
        grid_h.push(x);
        screen.register(x);
        posY += blockSize;
    }
}

let mouse_held = false;

let gameLoop = () => {
    
    timer = Date.now() - timer_start;
    current_timer = Date.now();

    delta_time = current_timer - last_timer;

    camera_x = camera_raw_x - 145;
    camera_y = -camera_raw_y - 70;

    //Get mouse position
    let canvas_bounds = document.getElementById('myCanvas').getBoundingClientRect();

    real_mouse_x = Math.floor(((mouseX - canvas_bounds.x)/(canvas_bounds.right-canvas_bounds.left))*300 + camera_x + 10);
    real_mouse_y = Math.floor(((canvas_bounds.bottom - mouseY)/(canvas_bounds.bottom-canvas_bounds.top))*150 - camera_y - 140);

    let grid_x = Math.floor(real_mouse_x/20);
    let grid_y = Math.floor(real_mouse_y / 20);

    pos_text.string = "X:" + grid_x + ", Y:" + grid_y;

    //Camera movement
    if(Keyboard.isKeydown(Key.a)) {
        camera_raw_x -= 40*delta_time/1000;
    }
    if(Keyboard.isKeydown(Key.d)) {
        camera_raw_x += 40*delta_time/1000;
    }
    if(Keyboard.isKeydown(Key.s)) {
        camera_raw_y -= 40*delta_time/1000;
    }
    if(Keyboard.isKeydown(Key.w)) {
        camera_raw_y += 40*delta_time/1000;
    }

    //Update grid movement
    grid_v.forEach(element => {
        element.x1 = element.x_raw_1 - camera_raw_x - 5;
        element.x2 = element.x_raw_2 - camera_raw_x- 5;
    });

    grid_h.forEach(element => {
        element.y1 = element.y_raw_1 + camera_raw_y;
        element.y2 = element.y_raw_2 + camera_raw_y;
    });

    //Placing blocks
    if(Mouse.isButtonDown(MouseButton.left) && real_mouse_x <= 300 && real_mouse_x >= 0 && real_mouse_y <= 150 && real_mouse_y >= 0) {
        if (!mouse_held) {
            mouse_held = true;

            let tile;

            tiles.forEach(e => {
                if(Math.floor(e.raw_x/20) == grid_x && Math.floor(e.raw_y/20) == grid_y) {
                    tile = e;
                }
            });

            if (tile != null) {
                tiles.splice(tiles.indexOf(tile), 1);
                screen.registry.splice(screen.registry.indexOf(tile), 1);
            } else {
                let new_tile = new EditorTile(grid_x*20, grid_y*20, sprite_0_img, 0);
                tiles.push(new_tile);
                screen.register(new_tile);
            }

        }
    } else {
        mouse_held = false;
    }

    clouds.forEach(x => {
        x.update_movement();
    });

    tiles.forEach(x => {
        x.update_position();
    });

    last_timer = current_timer;

    screen.updateFrame();
    requestAnimationFrame(gameLoop);
}

init();