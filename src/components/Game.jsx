import "../stylesheets/Game.css";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Title from "./Title.jsx";
import Tile from "./Tile.jsx";
import { Play } from "react-bootstrap-icons";

const rawHTML = `
  <div class="Game">
    <canvas id="myCanvas"
            class="canvas-center nearest"        
            style="border: 2px solid #d3d3d3; width: 1920; height: 1080; image-rendering: pixelated; margin-top: 15px"

    >
        Your browser does not support the HTML canvas tag.
    </canvas>
    <script type='module' src='GameLogic.js'></script>
  </div>
`;

const inputHTML = `  
  <label class="file">
    <input type="file" id="file" aria-label="Load" accept=".level"
      style="margin-top: 15px">
  </label>
`;

function Game() {
  const divRef = useRef();
  const navigate = useNavigate();

  function reloadPage() {
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    const fragment = document.createRange().createContextualFragment(rawHTML);
    divRef.current.append(fragment);
  }, []);

  return (
    <div className="Game">
      <Title />
      <div className="Game-container">
        <div className="Game-menu-left">
          <h1>Level</h1>
          <br></br>
          <div
            className="Game-file-container"
            dangerouslySetInnerHTML={{ __html: inputHTML }}
          ></div>
          <div>
            <button onClick={reloadPage}>Reload Page</button>
          </div>
        </div>
        <div className="Game-screen">
          <div ref={divRef} />
        </div>
        <div className="Game-menu-right">
          <div className="Settings">
            <h1 className="Settings-title">Controls</h1>
            <br></br>
            <div className="Control">
              <div className="Control-left">
                <label>Move-forward:</label>
              </div>
              <div className="Control-right">
                <label>W</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
