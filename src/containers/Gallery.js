import React from 'react'

import PhotoCard from '../components/PhotoCard'
import { Card, Modal, Image } from 'semantic-ui-react'


class Gallery extends React.Component {
  
  state = {
    modalOpen: false,
    modalPhoto: {},
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
    const photoArray = this.state.user.photos.sort((a, b) => b.id - a.id)
    return photoArray.map(photo =>
      <PhotoCard
        photo={photo}
        key={photo.id}
        openModal={this.openModal}
      />)   
  }
  
  render() {
    return(
      <div className="gallery">
        <h1>{`${this.props.username}'s Pics`}</h1>
        <Card.Group itemsPerRow={3}>
          {this.renderPhotoCards()}
        </Card.Group>
        
        <Modal
          onClose={() => this.setState({modalOpen: false})}
          open={this.state.modalOpen}
        >
          <Modal.Content image>
          <Image size='large' src={this.state.modalPhoto.base64_src} wrapped />
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Gallery