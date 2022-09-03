import "../App.css"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

function Home() {
  return(
      <div className="App">
      <div className='Login-box'>
        <div className='Login-box-title'>
          <h1>Login</h1>
        </div>
        <div className='Login-box-middle'>
          <div className='Login-box-middle-left'>
            <Button variant="primary" className="Login-btn">Login</Button>
          </div>
          <div className='Login-box-middle-right'>
            <Button variant="primary" className="Login-btn" >Register</Button>
          </div>
        </div>
        <div className='Login-box-lower'>
          <Button variant="link">Play as Guest</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;