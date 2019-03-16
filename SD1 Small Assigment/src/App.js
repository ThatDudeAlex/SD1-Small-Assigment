import React, { Component } from 'react';
import './App.css';

class App extends Component {

 constructor(props) {
  super(props);
  this.state = {
    source: props.source,
    timestamp: props.timestamp
  };
}



playVideo() {
  this.refs.vidRef.play();
}
pauseVideo() {
  this.refs.vidRef.pause();
}

timestampVideo() {
  console.log(this.refs.vidRef.currentTime);
}

forwardVideo() {
  this.refs.vidRef.currentTime += 0.5;
  this.timestampVideo();
}

rewindVideo() {
  this.refs.vidRef.currentTime -= 0.5;
  this.timestampVideo();
}

restartVideo() {
  this.refs.vidRef.currentTime = 0.0;
  this.timestampVideo();
}

handleKey = keypress => {
  console.log(keypress.keyCode);
  this.arrowKeyHandler(keypress.keyCode);
}

arrowKeyHandler = keycode => {
  if(keycode === 37)
     this.rewindVideo();
  else if(keycode === 39)
    this.forwardVideo();
}


  render() {
	return (
  	<div className="App"  tabIndex="0" onKeyDown={this.handleKey}>

    	<video ref="vidRef" width="560" height="315">
      	<source  id="testVideo" src="http://techslides.com/demos/sample-videos/small.ogv" type="video/ogg" />
    	</video>

      <div>
        <button onClick={this.playVideo.bind(this)}>PLAY</button>
        <button onClick={this.pauseVideo.bind(this)}>PAUSE</button>
        <button onClick={this.forwardVideo.bind(this)}>FORWARD</button>
        <button onClick={this.rewindVideo.bind(this)}>REWIND</button>
        <button onClick={this.restartVideo.bind(this)}>RESTART</button>
        <button onClick={this.timestampVideo.bind(this)}>TIMESTAMP</button>
      </div>  
  	</div>
  );
  
  }

}

export default App;
