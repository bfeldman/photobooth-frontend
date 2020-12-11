import React from 'react'
import Webcam from "react-webcam"

class WebcamModal extends React.Component {
  
  state = {
    webcamPhoto: "",
    webcamPreview: true,
    showCapture: false
  }
  
  setRef = (webcam) => {
    this.webcam = webcam
  }
 
  capture = () => {
    const photo = this.webcam.getScreenshot();
    this.setState({
      webcamPhoto: photo,
      webcamPreview: false,
      showCapture: true
    })
  }
  
  retake = () => {
    this.setState({
      webcamPhoto: "",
      webcamPreview: true,
      showCapture: false
    })
  }
  
  sendToEditor = () => {
    this.props.setPhotoToEdit(this.state.webcamPhoto)
  }
  
  render() {
    return(
      <div className="webcam-modal">
        {this.state.webcamPreview ?
          <div className="webcam-preview">
            <Webcam
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={640}
            />
            <button onClick={this.capture}>take pic</button>
          </div>
        : null }
        
        {this.state.showCapture ?
          <div className="capture-preview">
            <img src={this.state.webcamPhoto} alt="preview" />
            <button onClick={this.retake}>retake</button>
            <button onClick={this.sendToEditor}>edit pic</button>
          </div>
        : null }
        
      </div>
    )
  }
  
}

export default WebcamModal