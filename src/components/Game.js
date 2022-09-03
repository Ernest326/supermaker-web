import React from 'react'
import { useEffect, useRef } from 'react'

const rawHTML = `
  <div class="Game">
    <canvas id="myCanvas"
            class="canvas-center"        
            style="border: 1px solid #d3d3d3; width: 900px; height: 500px;"
    >
        Your browser does not support the HTML canvas tag.
    </canvas>
    <script>
      let screen = new Registry();
      let test = new TextItem(75, 100, "Hello World", 30);

      screen.register(test);

      let gameLoop = () => {
        screen.updateFrame();
        requestAnimationFrame(gameLoop);
      }
      gameLoop();
  </script>
  </div>
`

function Game() {
      //file_name = this.props.file || "default.level"
      const divRef = useRef();

      useEffect(() => {
        const fragment = document.createRange().createContextualFragment(rawHTML);
        divRef.current.append(fragment);
      }, []);

      
      return <div ref={divRef} />;
    
}
  
  export default Game;