import "../stylesheets/Title.css";
import React from "react";
import TitleImg from "../res/Title.png";

function Title() {
  return (
    <div className="SuperMaker-main">
      <div className="SuperMaker-title">
        <img src={TitleImg}></img>
      </div>
    </div>
  );
}

export default Title;
