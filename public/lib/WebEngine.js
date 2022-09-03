/*
    @TODO
    Gradient constructor
    Error checking - types
*/
/*
/* some basic canvas functions that are used throughout the library */
const Canvas = {
    getCanvas : function() {
        const canvas = document.getElementById("myCanvas");
        return canvas;
    },

    getCtx : function() {
        let c = this.getCanvas();
        const ctx = c.getContext("2d");
        return ctx;
    },

    getWidth : function() {
        let c = this.getCanvas();
        return c.width;
    },

    getHeight : function() {
        let c = this.getCanvas();
        return c.height;
    },

    clear : function() {
        let ctx = this.getCtx();
        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    },

    get width() {
        return this.getWidth();
    },

    get height() {
        return this.getHeight();
    }
}

let mouseX = 0;
let mouseY = 0;
let mouseDown = [];

const Mouse = {
    init : function() {
        window.addEventListener("mousemove", this.track, false);
        window.addEventListener("mousedown", this.add, false);
        window.addEventListener("mouseup", this.remove, false);
    },

    add : function(e) {
        mouseDown.push(e.button);
    },

    remove : function(e) {
        for (let i = 0; i < mouseDown.length; i++) {
            if (e.button === mouseDown[i]) {
                delete mouseDown[i];
            }
        }
    },

    isButtonDown : function(button) {
        if (typeof button !== typeof 0) {
            throw "function isButtonDown(button) requires a valid Mouse Button";
        } else {
            if (mouseDown.includes(button, 0)) {
                return true;
            }
            return false;
        }
    },

    track : function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    },
    
    getX : function() {
        return mouseX;
    },

    getY : function() {
        return mouseY;
    },

    get x() {
        return this.getX();
    },

    get y() {
        return this.getY();
    }
}

const MouseButton = {
    left : 0,
    wheel : 1,
    right : 2,
}

let keysDown = [];

const Keyboard = {
    init : function() {
        window.addEventListener("keydown", this.addKey, false);
        window.addEventListener("keyup", this.removeKey, false);
    },

    addKey : function(key) {
        keysDown.push(key.keyCode);
    },

    removeKey : function(key) {
        for (let i = 0; i < keysDown.length; i++) {
            if (key.keyCode === keysDown[i]) {
                delete keysDown[i];
            }
        } 
    },

    isKeydown : function(key) {
        if (typeof key !== typeof 10) {
            throw "function isKeydown(key) requires a valid Key";
        } else {
            if (keysDown.includes(key , 0)) {
                return true;
            }
            return false;
        }
    }
}

const Key = {
    backspace : 8,
    tab : 9,
    enter : 13,
    shift : 16,
    ctrl : 17,
    alt : 18,
    pauseBreak : 19,
    capsLock : 20,
    escape : 27,
    space : 32,
    pageUp : 33,
    pageDown : 34,
    end : 35,
    home : 36,
    leftArrow : 37,
    upArrow : 38,
    rightArrow : 39,
    downArrow : 40,
    insert : 45,
    delete : 46,
    zero : 48,
    one : 49,
    two : 50,
    three : 51,
    four : 52,
    five : 53,
    six : 54,
    seven : 55,
    eight : 56,
    nine : 57,
    a : 65,
    b : 66,
    c : 67,
    d : 68,
    e : 69,
    f : 70,
    g : 71,
    h : 72,
    i : 73,
    j : 74,
    k : 75,
    l : 76,
    m : 77,
    n : 78,
    o : 79,
    p : 80,
    q : 81,
    r : 82,
    s : 83,
    t : 84,
    u : 85,
    v : 86,
    w : 87,
    x : 88,
    y : 89,
    z : 90,
    leftWindows : 91,
    rightWindows : 92,
    select : 93,
    numpad0 : 96,
    numpad1 : 97,
    numpad2 : 98,
    numpad3 : 99,
    numpad4 : 100,
    numpad5 : 101,
    numpad6 : 102,
    numpad7 : 103,
    numpad8 : 104,
    numpad9 : 105,
    multiply : 106,
    add : 107,
    subtract : 109,
    decimal : 110,
    divide : 111,
    f1 : 112,
    f2 : 113,
    f3 : 114,
    f4 : 115,
    f5 : 116,
    f6 : 117,
    f7 : 118,
    f8 : 119,
    f9 : 120,
    f10 : 121,
    f11 : 122,
    f12 : 123,
    numLock : 144,
    scrollLock : 145,
    semiColon : 186,
    equals : 187,
    comma : 188,
    dash : 189,
    period : 190,
    forwardSlash : 191,
    graveAccent : 192,
    openBracket : 219,
    backSlash : 220,
    closeBracket : 221,
    singleQuote : 222,
}

