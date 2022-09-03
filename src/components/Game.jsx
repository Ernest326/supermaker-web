import React from "react";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Title from "../res/Title.png";
import { Play } from "react-bootstrap-icons";

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
  const divRef = useRef();

  function log() {
    console.log("0")
  }

  useEffect(() => {
    const fragment = document.createRange().createContextualFragment(rawHTML);
    divRef.current.append(fragment);
  }, []);

  return (
    <div id="Build-tools">
      <div id="Build-tools-title">
        <img src={Title}></img>
      </div>
      <div id="Build-tools-container">
        <div id="Build-tools-menu-left">
          <button onClick={log}>
            <Play color="#00ff00" size={40} />
          </button>
          </div>
        <div id="Build-tools-screen" ref={divRef} />
        <div id="Build-tools-menu-right">
          <p>2</p>
        </div>
      </div>
    </div>
  );
}

export default Game;
