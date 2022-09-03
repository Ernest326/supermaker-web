import { camera_x, camera_y, tiles } from '../GameLogic.js'

let player_sprite = new Image();
player_sprite.src = "sprites/player.gif";

export default class Player extends Sprite {

    constructor(x, y, jump_force, speed, max_health) {
        super(player_sprite, x, y, 32, 32);
        this.health = max_health;
        this.jump_force = jump_force;
        this.speed = speed;
        this.checkpoint_x = x;
        this.checkpoint_y = y;
        this.raw_x = x;
        this.raw_y = y;
        this.y_acceleration = 0;
        this.y_velocity = 0;
        this.gravity = -0.01;
    }

    damage(x) {
        this.health -= x;
        if (this.health <= 0) {
            this.respawn;
        }
    }

    respawn() {
        this.x = this.checkpoint_x;
        this.y = this.checkpoint_y;
    }

    update_movement() {
        this.update_position();
        this.update_physics();
    }

    update_position() {
        this.x = (this.raw_x-camera_x)-this.width/2;
        this.y = (-this.raw_y-camera_y)-this.height/2;
    }

    update_physics() {

        tiles.forEach(x => {
            if(this.raw_y-this.height/2<x.raw_y+x.height/2) {
                this.raw_y=x.raw_y+x.height/2+this.height/2;
                this.y_acceleration=0;
                this.y_velocity=0;
            } else {
                this.raw_y += this.y_velocity;
                this.y_velocity += this.y_acceleration + this.gravity;
            }
        });

    }

}