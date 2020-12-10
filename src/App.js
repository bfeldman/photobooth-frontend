import React from 'react'
import Webcam from "react-webcam"
import PhotoEditor from './components/PhotoEditor'

class App extends React.Component {
  
  state = {
    webcamPreview: true,
    webcamPhoto: "",
    photoEditorVisible: false
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const image = this.webcam.getScreenshot();
    this.setState({
      webcamPhoto: image,
      photoEditorVisible: true
    });
  };
  
  reset = () => {
    this.setState({
      webcamPreview: true,
      webcamPhoto: "",
      photoEditorVisible: false
    })
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.capture}>take pic</button>
        <button onClick={this.reset}>reset</button>
        <br />
        <Webcam ref={this.setRef} screenshotFormat="image/jpeg" />
        <br />
        {this.state.photoEditorVisible ? <PhotoEditor src={this.state.webcamPhoto}/> : null}
      </div>
    )
  }
}

export default App;
