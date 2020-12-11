import React from 'react'
import WebcamModal from '../components/WebcamModal'
import PhotoEditor from '../components/PhotoEditor'

class Studio extends React.Component {
  
  state = {
    webcamModalVisible: true,
    webcamPhoto: "",
    photoEditorVisible: false
  }
  
  setPhotoToEdit = (photo) => {
    this.setState({
      webcamPhoto: photo,
      webcamModalVisible: false,
      photoEditorVisible: true
    })
  }
  
  render() {
    return (
      <div className="Studio">
        {this.state.webcamModalVisible ? <WebcamModal setPhotoToEdit={this.setPhotoToEdit} /> : null}
        {this.state.photoEditorVisible ? <PhotoEditor src={this.state.webcamPhoto} user={this.props.user}/> : null}
      </div>
    )
  }
}

export default Studio