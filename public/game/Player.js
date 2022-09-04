import {Lerp, camera_x, camera_y, tiles, delta_time, timer } from '../GameLogic.js'

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
        this.x_velocity_raw = 0;
        this.x_movement = 0;
        this.x_current_movement = 0;
        this.gravity = -0.006;
        this.floored = false;
        this.jumping = false;
        this.last_position = [0,0];
    }

    damage(x) {
        this.health -= x;
        if (this.health <= 0) {
            this.respawn;
        }
    }

    respawn() {
        this.y_velocity = 0;
        this.x_velocity = 0;
        this.raw_x = this.checkpoint_x;
        this.raw_y = this.checkpoint_y;
    }

    update_movement() {

        this.update_physics();
        this.update_position();
        console.log(this.get_velocity());
    }

    update_position() {

        this.x = (this.raw_x-camera_x)-this.width/2;
        this.y = (-this.raw_y-camera_y)-this.height/2;

        //Velocity
        this.x_velocity_raw += this.x_acceleration;

        this.x_current_movement = Lerp(this.x_current_movement, this.x_movement, 0.1);

        this.x_velocity = this.x_velocity_raw + this.x_current_movement * this.speed;

        this.raw_y += this.y_velocity * delta_time/1000;
        this.raw_x += this.x_velocity * delta_time/1000;

        //Key movements
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

        //Jumping
        if(!this.floored) {
            this.y_velocity += this.y_acceleration + this.gravity;
        } else {
            this.y_velocity = 0;

            if(this.jumping) {
                this.jumping = false;
            }
        }

        //Check if fell off map
        if (this.raw_y <= -500) {
            this.respawn();
        }

        this.update_velocity();
    }

    update_velocity() {
        this.last_position = [this.raw_x, this.raw_y];
    }

    get_velocity() {
        return [this.raw_x - this.last_position[0], this.raw_y - this.last_position[1]]
    }

    is_aabb_collision(x, y, w, h) {

        return  this.raw_x < x + w/2 &&
                this.raw_x + this.width/2 > x &&
                this.raw_y - this.height/2 < y + h/2 &&
                this.raw_y + this.height/2 > y;

    }

    calculate_aabb_distance(x, y, w, h) {

        let dx = 0
        let dy = 0

        if (this.raw_x < x) {
            dx = x - (this.raw_x+this.width/2)
        }
        else if (this.raw_x > x)
        {
            dx = this.raw_x - (x+w/2)
        }

        if (this.raw_y < y)
        {
            dy = y - (this.raw_y+this.height/2)
        }
        else if (this.raw_y > y)
        {
            dy = this.raw_y - (y+h/2)
        }
        
        return [dx, dy]
    }

    update_physics() {

        this.floored = false;

        tiles.forEach(x => {
            
            if(this.is_aabb_collision(x.raw_x, x.raw_y, x.width, x.height)) {

                //this.y_velocity = 0;
                //this.floored = true;

                let dist = this.calculate_aabb_distance(x.raw_x, x.raw_y, x.width, x.height)
                let xtime = this.x_velocity != 0 ? Math.abs(dist[0] / this.x_velocity) : 0;
                let ytime = this.y_velocity != 0 ? Math.abs(dist[1] / this.y_velocity) : 0;

                let shortest_time = 0;

                if(this.x_velocity == 0 && this.y_velocity != 0) {
                    shortest_time = ytime;
                    this.raw_y += shortest_time * this.y_velocity * delta_time/1000;
                }
                else if (this.x_velocity != 0 && this.y_velocity == 0) {
                    shortest_time = xtime;
                    this.raw_x += shortest_time * this.x_velocity * delta_time/1000
                } else {
                    shortest_time = Math.min(Math.abs(xtime), Math.abs(ytime))
                    //this.raw_x += shortest_time * this.x_velocity * delta_time/1000
                    this.raw_y += shortest_time * this.y_velocity * delta_time/1000
                }

                if(dist[1] > 0 && this.raw_y > x.raw_y) {
                    this.floored = true;
                }

            }

        });

        /*tiles.forEach(x => {

            if(this.raw_y-this.height/2-0.1<x.raw_y+x.height/2) {
                this.floored=true;
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
        */

    }

}