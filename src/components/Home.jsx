import "../App.css"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  function navLogin() {
    navigate('Login');
  }

  return(
    <div className='Login-box'>
      <div className='Login-box-title'>
        <h1>SuperMaker</h1>
      </div>
      <div className='Login-box-middle'>
        <div className='Login-box-middle-left'>
          <Button variant="primary" className="Login-btn" onClick={navLogin}>Login</Button>
        </div>
        <div className='Login-box-middle-right'>
          <Button variant="primary" className="Login-btn" >Register</Button>
        </div>
      </div>
      <div className='Login-box-lower'>
        <Button variant="link">Play as Guest</Button>
      </div>
    </div>
  );
}

export default Home;