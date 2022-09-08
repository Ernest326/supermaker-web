import "../stylesheets/Tile.css";
import React from "react";

function Tile(props) {
  return (
    <div
      className="Tile"
      style={{ backgroundColor: props.selected ? "#d35f5f" : "" }}
    >
      <h1 className="Tile-title">{props.title}</h1>
      <img className="Tile-img" src={props.img}></img>
    </div>
  );
}

export default Tile;
