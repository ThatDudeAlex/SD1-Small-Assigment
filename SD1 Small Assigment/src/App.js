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
      displayAnnotations: false,
      annotations: []
    };
  }

  // use to get video ref when mounted
  componentDidMount() {
    this.video = document.getElementById('vid1');
    this.video2 = document.getElementById('vid2');
  }

  // when videos finish loading to the browser, sets the total video time to the
  // screen and progress bar 
  handleMetadata = event => {
    const duration = Math.floor(event.currentTarget.duration);

    if (event.currentTarget.id === "vid1") {
      document.getElementById('vid1Total').textContent = this.formatTime(duration);
      document.getElementById('myRange').max = duration;
    }
    if (event.currentTarget.id === "vid2") {
      document.getElementById('vid2Total').textContent = this.formatTime(duration);
      document.getElementById('myRange2').max = duration;
    }
  }

  // changes video playback time based on where user clicks/drags progress bar
  onChange = event => {
    if (event.currentTarget.id === "myRange")
      this.video.currentTime = event.currentTarget.value;
    if (event.currentTarget.id === "myRange2")
      this.video2.currentTime = event.currentTarget.value;
  }

  // Plays & Pauses both videos 
  playVideo() {
    if (this.refs.vidRef.paused) {
      this.video.play();
      this.video2.play();
    } else {
      this.video.pause();
      this.video2.pause();
    }
  }

  // fast forwards frame by frame 
  forwardVideo() {
    this.video.currentTime += 0.0333; // 1/30 because most video are 30 frames per second
    this.video2.currentTime += 0.0333;
  }

  // rewinds back frame by frame
  rewindVideo() {
    this.video.currentTime -= 0.0333; // 1/30 because most video are 30 frames per second
    this.video2.currentTime -= 0.0333;
  }

  // restarts both videos 
  restartVideo() {
    this.video.currentTime = 0.0;
    this.video2.currentTime = 0.0;
  }

  // when change occurs in a videos time, display its current playback time
  changeInVideoTime = event => {
    const currentTime = Math.floor(event.currentTarget.currentTime);
    if (event.currentTarget.id === "vid1") {
      document.getElementById('vid1Current').textContent = this.formatTime(currentTime);
      document.getElementById('myRange').value = currentTime;
    }

    if (event.currentTarget.id === "vid2") {
      document.getElementById('vid2Current').textContent = this.formatTime(currentTime);
      document.getElementById('myRange2').value = currentTime;
    }
  }

  // formats time in seconds into hr: min :sec
  formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (hours < 10)
      hours = `0${hours}`;
    if (minutes < 10)
      minutes = `0${minutes}`;
    if (seconds < 10)
      seconds = `0${seconds}`;

    let form = hours >= 1 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
    return form;
  }

  // spacebar plays/pauses videos
  spaceKey = keypress => {
    if (keypress.key === " ")
      this.playVideo();
  }

  // rewinds and fast-forward with arrow keys
  arrowKeyHandler = keypress => {
    //console.log(keypress.key);
    if (keypress.key === 'ArrowLeft')
      this.rewindVideo();
    else if (keypress.key === 'ArrowRight')
      this.forwardVideo();
  }

  addAnnotation() {
    this.setState({ annotations: [...this.state.annotations, { id: this.state.annotations.length, timestamp: this.refs.vidRef.currentTime}] });
    this.printTags();
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



  render() {

    // style for playback time displayes
    const styles = {
      color: 'white',
      marginLeft: 5,
      marginRight: 5,
    };

    // adds space between progress bar and buttons
    const styles2 = {
      paddingBottom: 40
    };

    
    let annotations = null;
    if (this.state.displayAnnotations) {
      annotations = (
        <div style={this.styles}>
          {this.state.annotations.map((annotation, index) => {
            return <Annotation key={annotation.id}
              timestamp={annotation.timestamp} />
          })}
        </div>
      )
    }


    return (
      <div className="App" tabIndex="0" onKeyDown={this.arrowKeyHandler} onKeyUp={this.spaceKey}>

        <video id="vid1" ref="vidRef" width="760" height="415"
          onLoadedMetadata={this.handleMetadata} onTimeUpdate={this.changeInVideoTime} >
          <source id="testVideo" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg" />
        </video>

        <span className="gap"></span>

        <video id="vid2" ref="vidRef2" width="760" height="415"
          onLoadedMetadata={this.handleMetadata} onTimeUpdate={this.changeInVideoTime}>
          <source id="testVideo" src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
        </video>

        <div className="App" style={styles2}>
          {/* vid1 */}
          <span id="vid1Current" style={styles}> 00:00 </span>
          <span className="slidecontainer">
            <input type="range" min="0" max="100" defaultValue="0" onChange={this.onChange}
              className="slider" id="myRange" />
          </span>
          <span id="vid1Total" style={styles}> 00:00 </span>

          <span className="gap2"></span>

          {/* vid2 */}
          <span id="vid2Current" style={styles}> 00:00 </span>
          <span className="slidecontainer">
            <input type="range" min="0" max="100" defaultValue="0" onChange={this.onChange}
              className="slider" id="myRange2" />
          </span>
          <span id="vid2Total" style={styles}> 00:00 </span>

        </div>

        <div>
          <button onClick={this.playVideo.bind(this)}>PLAY/PAUSE</button>
          <button onClick={this.forwardVideo.bind(this)}>FORWARD</button>
          <button onClick={this.rewindVideo.bind(this)}>REWIND</button>
          <button onClick={this.restartVideo.bind(this)}>RESTART</button>
          <button onClick={this.addAnnotation.bind(this)}>ADD TAG</button>
        </div>

        <div style={this.styles}>
          <button className="btn" onClick={this.displayAnnotation}>View Annotations</button>
          {annotations}
        </div>


      </div>
    );
  }
}

export default App;