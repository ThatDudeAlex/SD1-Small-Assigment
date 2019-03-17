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

  getVideoLenght() {
    console.log(this.refs.vidRef.duration);
  }

  arrowKeys = keypress => {
    this.arrowKeyHandler(keypress.key);
  }

  arrowKeyHandler = keycode => {
    console.log(keycode);
    if (keycode === 'ArrowLeft')
      this.rewindVideo();
    else if (keycode === 'ArrowRight')
      this.forwardVideo();
  }

  
  render() {
    return (
      <div className="App" tabIndex="0" onKeyDown={this.arrowKeys}>

        <video ref="vidRef" width="560" height="315">
          <source id="testVideo" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg" />
        </video>

        <div>
          <button onClick={this.playVideo.bind(this)}>PLAY</button>
          <button onClick={this.pauseVideo.bind(this)}>PAUSE</button>
          <button onClick={this.forwardVideo.bind(this)}>FORWARD</button>
          <button onClick={this.rewindVideo.bind(this)}>REWIND</button>
          <button onClick={this.restartVideo.bind(this)}>RESTART</button>
        </div>

        <div>
          <button onClick={this.timestampVideo.bind(this)}>TIMESTAMP</button>
          <button onClick={this.getVideoLenght.bind(this)}>VIDEO LENGHT</button>

        </div>
      </div>
    );

  }

}

export default App;
