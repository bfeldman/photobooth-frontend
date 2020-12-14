import React from 'react'
import { Card, Modal, Image } from 'semantic-ui-react'

import PhotoCard from '../components/PhotoCard'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'


class Gallery extends React.Component {
  
  state = {
    modalOpen: false,
    modalPhoto: {
      comments: []
    },
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
  
  renderComments = () => {
    return this.state.modalPhoto.comments.map(comment => <Comment key={comment.id} comment={comment} />)
  }
  
  displayNewComment = (commentObj) => {
    const newModalPhoto = {...this.state.modalPhoto, comments: this.state.modalPhoto.comments.concat(commentObj)}
    let newPhotos = this.state.user.photos.filter(photo => photo.id !== newModalPhoto.id ).concat(newModalPhoto)
    this.setState({
      modalPhoto: newModalPhoto,
      user: {...this.state.user, photos: newPhotos}
    })
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
              { this.renderComments() }
            <CommentForm photoId={this.state.modalPhoto.id} displayNewComment={this.displayNewComment}/>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Gallery