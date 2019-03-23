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
      isPlaying: false,
      timeSet: false,
      videoDuration: 100, // need to set to videos actual duration
      displayAnnotations: false,
      annotations: [],
      duration: 0,
      width2: 0,
      time: 0
    };
  }

  componentDidMount() {
    this.video = document.getElementById('vid1');
    this.setState({ duration: this.video.duration});
    this.video2 = document.getElementById('vid2');
  }


  playVideo() {

    if (this.refs.vidRef.paused) {
      this.video.play();
      this.video2.play();
    } else {
      this.video.pause();
      this.video2.pause();
    }
  }


  setVideoLenght() {
    if (this.state.timeSet === false)
      this.setState({ timeSet: true, videoDuration: this.refs.vidRef.duration });
  }

  timestampVideo() {
    console.log(this.refs.vidRef.currentTime);
  }

  forwardVideo() {
    this.refs.vidRef.currentTime += 0.0333; // 1/30 because most video are 30 frames per second
    this.refs.vidRef2.currentTime += 0.0333;
    this.timestampVideo();

    this.setState({ progress: this.state.progress + 0.0333 });
  }

  rewindVideo() {
    this.refs.vidRef.currentTime -= 0.0333;
    this.refs.vidRef2.currentTime -= 0.0333;
    this.timestampVideo();

    this.setState({ progress: this.state.progress - 0.0333 });
  }

  restartVideo() {
    this.refs.vidRef.currentTime = 0.0;
    this.refs.vidRef2.currentTime = 0.0;
    this.timestampVideo();

    this.setState({ progress: 0 });
  }

  updateProgressBar() {
    if (this.state.isPlaying)
      this.setState({ progress: this.state.progress + 0.0333 });
  }

  videoPlaying() {
    this.updateProgressBar();
    this.updateVideo1Time();
    this.updateVideo2Time();
  }

  getVideoLenght() {
    console.log(this.refs.vidRef.duration);
  }

  setVideoLength() {
    this.setState({ videoDuration: this.state.vidRef.duration });
  }

  addAnnotation() {
    this.setState({ annotations: [...this.state.annotations, { id: this.state.annotations.length, timestamp: this.refs.vidRef.currentTime }] });
    this.printTags();
  }

  spaceKey = keypress => {
    if (keypress.key === " ")
      this.playVideo();
  }

  arrowKeyHandler = keypress => {
    console.log(keypress.key);
    if (keypress.key === 'ArrowLeft')
      this.rewindVideo();
    else if (keypress.key === 'ArrowRight')
      this.forwardVideo();
  }

  printTags() {
    console.log('tags:');
    for (var i = 0; i < this.state.annotations.length; i++) {
      console.log(this.state.annotations[i]);
    }
  }


  displayAnnotation = () => {
    this.setState({
      displayAnnotations: !this.state.displayAnnotations
    });
  }


  updateProgressBar = () => {
    const { currentTime, duration, clientWidth } = this.video;
    const progressBarWidth = clientWidth * (currentTime / duration)
    document.getElementById("popup").innerHTML = Math.floor(this.video.currentTime) + '/' + Math.floor(this.video.duration);

    this.setState({
      time: progressBarWidth,
    });
  }

  updateProgressBar2 = () => {
    const { currentTime, duration, clientWidth } = this.video2;
    const progressBarWidth = clientWidth * (currentTime / duration)
    document.getElementById("popup2").innerHTML = Math.floor(this.video.currentTime) + '/' + Math.floor(this.video.duration);

    this.setState({
      width2: progressBarWidth,
    });
  }

  popup() {
    console.log('here');
  }
  oninput() {
    //output.innerHTML = this.value;
  }

  render() {
    // before render set video duration, so progress bar is set correctly
    let annotations = null;
    if (this.state.displayAnnotations) {
      annotations = (
        <div>
          {this.state.annotations.map((annotation, index) => {
            return <Annotation key={annotation.id}
              timestamp={annotation.timestamp} />
          })}
        </div>
      )
    }

    const progressBarStyle = {
      duration: this.state.duration
    };

    const progressBarStyle2 = {
      width: this.state.width2
    };

    return (
      <div className="App" tabIndex="0" onKeyDown={this.arrowKeyHandler} onKeyUp={this.spaceKey} >

        <div className="App">
          <video id="vid1" style={progressBarStyle} ref="vidRef" width="560" height="315" onTimeUpdate={this.updateProgressBar}>
            <source id="testVideo" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg" />
          </video>
          <div id="popup"></div>
          <div className="progress-bar-wrapper" onMouseOver={this.popup}>

            <input type="range" min="0" value= {this.state.time} className="slider" max={this.state.duration} id="myRange" 
              onChange={this.oninput} step="1" />
            />
            {/* <div ref={(ref) => { this.progressBar = ref; }} className="progress-bar" style={progressBarStyle} /> */}
          </div>
        </div>

        <div>
          <video id="vid2" ref="vidRef2" width="560" height="315" onTimeUpdate={this.updateProgressBar2}>
            <source id="testVideo" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg" />
          </video>
          <div id="popup2"></div>
          <div className="progress-bar-wrapper" >
            <div ref={(ref) => { this.progressBar = ref; }} className="progress-bar" style={progressBarStyle2} />
          </div>
        </div>

        <div>
          <button onClick={this.playVideo.bind(this)}>PLAY/PAUSE</button>
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