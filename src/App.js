import React from 'react'
import WebcamModal from './components/WebcamModal'
import PhotoEditor from './components/PhotoEditor'
import './App.css'

class App extends React.Component {
  
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
      <div className="App">
        {this.state.webcamModalVisible ? <WebcamModal setPhotoToEdit={this.setPhotoToEdit} /> : null}
        {this.state.photoEditorVisible ? <PhotoEditor src={this.state.webcamPhoto}/> : null}
      </div>
    )
  }
}

export default App;
