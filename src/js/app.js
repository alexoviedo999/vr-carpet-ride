import 'aframe';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';

class CarpetRideScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red'
    }
  }

  changeColor = () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };

  render () {
    return (
      <div>
        <Scene>
          <a-assets>
            <img id="sky" src="../img/tron-world.jpg"/>
            <video id="stripes" src="../img/flow-stripes.mp4" loop="true" width="1000" height="1000"/>
            <video id="world" src="../img/planet-world.mp4" loop="true" width="1000" height="1000"/>
            <video id="lazer" src="../img/lazer-color-tunnel.mp4" loop="true" width="1000" height="1000"/>
            <video id="waves" src="../img/3d-waves.mp4" loop="true" width="1000" height="1000"/>
          </a-assets>

          <Entity>
            <Camera>
              <Cursor/>
            </Camera>
          </Entity>
          <Sky/>

          <Entity light={{type: 'ambient', color: '#888'}}/>
          <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
          <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>

          <Entity geometry="primitive: cylinder" material={{shader: 'flat', side: 'double', src: '#stripes', repeat: '1 1'}}
            position="10 0 0"
            height="5000" radius="20" radius-top="20" radius-bottom="25" open-ended="true" rotation="-90 0 0" scale="1 10 1">
          </Entity>

          <Entity geometry="primitive: box" material={{shader: 'flat', side: 'double', src: '#waves', repeat: '1 1'}}
              onClick={this.changeColor}
              position="0 0 -5">
              <Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360" easing="linear"/>
          </Entity>
        </Scene>
      </div>
    );
  }
}

ReactDOM.render(<CarpetRideScene/>, document.querySelector('.scene-container'));
