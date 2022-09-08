import "../stylesheets/Menu.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Menu() {
  let navigate = useNavigate();

  function navGame() {
    navigate("/Game");
  }

  function navEditor() {
    navigate("/Editor");
  }

  function navBack() {
    navigate("/");
  }

  return (
    <div className="Menu-box">
      <Form id="Menu-form">
        <h1>Menu</h1>
        <br />
        <div>
          <Button
            id="Play-btn"
            variant="primary"
            type="submit"
            className="Menu-btn"
            onClick={navGame}
          >
            Play
          </Button>
        </div>
        <br />
        <div>
          <Button
            variant="primary"
            type="submit"
            className="Menu-btn"
            onClick={navEditor}
          >
            Studio
          </Button>
        </div>
        <br />
        <Button variant="link" onClick={navBack}>
          Back?
        </Button>
      </Form>
    </div>
  );
}

export default Menu;
