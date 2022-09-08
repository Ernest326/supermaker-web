import "../stylesheets/Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  function navRegister() {
    navigate("/Menu");
  }

  function navBack() {
    navigate("/");
  }

  return (
    <div className="Register-box">
      <Form className="Register-form">
        <h1>Register</h1>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          type="submit"
          className="Register-btn"
          onClick={navRegister}
        >
          Register
        </Button>
        <br />
        <Button variant="link" onClick={navBack}>
          Back?
        </Button>
      </Form>
    </div>
  );
}

export default Register;
