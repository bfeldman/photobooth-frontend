import React from 'react'
import WebcamModal from '../components/WebcamModal'
import PhotoEditor from '../components/PhotoEditor'
import { Button, Header, Modal, Image } from 'semantic-ui-react'


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
  
  render() {
    return (
      <div className="Studio">
        {this.state.photoEditorVisible ? null : <WebcamModal sendToEditor={this.enablePhotoEditor} />}
        {this.state.photoEditorVisible ? <PhotoEditor src={this.state.webcamPhoto} user={this.props.user} retakePhoto={this.retakePhoto}/> : null}
      </div>
    )
  }
}

export default Studio