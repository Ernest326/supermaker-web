import './App.css';
import { render } from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
