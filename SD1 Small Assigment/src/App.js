import React, { Component } from 'react';
import './App.css';
import Annotation from './Annotation.js';
import SpanAnnotation from './SpanAnnotation.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
      timestamp: props.timestamp,
      startTimestamp: props.startTimestamp,
      endTimestamp: props.endTimestamp,
      displayAnnotations: false,
      displaySpanAnnotations: false,
      annotations1: [],
      annotations2: [],
      spanAnnotations1: [],
      spanAnnotations2: [],
      tagMode: false,
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
    if ((event.currentTarget.id === "myRange") && (this.state.tagMode === false))
      this.video.currentTime = event.currentTarget.value;
    if (event.currentTarget.id === "myRange2" && (this.state.tagMode === false))
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

  // Plays & Pauses a video when clicked
  videoClicked = event => {
    const video = event.currentTarget;
    console.log(video);
    if (video.paused)
      video.play();
    else
      video.pause();
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

  syncToVid1() {
    this.video2.currentTime = this.video.currentTime;
  }

  syncToVid2() {
    this.video.currentTime = this.video2.currentTime;
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

  // want to use parameter to setState?
  // addAnnotation() {
  //   this.setState({ annotations: [...this.state.annotations, { id: this.state.annotations.length, timestamp: this.refs.vidRef.currentTime }] });
  //   this.printTags();
  // }

  addAnnotation1() {
    this.setState({ annotations1: [...this.state.annotations1, { id: this.state.annotations1.length, timestamp: this.refs.vidRef.currentTime }] });
    this.printTags();
  }

  addAnnotation2() {
    this.setState({ annotations2: [...this.state.annotations2, { id: this.state.annotations2.length, timestamp: this.refs.vidRef2.currentTime }] });
    this.printTags();
  }

  parallelAnnotate() {
    this.addAnnotation2();
    this.addAnnotation1();
  }

  setSpanStart1() {
    this.setState({startTimestamp: this.refs.vidRef.currentTime});
    console.log(this.state.startTimestamp);
  }

  setSpanEnd1() {
    // make so end cant be eariler than start
    this.setState({endTimestamp: this.refs.vidRef.currentTime});
    console.log(this.state.endTimestamp);
  }

  addSpanAnnotation1() {
    this.setState({ spanAnnotations1: [...this.state.spanAnnotations1, { id: this.state.spanAnnotations1.length, startTimestamp: this.state.startTimestamp, endTimestamp: this.state.endTimestamp }] });
    this.printSpanTags();
  }

  setSpanStart2() {
    this.setState({startTimestamp: this.refs.vidRef2.currentTime});
    console.log(this.state.startTimestamp);
  }

  setSpanEnd2() {
    // make so end cant be eariler than start
    this.setState({endTimestamp: this.refs.vidRef2.currentTime});
    console.log(this.state.endTimestamp);
  }

  addSpanAnnotation2() {
    this.setState({ spanAnnotations2: [...this.state.spanAnnotations2, { id: this.state.spanAnnotations2.length, startTimestamp: this.state.startTimestamp, endTimestamp: this.state.endTimestamp }] });
    this.printSpanTags();
  }

  printTags() {
    console.log('tags1:');
    for (var i = 0; i < this.state.annotations1.length; i++) {
      console.log(this.state.annotations1[i]);
    }

    console.log('tags2:');
    for (var i = 0; i < this.state.annotations2.length; i++) {
      console.log(this.state.annotations2[i]);
    }
  }

  printSpanTags() {
    console.log('span tags1:');
    for(var i = 0; i < this.state.spanAnnotations1.length; i++) {
      console.log(this.state.spanAnnotations1[i]);
    }
  }

  displayAnnotation = () => {
    this.setState({
      displayAnnotations: !this.state.displayAnnotations
    });
  }

  displaySpanAnnotations = () => {
    this.setState({
      displaySpanAnnotations: !this.state.displaySpanAnnotations
    });
  }

  tagMode = () => {
    if (this.state.tagMode)
      this.setState({ tagMode: false });
    else
      this.setState({ tagMode: true });
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

    const tag = {
      color: 'white',
    }

    let annotations1 = null;
    let annotations2 = null;
    if (this.state.displayAnnotations) {
      annotations1 = (
        <div style={tag}>
          {this.state.annotations1.map((annotation, index) => {
            return <Annotation key={annotation.id}
              timestamp={annotation.timestamp} />
          })}
        </div>
      )

      annotations2 = (
        <div style={tag}>
          {this.state.annotations2.map((annotation, index) => {
            return <Annotation key={annotation.id}
              timestamp={annotation.timestamp} />
          })}
        </div>
      )
    }

    let spanAnnotations1 = null;
    let spanAnnotations2 = null;
    if (this.state.displaySpanAnnotations) {
      spanAnnotations1 = (
        <div style={tag}>
          {this.state.spanAnnotations1.map((annotation, index) => {
            return (
              <div>
                <p style={{display:"inline"}}>({annotation.startTimestamp},</p>
                <p style={{display:"inline"}}> {annotation.endTimestamp})</p>
              </div>);
          })}
        </div>
      )

      spanAnnotations2 = (
        <div style={tag}>
          {this.state.spanAnnotations2.map((annotation, index) => {
            return (
              <div>
                <p style={{display:"inline"}}>({annotation.startTimestamp},</p>
                <p style={{display:"inline"}}> {annotation.endTimestamp})</p>
              </div>);
          })}
        </div>
      )

    }


    return (
      <div className="App" tabIndex="0" onKeyDown={this.arrowKeyHandler} onKeyUp={this.spaceKey}>
        <video id="vid1" ref="vidRef" width="760" height="415" className="videos"
          onClick={this.videoClicked} onLoadedMetadata={this.handleMetadata} onTimeUpdate={this.changeInVideoTime} >
          <source id="testVideo" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" type="video/ogg" />
        </video>

        <span className="gap"></span>

        <video id="vid2" ref="vidRef2" width="760" height="415" className="videos"
          onClick={this.videoClicked} onLoadedMetadata={this.handleMetadata} onTimeUpdate={this.changeInVideoTime}>
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
          <button className="playback-buttons" onClick={this.playVideo.bind(this)}>PLAY/PAUSE</button>
          <button className="playback-buttons" onClick={this.forwardVideo.bind(this)}>FORWARD</button>
          <button className="playback-buttons" onClick={this.rewindVideo.bind(this)}>REWIND</button>
          <button className="playback-buttons" onClick={this.restartVideo.bind(this)}>RESTART</button>
          <button className="playback-buttons" onClick={this.syncToVid1.bind(this)}>SYNC TO 1</button>
          <button className="playback-buttons" onClick={this.syncToVid2.bind(this)}>SYNC TO 2</button>
        </div>
        <div>
          <button className="playback-buttons" onClick={this.addAnnotation1.bind(this)}>ADD TAG1</button>
          <button className="playback-buttons" onClick={this.addAnnotation2.bind(this)}>ADD TAG2</button>
          <button className="playback-buttons" onClick={this.parallelAnnotate.bind(this)}>PARALLEL TAG</button>
        </div>
          <button className="playback-buttons" onClick={this.setSpanStart1.bind(this)}>Set Span Start 1</button>
          <button className="playback-buttons" onClick={this.setSpanEnd1.bind(this)}>Set Span End 1</button>
          <button className="playback-buttons" onClick={this.addSpanAnnotation1.bind(this)}>Add Span Tag1</button>
        <div>
        </div>
          <button className="playback-buttons" onClick={this.setSpanStart2.bind(this)}>Set Span Start 2</button>
          <button className="playback-buttons" onClick={this.setSpanEnd2.bind(this)}>Set Span End 2</button>
          <button className="playback-buttons" onClick={this.addSpanAnnotation2.bind(this)}>Add Span Tag2</button>
        <div>

        </div>
//
        <div style={this.styles}>
          {/* <button className="btn" onClick={this.tagMode}>Tags</button> */}
          <button className="playback-buttons" onClick={this.displayAnnotation}>View Annotations</button>
          <table style={tag}>
            <tr>Video1 Tags</tr>
              <th>{annotations1}</th>
            <tr>Video2 Tags</tr>
              <th>{annotations2}</th>
          </table>
        </div>

        <div style={this.styles}>
          {/* <button className="btn" onClick={this.tagMode}>Tags</button> */}
          <button className="playback-buttons" onClick={this.displaySpanAnnotations}>View Span Annotations</button>
          <table style={tag}>
            <tr>Video1 Span Tags</tr>
              <th>{spanAnnotations1}</th>
            <tr>Video1 Span Tags</tr>
              <th>{spanAnnotations2}</th>
          </table>
        </div>
      </div>
    );
  }
}



export default App;
