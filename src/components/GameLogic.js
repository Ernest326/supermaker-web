let screen = new Registry();
let test = new TextItem(75, 100, "Hello World", 30);

screen.register(test);

let gameLoop = () => {
    screen.updateFrame();
    requestAnimationFrame(gameLoop);
}

gameLoop();