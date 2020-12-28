import React from 'react'
import { connect } from 'react-redux'
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
    pageIsPrivate: false,
    user: {
      userId: null,
      username: "",
      photos: []
    }
  }
  
  /* fetches photos based on username in path */
  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.soughtUser}`)
    .then(response => response.json())
    .then((data) => {
      if (data.user.is_public) {
        this.setState({user: data.user})
      } else if (this.props.soughtUser === this.props.loggedInUser.username) {
        this.setState({user: this.props.loggedInUser, pageIsPrivate: false})
      } else {
        this.setState({pageIsPrivate: true})
      }  
    })
  }
  
  /* opens photo modal */
  openModal = (photo) => {
    this.setState({
      modalPhoto: photo,
      modalOpen: true
    })
  }
  
  /* renders a photocard for each one in the array, sorting in reverse chron first */
  renderPhotoCards = () => {
    const photoArray = this.state.user.photos.sort((a, b) => b.id - a.id)
    return photoArray.map(photo =>
      <PhotoCard
        photo={photo}
        posterId={this.state.user.id}
        key={photo.id}
        openModal={this.openModal}
        deletePhoto={this.deletePhoto}
      />)   
  }
  
  /* renders comments for whatever photo is displayed in the modal */
  renderComments = () => {
    return this.state.modalPhoto.comments.map(comment => <Comment key={comment.id} comment={comment} />)
  }
  
  /* adds new comment to to state so it can render and update comment count without reload */
  displayNewComment = (commentObj) => {
    const newModalPhoto = {...this.state.modalPhoto, comments: this.state.modalPhoto.comments.concat(commentObj)}
    let newPhotos = this.state.user.photos.filter(photo => photo.id !== newModalPhoto.id ).concat(newModalPhoto)
    this.setState({
      modalPhoto: newModalPhoto,
      user: {...this.state.user, photos: newPhotos}
    })
  }
  
  /* filters, makes fetch call and then updates state with filtered photo array */
  deletePhoto = (photoId) => {
    const updatedPhotos = this.state.user.photos.filter(photo => photo.id !== photoId)
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/api/v1/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ user: {...this.state.user, photos: updatedPhotos} })
      this.props.dispatch({
        type: 'DELETE_PHOTO',
        payload: {
          photoId: photoId
        }
      })
    })
  }
  
  render() {
    return(
      <>
      <h1>{`${this.props.soughtUser}'s Pics`}</h1>
      {this.state.pageIsPrivate ?
        <p>This user is private</p>
      
      :
      
      <div className="gallery">
        <Card.Group itemsPerRow={3}>
          {this.renderPhotoCards()}
        </Card.Group>
        
        <Modal
          onClose={() => this.setState({modalOpen: false})}
          open={this.state.modalOpen}
        >
          <Modal.Content image>
            <Image size='large' src={this.state.modalPhoto.base64_src} wrapped />
            
            <Modal.Description>
            { this.renderComments() }
            <CommentForm photoId={this.state.modalPhoto.id} displayNewComment={this.displayNewComment}/>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
      }
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: state,
    soughtUser: ownProps.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)