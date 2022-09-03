import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Login from "./components/Login"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Game' element={<Game/>} />
          <Route path='/Login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
