import "../stylesheets/Home.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import GameMaker from "../res/SuperMaker.png";

function Home() {
  let navigate = useNavigate();

  function navLogin() {
    navigate("/Login");
  }

  function navGuest() {
    navigate("/Menu");
  }

  function navRegister() {
    navigate("/Register");
  }

  return (
    <div className="Home-box">
      <div className="Home-box-title">
        <div className="Home-logo-frame">
          <img className="Home-logo-img" src={GameMaker}></img>
        </div>
      </div>
      <div className="Home-box-middle">
        <div className="Home-box-middle-left">
          <Button
            variant="primary"
            className="Home-login-btn"
            onClick={navLogin}
          >
            Login
          </Button>
        </div>
        <div className="Home-box-middle-right">
          <Button
            variant="primary"
            className="Home-login-btn"
            onClick={navRegister}
          >
            Register
          </Button>
        </div>
      </div>
      <div className="Home-box-lower">
        <Button variant="link" onClick={navGuest}>
          Play as Guest?
        </Button>
      </div>
    </div>
  );
}

export default Home;
