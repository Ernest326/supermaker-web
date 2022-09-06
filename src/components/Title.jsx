import "../stylesheets/Title.css";
import React from "react";
import TitleImg from "../res/Title.png";

function Title() {
  return (
    <div id="SuperMaker-main">
      <div id="SuperMaker-title">
        <img src={TitleImg}></img>
      </div>
    </div>
  );
}

export default Title;
