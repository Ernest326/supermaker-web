let screen = new Registry();

function init() {
    const canvas = document.getElementById("myCanvas");
    canvas.getContext("2d").imageSmoothingEnabled = false;
}



let gameLoop = () => {
    screen.updateFrame();
    requestAnimationFrame(gameLoop);
};

init();
gameLoop();