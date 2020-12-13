import React from 'react'
import PhotoCard from '../components/PhotoCard'
import { Card, Modal, Image } from 'semantic-ui-react'


class Gallery extends React.Component {
  state = {
    user: null,
    modalOpen: false,
    modalPhoto: null
  }
  
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.json())
      .then(data => {
        this.setState({user: data.user})
      })
    } else {
      this.props.history.push("/login")
    }
  }
  
  openModal = (photo) => {
    this.setState({
      modalPhoto: photo,
      modalOpen: true
    })
  }
  
  render() {
    
    let photoCards = []
    if (this.state.user !== null) {
      const photos = this.state.user.photos
      photoCards = photos.map(photo =>
        <PhotoCard 
          src={photo.base64_src}
          key={photo.id}
          onClick={() => this.openModal(photo)}
        />)
    }
    
    return(
      <div className="gallery">
        <h1>GALLERY</h1>
        <Card.Group itemsPerRow={2}>
          {photoCards}
        </Card.Group>
        
        <Modal
          onClose={() => this.setState({modalOpen: false})}
          onOpen={() => this.setState({modalOpen: true})}
          open={this.state.modalOpen}
        >
          <Modal.Content image>
          <Image size='large' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Gallery