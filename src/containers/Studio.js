import React from 'react'
import WebcamModal from '../components/WebcamModal'
import PhotoEditor from './PhotoEditor'


class Studio extends React.Component {
  
  state = {
    webcamPhoto: "",
    photoEditorVisible: false
  }
  
  enablePhotoEditor = (photo) => {
    this.setState({
      webcamPhoto: photo,
      photoEditorVisible: true
    })
  }
  
  retakePhoto = () => {
    this.setState({photoEditorVisible: false})
  }
  
  closeWebcamPreview = () => {
    this.setState({photoEditorVisible: true})
  }
  
  /* renders webcam feed or photo editor tool based on user inputs and whether or not they've captured a photo */
  render() {
    return (
      <div className="Studio">
        {this.state.photoEditorVisible ? null : <WebcamModal sendToEditor={this.enablePhotoEditor} />}
        {this.state.photoEditorVisible ? <PhotoEditor src={this.state.webcamPhoto} retakePhoto={this.retakePhoto}/> : null}
      </div>
    )
  }
}

export default Studio