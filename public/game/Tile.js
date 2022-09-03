import { screen, camera_x, camera_y } from "../GameLogic.js"

export default class Tile extends Sprite {

    constructor(x, y, tile_sprite) {
        super(tile_sprite, x, y, 20, 20);
        this.raw_x = x;
        this.raw_y = y;
    }

    update_position() {
        this.x = (this.raw_x-camera_x)-this.width/2;
        this.y = (-this.raw_y-camera_y)-this.height/2;
    }

    remove() {
        screen.remove(this);
    }

}