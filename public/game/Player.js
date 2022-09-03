import {Lerp, camera_x, camera_y, tiles } from '../GameLogic.js'

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
        this.x_acceleration = 0;
        this.x_velocity = 0;
        this.x_movement = 0;
        this.x_current_movement = 0;
        this.gravity = -0.006;
        this.floored = false;
        this.jumping = false;
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

        if (Keyboard.isKeydown(Key.space) && this.floored) {
            this.y_velocity=this.jump_force;
            this.jumping = true;
        }

        if ((Keyboard.isKeydown(Key.a) || Keyboard.isKeydown(Key.leftArrow))) {
            this.x_movement = -1;
        } else if ((Keyboard.isKeydown(Key.d) || Keyboard.isKeydown(Key.rightArrow))) {
            this.x_movement = 1;
        } else {
            this.x_movement = 0;
        }
    }

    update_position() {
        this.x = (this.raw_x-camera_x)-this.width/2;
        this.y = (-this.raw_y-camera_y)-this.height/2;
    }

    update_physics() {

        tiles.forEach(x => {

            if(this.raw_y-this.height/2-0.1<x.raw_y+x.height/2) {
                this.floored=true;
                if(this.jumping) {
                    this.jumping = false;
                }
            } else {
                this.floored=false;
            }

            if(this.raw_y-this.height/2<x.raw_y+x.height/2) {

                this.raw_y=x.raw_y+x.height/2+this.height/2;

                if(!this.jumping) {
                    this.y_velocity=0;
                }
                
            }
        });

        if(!this.floored) {
            this.y_velocity += this.y_acceleration + this.gravity;
        }
        this.x_velocity += this.x_acceleration;

        this.x_current_movement = Lerp(this.x_current_movement*this.speed, this.x_movement*this.speed, 0.1);

        this.raw_y += this.y_velocity;
        this.raw_x += this.x_velocity + this.x_current_movement;

    }

}