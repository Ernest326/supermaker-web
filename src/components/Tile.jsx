import "../stylesheets/Tile.css";
import React from "react";

function Tile(props) {
  return (
    <div id="Tile" style={{backgroundColor: props.selected ? '#d35f5f' : ''}}>  
      <h1 id="Tile-title">{props.title}</h1>
      <img id="Tile-img" src={props.img}></img>
    </div>
  );
}

export default Tile;
