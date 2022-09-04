import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Login from "./components/Login";
import Register from "./components/Register";
import Editor from "./components/Editor";
import Menu from "./components/Menu"

function App() {
  return (
    <div className="App">
      <video id="App-background" autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Editor" element={<Editor />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Menu" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
