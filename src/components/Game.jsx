import React from "react";
import { useEffect, useRef } from "react";

const rawHTML = `
  <div class="Game">
    <canvas id="myCanvas"
            class="canvas-center nearest"        
            style="border: 2px solid #d3d3d3; width: 1280; height: 720; image-rendering: pixelated"

    >
        Your browser does not support the HTML canvas tag.
    </canvas>
    <script type='text/javascript' src='GameLogic.js'></script>
  </div>
`;

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
