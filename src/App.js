import './App.css';

function App() {
  return (
    <div className="App">
      <div className='Login-box'>
        <div className='Login-box-title'>
          <h1>SuperMaker</h1>
        </div>
        <div className='Login-box-middle'>
          <div className='Login-box-middle-left'>
            <button className='Login-btn'>Login</button>
          </div>
          <div className='Login-box-middle-right'>
            <button className='Login-btn'>Register</button>
          </div>
        </div>
        <div className='Login-box-lower'>
          <button id='Guest'>Play as guest</button>
        </div>
      </div>
    </div>
  );
}

export default App;
