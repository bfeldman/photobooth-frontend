import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Modal, Image, Comment, Message, Divider } from 'semantic-ui-react'
import { format } from 'timeago.js'


import PhotoCard from '../components/PhotoCard'
import UserComment from '../components/UserComment'
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
    },
    errorMessage: false
  }
  
  /* fetches photos based on username in path */
  componentDidMount() {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${this.props.soughtUser}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
        
      if (!data.error) {  
        if (data.user.is_public) {
          this.setState({user: data.user})
        } else if (this.props.soughtUser === this.props.loggedInUser.username) {
          this.setState({user: this.props.loggedInUser, pageIsPrivate: false})
        } else {
          this.setState({pageIsPrivate: true})
        }
      } else {
        this.setState({errorMessage: true})
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
    return this.state.modalPhoto.comments.map(comment => <UserComment key={comment.id} comment={comment} />)
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
      <div>
      <h1>{`${this.props.soughtUser}'s Pics`}</h1>
      
      {this.state.errorMessage ?
        <Message negative style={{width:"400px", margin:"0 auto"}}>
          <Message.Header>Whoops!</Message.Header>
          <p>We couldn't find this user!</p>
        </Message>
        : null }
      
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
            <Image size='large' src={`${process.env.REACT_APP_BASE_URL}${this.state.modalPhoto.image_file}`} wrapped />
            
            <Modal.Description className="comment-section">
            
            {this.state.modalPhoto.caption ?
              <Comment.Group>
                <Comment>
                  <Comment.Content>
                      <Comment.Author as={Link} to={`/gallery/${this.props.soughtUser}`}>
                      {this.props.soughtUser}
                    </Comment.Author>
                    
                    <Comment.Metadata>
                      {format(this.state.modalPhoto.created_at, { relativeDate: Date.now()})}
                    </Comment.Metadata>
                    <Comment.Text>
                      {this.state.modalPhoto.caption}
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            : null}
            
            <Divider horizontal>Comments</Divider>
            
            <Comment.Group>
              { this.renderComments() }
            </Comment.Group>
            
            <CommentForm photoId={this.state.modalPhoto.id} displayNewComment={this.displayNewComment}/>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
      }
      </div>
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