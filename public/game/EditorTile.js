import { screen, camera_x, camera_y } from "../EditorLogic.js"

export default class EditorTile extends Sprite {

    constructor(x, y, tile_sprite, sprite_id, id) {
        super(tile_sprite, x, y, 20, 20);
        this.raw_x = x;
        this.raw_y = y;
        this.sprite_id = sprite_id;
    }

    update_position() {
        this.x = (this.raw_x-camera_x)-this.width/2;
        this.y = (-this.raw_y-camera_y)-this.height/2;
    }

    remove() {
        screen.remove(this);
    }

}