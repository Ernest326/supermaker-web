import "../stylesheets/Setting.css";
import React from "react";

function Setting(props) {
  return (
    <div className="Setting-container">
      <div className="Setting-container-left">
        <p>{props.name}</p>
      </div>
      <div className="Setting-container-right">
        <input id={props.id} placeholder={props.placeholder}></input>
      </div>
    </div>
  );
}

export default Setting;
