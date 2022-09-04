import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title.jsx";
import Tile from "./Tile.jsx";
import Setting from "./Setting.jsx";
import { Play } from "react-bootstrap-icons";

const rawHTML = `
  <div class="Game">
    <canvas id="myCanvas"
            class="canvas-center nearest"        
            style="border: 2px solid #d3d3d3; width: 1280; height: 720; image-rendering: pixelated"

    >
        Your browser does not support the HTML canvas tag.
    </canvas>
    <script type='module' src='EditorLogic.js'></script>
  </div>
`;

const inputHTML = `  
  <label class="file">
    <input type="file" id="file" aria-label="Load" accept=".level"
      style="margin-top: 15px">
  </label>
`;

const saveHTML = `  
  <label class="save">
    <input type="button" id="save">
  </label>
`;

function Editor() {
  const divRef = useRef();
  const navigate = useNavigate();

  const [settings, setSettings] = useState([
    {
      title: "Spawn X",
      placeholder: "int",
    },
    {
      title: "Spawn Y",
      placeholder: "int",
    },
    {
      title: "Backdrop Fill",
      placeholder: "string(hexcode)",
    },
    {
      title: "Clouds",
      placeholder: "boolean",
    },
    {
      title: "Gravity",
      placeholder: "int",
    },
    {
      title: "Jump Force",
      placeholder: "float",
    },
    {
      title: "Speed",
      placeholder: "float",
    },
  ]);

  const [tiles, setTiles] = useState([
    {
      title: "Grass",
      img: "/sprites/5.png",
      selected: false,
    },
    {
      title: "Dirt",
      img: "/sprites/4.png",
      selected: false,
    },
    {
      title: "Sand",
      img: "/sprites/3.png",
      selected: false,
    },
    {
      title: "Stone",
      img: "/sprites/2.png",
      selected: false,
    },
    {
      title: "Wood",
      img: "/sprites/1.png",
      selected: false,
    },
    {
      title: "Null",
      img: "/sprites/0.png",
      selected: false,
    },
  ]);

  let selectedIndex = -1;

  function reloadPage() {
    navigate("/");
    window.location.reload();
  }

  function handleClick(index) {
    let newArr = [...tiles];
    newArr.forEach((element) => {
      element.selected = false;
    });
    newArr[index] = {
      title: newArr[index].title,
      img: newArr[index].img,
      selected: true,
    };
    selectedIndex = index;

    setTiles(newArr);
  }

  useEffect(() => {
    const fragment = document.createRange().createContextualFragment(rawHTML);
    divRef.current.append(fragment);
  }, []);

  return (
    <div id="Build-tools">
      <Title />
      <div id="Build-tools-container">
        <div id="Build-tools-menu-left">
          <h1>Level</h1>
          <div id="Build-tools-file-container">
            <div dangerouslySetInnerHTML={{ __html: inputHTML }}></div>
            <div
              id="Build-tools-save"
              dangerouslySetInnerHTML={{ __html: saveHTML }}
            ></div>
            <div>
              <button onClick={reloadPage}>Reload Page</button>
            </div>
          </div>
          <h1>Objects</h1>
          <br></br>
          {tiles.map((Tiles, index) => {
            return (
              <div
                onClick={() => {
                  handleClick(index);
                }}
                key={index}
              >
                <button>
                  <Tile
                    key={index}
                    title={Tiles.title}
                    img={Tiles.img}
                    selected={Tiles.selected}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <div id="Build-tools-screen">
          <div ref={divRef} />
        </div>
        <div id="Build-tools-menu-right">
          {tiles.map((Tiles, index) => {
            if (Tiles.selected === true) {
              return (
                <div>
                  <h1>Selected</h1>
                  <br></br>
                  <button>
                    <Tile
                      key={index}
                      title={Tiles.title}
                      img={Tiles.img}
                      selected={Tiles.selected}
                    />
                  </button>
                </div>
              );
            }
          })}
          <div id="Settings">
            <h1 id="Settings-title">Settings</h1>
            <br></br>
            {settings.map((Settings, index) => {
              return (
                <Setting
                  key={index}
                  id={"Setting" + index}
                  name={Settings.title}
                  placeholder={Settings.placeholder}
                />
              );
            })}
          </div>
          <div id="Tiles">
            <h1>Tiles</h1>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
