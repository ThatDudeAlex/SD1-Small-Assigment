import React, { Component } from 'react';
import './App.css';
import Annotation from './Annotation.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
      timestamp: props.timestamp,
      annotationArray: [],
      progress: 0,
      videoDuration: 100, // need to set to videos actual duration
      displayAnnotations: false,
      annotations: []
    };
  }

  playVideo() {
    this.refs.vidRef.play();
    this.refs.vidRef2.play();

    // need to get progress bar to automatically update progress bars value
  }

  pauseVideo() {
    this.refs.vidRef.pause();
    this.refs.vidRef2.pause();
  }

  timestampVideo() {
    console.log(this.refs.vidRef.currentTime);
  }

  forwardVideo() {
    this.refs.vidRef.currentTime += 0.0333; // 1/30 because most video are 30 frames per second
    this.refs.vidRef2.currentTime += 0.0333;
    this.timestampVideo();

    this.setState({progress: this.state.progress + 0.0333});
  }

  rewindVideo() {
    this.refs.vidRef.currentTime -= 0.0333;
    this.refs.vidRef2.currentTime -= 0.0333;
    this.timestampVideo();

    this.setState({progress: this.state.progress - 0.0333});
  }

  restartVideo() {
    this.refs.vidRef.currentTime = 0.0;
    this.refs.vidRef2.currentTime = 0.0;
    this.timestampVideo();

    this.setState({progress: 0});
  }

  getVideoLenght() {
    console.log(this.refs.vidRef.duration);
  }

  setVideoLength() {
    this.setState({videoDuration: this.state.vidRef.duration});
  }

  addAnnotation() {
    this.setState({annotations: [...this.state.annotations, {id: this.state.annotations.length, timestamp: this.refs.vidRef.currentTime}]});
    this.printTags();
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

  printTags() {
    console.log('tags:');
    for(var i = 0; i < this.state.annotations.length; i++) {
      console.log(this.state.annotations[i]);
    }
  }


  displayAnnotation = () => {
    this.setState({
      displayAnnotations: !this.state.displayAnnotations
    });
  }


  render() {
    // before render set video duration, so progress bar is set correctly
    let annotations = null;
    if(this.state.displayAnnotations) {
      annotations = (
        <div>
          { this.state.annotations.map((annotation, index) => {
            return <Annotation key={annotation.id}
            timestamp={annotation.timestamp} />
          })}
        </div>
      )
    }

    return (
      <div className="App" tabIndex="0" onKeyDown={this.arrowKeys}>

        <div>
          <video ref="vidRef" width="560" height="315">
            <source id="testVideo" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg" />
          </video>
          <progress id="progressBar1" value={this.state.progress} max={this.state.videoDuration} style={{width:"400px"}}></progress>
        </div>

        <div>
          <video ref="vidRef2" width="560" height="315">
            <source id="testVideo" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg" />
          </video>
          <progress id="progressBar1" value={this.state.progress} max={this.state.videoDuration} style={{width:"400px"}}></progress>
        </div>

        <div>
          <button onClick={this.playVideo.bind(this)}>PLAY</button>
          <button onClick={this.pauseVideo.bind(this)}>PAUSE</button>
          <button onClick={this.forwardVideo.bind(this)}>FORWARD</button>
          <button onClick={this.rewindVideo.bind(this)}>REWIND</button>
          <button onClick={this.restartVideo.bind(this)}>RESTART</button>
          <button onClick={this.addAnnotation.bind(this)}>ADD TAG</button>
        </div>

        <div>
          <button onClick={this.timestampVideo.bind(this)}>TIMESTAMP</button>
          <button onClick={this.getVideoLenght.bind(this)}>VIDEO LENGTH</button>
        </div>

        <div>
          <button className="btn" onClick={this.displayAnnotation}>View Annotations</button>
            {annotations}
          </div>
        </div>
    );
  }
}

export default App;
