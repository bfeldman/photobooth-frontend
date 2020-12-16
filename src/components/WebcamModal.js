import React from 'react'
import Webcam from "react-webcam"
import { Button, Modal, Image, Container } from 'semantic-ui-react'

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
          basic
        >
          <Modal.Header>Take A Pic</Modal.Header>
          
          {this.state.webcamPreview ?
            <div className="live-preview">
              <Modal.Content>
                <Container textAlign="center">
                    <div><Webcam
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      width={640}
                    /></div>
                    <Button circular={true} color="red" size="large" onClick={this.capture}>take pic</Button>
                </Container>
              </Modal.Content>
            </div>
          : null }
          
          {this.state.showCapture ?
            <div className="capture-preview">
              <Modal.Content>
                <Container textAlign="center">
                  <Image centered={true} src={this.state.webcamPhoto} alt="preview" />
                  <Button circular={true} color="red" size="large" onClick={this.retake}>retake</Button>
                  <Button circular={true} color="green" size="large" onClick={this.sendToEditor}>edit pic</Button>
              </Container>
              </Modal.Content>
            </div>
          : null }
                  
        </Modal>
        
      </div>
    )
  }
  
}

export default WebcamModal