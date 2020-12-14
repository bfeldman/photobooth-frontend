import React from 'react'

import PhotoCard from '../components/PhotoCard'
import { Card, Modal, Image } from 'semantic-ui-react'


class Gallery extends React.Component {
  
  state = {
    modalOpen: false,
    modalPhoto: null,
    user: {
      id: null,
      username: "",
      photos: []
    }
  }
  
  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.username}`)
    .then(response => response.json())
    .then(data => {
      console.log("FETCHED USER:", data.user)
      this.setState({user: data.user})
    })
  }
  
  openModal = (photo) => {
    this.setState({
      modalPhoto: photo,
      modalOpen: true
    })
  }
  
  renderPhotoCards = () => {
    return this.state.user.photos.map(photo =>
      <PhotoCard 
        src={photo.base64_src}
        key={photo.id}
        onClick={() => this.openModal(photo)}
      />)   
  }
  
  render() {
    console.log("STATE", this.state)
    return(
      <div className="gallery">
        <h1>{`${this.state.user.username}'s Pics`}</h1>
        <Card.Group itemsPerRow={3}>
          {this.renderPhotoCards()}
        </Card.Group>
        
        <Modal
          onClose={() => this.setState({modalOpen: false})}
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