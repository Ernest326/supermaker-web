import "../style.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import GameMaker from "../res/SuperMaker.png";

function Home() {
  let navigate = useNavigate();

  function navLogin() {
    navigate("/Login");
  }

  function navGuest() {
    navigate("/Game");
  }

  function navRegister() {
    navigate("/Register");
  }

  return (

    <div className="Login-box">

      <video autoplay="autoplay" loop className="background-video">
        <source src="background.mp4" type="video/mp4"></source>
      </video>
      

      <div className="Login-box-title">
        <div id="Logo-frame">
          <img id="Logo-img" src={GameMaker}></img>
        </div>
      </div>
      <div className="Login-box-middle">
        <div className="Login-box-middle-left">
          <Button variant="primary" className="Login-btn" onClick={navLogin}>
            Login
          </Button>
        </div>
        <div className="Login-box-middle-right">
          <Button variant="primary" className="Login-btn" onClick={navRegister}>
            Register
          </Button>
        </div>
      </div>
      <div className="Login-box-lower">
        <Button variant="link" onClick={navGuest}>
          Play as Guest?
        </Button>
      </div>
    </div>
  );
}

export default Home;
