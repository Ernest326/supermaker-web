import "../stylesheets/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  function navLogin() {
    navigate("/Menu");
  }

  function navBack() {
    navigate("/");
  }

  return (
    <div className="Login-box">
      <Form className="Login-form">
        <h1>Login</h1>
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
        <br />
        <Button
          variant="primary"
          type="submit"
          className="Login-btn"
          onClick={navLogin}
        >
          Login
        </Button>
        <br />
        <Button variant="link" onClick={navBack}>
          Back?
        </Button>
      </Form>
    </div>
  );
}

export default Login;
