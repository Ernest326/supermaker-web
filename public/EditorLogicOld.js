let screen = new Registry();

const blockSize = 32;

function init() {
    const canvas = document.getElementById("myCanvas");
    canvas.getContext("2d").imageSmoothingEnabled = false;
}

function addGrid() {
    let posX = blockSize;
    let posY = blockSize;
    for (let i = 0; i < Canvas.getWidth() / blockSize; i++) {
        screen.register(new Line(posX + 0.5, 0, posX + 0.5, Canvas.getHeight()))
        posX += blockSize;
    }

    for (let j = 0; j < Canvas.getHeight() / blockSize; j++) {
        screen.register(new Line(0, posY + 0.5, Canvas.getWidth(), posY + 0.5));
        posY += blockSize;
    }
}

let gameLoop = () => {
    screen.updateFrame();
    requestAnimationFrame(gameLoop);
};

init();
addGrid();
gameLoop();