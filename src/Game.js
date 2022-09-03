import './lib/LWWGL.js'
import './lib/LWWGL.css'

import React from 'react'

class Game extends React.Component {

    //file_name = this.props.file || "default.level"

    render() {
        return (
            <div className="Game">
              <canvas id="game-screen"
                      class="canvas-center"        
                      style="border: 1px solid #d3d3d3; width: 900px; height: 500px;"
              >
                  Your browser does not support the HTML canvas tag.</canvas
              >
      
              <script>
                  let test = new FillText(75, 100, "Hello World", "Arial", 30, black);
                  test.draw();
              </script>
            </div>
          );
    }
    
  }
  
  export default Game;