const Colours = {
    red : "#FF0000",
    blue : "#0000FF",
    green : "#00FF00",
    white : "#FFFFFF",
    black : "#000000",
    yellow : "#FFFF00",
}

class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.target = null;
    }

    update() {
        if (this.target != null) {
            this.x = this.target.x - Canvas.width / 2;
            this.y = this.target.y - Canvas.height / 2;
        }
    }

    get instance() {
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get target() {
        return this._target;
    }

    set target(value) {
        this._target = value;
    }
}

class Registry {
    constructor() {
        this.registry = [];
    }

    register(item) {
        this.registry.push(item.instance);
    }

    updateFrame() {
        Canvas.clear();
        for(let i = 0; i < this.registry.length; i++) {
            this.registry[i].update();
        }
    }
    
    /* checks if two items in this registry are touching */
    isCollide(item1, item2) {
        if (item1.x < item2.x + item2.width 
            && item1.x + item1.width > item2.x
            && item1.y < item2.y + item2.height 
            && item1.height + item1.y > item2.y) 
        {
            return true;
        } else {
            return false;
        }
    }
}

class Context {
    constructor() {
        this.ctx = Canvas.getCtx();
    }

    get instance() {
        return this;
    }
}

/* all new items need x, y, width and height */
class Item extends Context {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update() {
        this.draw();
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        this._x = value; 
    }

    set y(value) {
        this._y = value; 
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }
}

class Background extends Item {
    constructor() {
        super(0, 0, Canvas.width, Canvas.height);
    }

    update() {}

    draw() {}
}

class BackgroundImage extends Background {
    constructor(image) {
        super();
        this.image = image;
        this.camera = null;
        this.rotation = 0;
    }

    update() {
        this.draw();
    }

    draw() {
        if (this.camera === null) {
            this.ctx.beginPath();
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.ctx.closePath();
        } else {
            this.ctx.save();
            this.ctx.translate(this.x - this.camera.x, this.y - this.camera.y);
            this.ctx.rotate(this.rotation);
            this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
            this.ctx.restore();
        }
    }

    get camera() {
        return this._camera;
    }

    set camera(value) {
        this._camera = value;
    }
}

class BackgroundFill extends Background {
    constructor(colour) {
        super();
        this.colour = colour;
    }

    update() {
        this.draw();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }
}

class SpriteItem extends Item {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.speed = null;
    }

    moveLeft(speed) {
        if (speed != null) {
            if (typeof speed != typeof 10) {
                throw "the optional field speed must be a number";
            } else {
                this.x -= speed;
            }
        } else {
            this.x -= this.speed;
        }
    }

    moveRight(speed) {
        if (speed != null) {
            if (typeof speed != typeof 10) {
                throw "the optional field speed must be a number";
            } else {
                this.x += speed;
            }
        } else {
            this.x += this.speed;
        }
    }

    moveUp(speed) {
        if (speed != null) {
            if (typeof speed != typeof 10) {
                throw "the optional field speed must be a number";
            } else {
                this.y -= speed;
            }
        } else {
            this.y -= this.speed;
        }
    }

    moveDown(speed) {
        if (speed != null) {
            if (typeof speed != typeof 10) {
                throw "the optional field speed must be a number";
            } else {
                this.y += speed;
            }
        } else {
            this.y += this.speed;
        }
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
}

class Circle extends SpriteItem {
    constructor(x, y, radius) {
        super(x, y, radius * 2, radius * 2);
        this.radius = radius;
        this.fill = false;
        this.colour = null;
    }

