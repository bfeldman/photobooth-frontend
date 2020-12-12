import React from 'react'
import Webcam from "react-webcam"
import { Button, Header, Modal, Image } from 'semantic-ui-react'

class WebcamModal extends React.Component {
  
  state = {
    webcamPhoto: "",
    webcamPreview: true,
    showCapture: false,
    open: true
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
      showCapture: false,
    })
  }
  
  sendToEditor = () => {
    this.setState({open: false})
    this.props.sendToEditor(this.state.webcamPhoto)
  }
  
  render() {
    return(
      <div className="webcam-modal">
        
        <Modal
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          open={this.state.open}
        >
          <Modal.Header>Take A Pic</Modal.Header>
          
          {this.state.webcamPreview ?
            <div className="live-preview">
              <Modal.Content>
                <Webcam
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.capture}>take pic</Button>
              </Modal.Actions>
            </div>
          : null }
          
          {this.state.showCapture ?
            <div className="capture-preview">
              <Modal.Content>
                <Image src={this.state.webcamPhoto} alt="preview" />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.retake}>retake</Button>
                <Button onClick={this.sendToEditor}>edit pic</Button>
              </Modal.Actions>
            </div>
          : null }
                  
        </Modal>
        
      </div>
    )
  }
  
}

export default WebcamModal