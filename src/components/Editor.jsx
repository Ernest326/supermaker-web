import React from "react";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Title from "./Title.jsx";
import Tile from "./Tile.jsx";
import { Play } from "react-bootstrap-icons";
import GrassImg from "../res/sprites/5.png";
import DirtImg from "../res/sprites/4.png";
import SandImg from "../res/sprites/3.png";
import StoneImg from "../res/sprites/2.png";
import WoodImg from "../res/sprites/1.png";
import NullImg from "../res/sprites/0.png";

const rawHTML = `
  <div class="Game">
    <canvas id="myCanvas"
            class="canvas-center nearest"        
            style="border: 2px solid #d3d3d3; width: 1280; height: 720; image-rendering: pixelated"

    >
        Your browser does not support the HTML canvas tag.
    </canvas>
    <script type='text/javascript' src='EditorLogic.js'></script>
  </div>
`;

function Editor() {
  const divRef = useRef();

  useEffect(() => {
    const fragment = document.createRange().createContextualFragment(rawHTML);
    divRef.current.append(fragment);
  }, []);

  return (
    <div id="Build-tools">
      <Title />
      <div id="Build-tools-container">
        <div id="Build-tools-menu-left">
          <div>
            <h1>Tile List</h1>
            <br></br>
            <ul>
              <li>
                <Tile title={"Grass"} img={GrassImg} />
              </li>
              <li>
                <Tile title={"Dirt"} img={DirtImg} />
              </li>
              <li>
                <Tile title={"Sand"} img={SandImg} />
              </li>
              <li>
                <Tile title={"Stone"} img={StoneImg} />
              </li>
              <li>
                <Tile title={"Wood"} img={WoodImg} />
              </li>
              <li>
                <Tile title={"Null"} img={NullImg} />
              </li>
            </ul>
          </div>
        </div>
        <div id="Build-tools-screen">
          <div ref={divRef} />
        </div>
        <div id="Build-tools-menu-right">
        </div>
      </div>
    </div>
  );
}

export default Editor;