    draw() {
        this.ctx.beginPath();

        if (this.fill) {
            for (let i = 0; i < this.radius; i++) {
                this.ctx.arc(this.x, this.y, i, 0, 2 * Math.PI); 
            }
        } else {
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); 
            this.ctx.fillStyle = Colours.green;
            this.ctx.fill();
            this.ctx.lineWidth = 0;
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    get fill() {
        return this._fill;
    }

    set fill(value) {
        this._fill = value;
    }

    get colour() {
        return this._colour;
    }

    set colour(value) {
        this._colour = value;
    }
}

class Rectangle extends SpriteItem {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.fill = false;
        this.colour = null;
    }

    draw() {
        this.ctx.beginPath();

        if (this.colour === null) {
            this.ctx.fillStyle = Colours.black;
        } else {
            this.ctx.fillStyle = this.colour;
        }

        if (this.fill) {
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }

        this.ctx.closePath();
    }

    get fill() {
        return this._fill;
    }

    set fill(value) {
        this._fill = value;
    }

    get colour() {
        return this._colour;
    }

    set colour(value) {
        this._colour = value;
    }
}

class Square extends SpriteItem {
    constructor(x, y, size) {
        super(x, y, size, size);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        this.ctx.closePath();
    }
}

class Sprite extends SpriteItem {
    constructor(image, x, y, width, height) {
        super(x, y, width, height);
        this.image = image;
        this.camera = null;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }

    get camera() {
        return this._camera;
    }

    set camera(value) {
        this._camera = value;
    }
}

class Line extends Item {
    constructor(x1, y1 ,x2, y2) {
        super();
        this.x = x1;
        this.y = x2;
        this.width = x1 - x2;
        this.height = y1 - y2;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1, this.y1);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.strokeStyle = "#d3d3d3";
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

class TextItem extends Item {
    constructor(x, y, string, size) {
        super();
        this.x = x;
        this.y = y;
        this.string = string;
        this.size = size;
        this.fill = true;
        this.font = null;
        this.colour = null;
    }

    draw() {
        if (this.fill) {
            this.ctx.font = this.font === null ? this.size + "px " + "Arial" : this.size + "px " + this.font;
            this.ctx.fillStyle = this.colour === null ? Colours.black : this.colour;
            this.ctx.fillText(this.string, this.x, this.y);
        } else {
            this.ctx.font = this.font === null ? this.size + "px " + "Arial" : this.size + "px " + this.font;
            this.ctx.strokeStyle = this.colour === null ? Colours.black : this.colour;
            this.ctx.strokeText(this.string, this.x, this.y);
        }
    }

    get fill() {
        return this._fill;
    }

    set fill(value) {
        this._fill = value;
    }

    get font() {
        return this._font;
    }

    set font(value) {
        this._font = value;
    }

    get colour() {
        return this._colour;
    }

    set colour(value) {
        this._colour = value;
    }
}

class Timer extends Context {
    constructor(time) {
        super();
        this.time = time * 60;
        this.timer = time * 60;
        this.active = false
    }

    start() {
        this.active = true;
        this.timer = 0;
    }

    stop() {
        this.active = false;
    }

    reset() {
        this.timer = 0;
    }

    isOver() {
        if (this.timer >= this.time) {
            return true;
        }
        return false;
    }

    update() {
        if (this.active) {
            this.timer++;
        }
    }

    get time() {
        return this._time;
    }

    get timer() {
        return this._timer;
    }

    set time(value) {
        this._time = value;
    }

    set timer(value) {
        this._timer = value;
    }
}

class Colour {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    hex() {
        let hr = Math.max(0, Math.min(255, Math.round(this.red))).toString(16);
        let hg = Math.max(0, Math.min(255, Math.round(this.green))).toString(16);
        let hb = Math.max(0, Math.min(255, Math.round(this.blue))).toString(16);
        let hexCode = "#" + (hr.length < 2 ? "0" : "") + hr + (hg.length < 2 ? "0" : "") + hg + (hb.length < 2 ? "0" : "") + hb;
        return hexCode;
    }
}