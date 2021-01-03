import React from 'react'
import Webcam from "react-webcam"
import { Button, Modal, Image, Container, Header } from 'semantic-ui-react'

class WebcamModal extends React.Component {
  
  state = {
    webcamPhoto: "",
    webcamPreview: true,
    showCapture: false,
    webcamMirrored: true,
    countdown: 5,
    interval: null,
    open: true
  }
  
  componentWillUnmount() {
     clearInterval(this.state.interval);
  }
  
  setRef = (webcam) => {
    this.webcam = webcam
  }
  
  /* captures current webcam feed and sets to state */
  capture = () => {
    const newCount = this.state.countdown - 1
      if(newCount >= 0) { 
        this.setState({ countdown: newCount });
      } else {
        clearInterval(this.state.interval)
        const photo = this.webcam.getScreenshot()
        this.setState({
          webcamPhoto: photo,
          webcamPreview: false,
          showCapture: true,
          countdown: 5,
          interval: null
        })
     }
  }
  
  timer = () => {
    const interval = setInterval(this.capture, 1000)
    this.setState({interval: interval})
  }
  
  /* resets state to wipe photo and show webcam feed */
  retake = () => {
    clearInterval(this.state.interval)
    this.setState({
      webcamPhoto: "",
      webcamPreview: true,
      showCapture: false,
      countdown: 5
    })
  }
  
  /* closes capture modal and sends photo to editor tool */
  sendToEditor = () => {
    this.setState({open: false})
    this.props.sendToEditor(this.state.webcamPhoto)
  }
  
  render() {
    return(
      <div className="webcam-modal">
        <Modal
          closeIcon
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          open={this.state.open}
          basic
          trigger={<Button>Open Camera</Button> /* button in case user closes modal */}
        >
          <Modal.Header>Take A Pic</Modal.Header>
          
          {/* shows webcam preview and lets users take picture */}
          {this.state.webcamPreview ?
            <div className="live-preview">
              <Modal.Content>
                <Container textAlign="center">
                    {/* countdown mode */}
                    {this.state.interval ?
                      <Header inverted textAlign="center" as="h3">
                        <Header.Content>Taking picture in: {this.state.countdown}</Header.Content>
                      </Header>
                    : <Header inverted textAlign="center" as="h3" content="Say cheese!" /> }
                    
                    <div><Webcam
                      ref={this.setRef}
                      mirrored={this.state.webcamMirrored}
                      screenshotFormat="image/png"
                      screenshotQuality={1}
                      width={640}
                      forceScreenshotSourceSize={true}
                    /></div>
                    {/* shutter button */}
                    <Button circular={true} color="red" size="large" onClick={this.timer}>take pic</Button>
                    {/* toggle mirrored camera */}
                    <Button circular={true} size="large" onClick={() => this.setState({webcamMirrored: !this.state.webcamMirrored})}>
                      Mirror: {this.state.webcamMirrored ? "ON" : "OFF" }
                    </Button>
                </Container>
              </Modal.Content>
            </div>
          : null }
          
          {/* lets user verify captured photo before sending to editor */}
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