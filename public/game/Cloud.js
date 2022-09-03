import { screen, camera_x, camera_y, cloud_0_img } from "../GameLogic.js"

export default class Cloud extends Sprite {

    constructor() {

        super(cloud_0_img ,Math.floor(Math.random() * -(camera_x-500) - camera_x-20), Math.floor(Math.random() * 50 + 10), 50, 35)
        this.speed = Math.random() * 0.1 + 0.1;
        this.raw_x = this.x;
        this.raw_y = this.y;
    }

    update_movement() {

        this.raw_x += this.speed;
        this.x = this.raw_x - camera_x;
        this.y = this.raw_y;

        if (this.x > camera_x + 500) {
            this.speed = Math.random() * 0.1 + 0.1;
            this.raw_x = camera_x - 100;
            this.raw_y = Math.floor(Math.random() * 50 + 10);
        }
    }

}