import React from "react";
import { useEffect, useRef } from "react";
import Title from "./Title";

const rawHTML = `
  <div class="Game">
    <label class="file">
      <input type="file" id="file" aria-label="Load" accept=".level"
      style="margin-top: 15px">
      <span class="file-custom"></span>
    </label>
    <canvas id="myCanvas"
            class="canvas-center nearest"        
            style="border: 2px solid #d3d3d3; width: 1920; height: 1080; image-rendering: pixelated; margin-top: 15px"

    >
        Your browser does not support the HTML canvas tag.
    </canvas>
    <script type='module' src='GameLogic.js'></script>
  </div>
`;

function Game() {
  const divRef = useRef();

  useEffect(() => {
    const fragment = document.createRange().createContextualFragment(rawHTML);
    divRef.current.append(fragment);
  }, []);

  return (
    <div>
      <Title />
      <div ref={divRef} />
    </div>
  );
}

export default Game;
