import React from 'react'
import { connect } from 'react-redux'
import pgarray from 'pg-array'
import { Modal, Input, Button, Item, Checkbox } from 'semantic-ui-react'


class AlbumCreator extends React.Component {

  state = {
    selectedPhotos: [],
    albumName: "",
    modalOpen: false
  }
  
  
  renderPhotoOptions = () => {
    return this.props.userPhotos.map(photo =>
      <Item key={photo.id}>
        <Item.Image src={photo.base64_src} size="small" />
        <Checkbox
          onClick={() => this.togglePhoto(photo.id)}
        />
      </Item>
    )
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  togglePhoto = (photoId) => {
    if (this.state.selectedPhotos.includes(photoId)) {
      const filteredPhotos = this.state.selectedPhotos.filter(id => id !== photoId)
      this.setState({selectedPhotos: filteredPhotos})
    } else {
      this.setState({selectedPhotos: this.state.selectedPhotos.concat(photoId)})
    }
  }
  
  saveAlbum = () => {
    const newAlbum = {
      user_id: this.props.userId,
      name: this.state.albumName,
      photo_ids: pgarray(this.state.selectedPhotos)
    }
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/albums/`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newAlbum)
    })
    .then(response => response.json())
    .then(data => {
      this.props.dispatch({
        type: 'ADD_ALBUM',
        payload: {
          album: data.album
        }
      })
      this.setState({modalOpen: false})
    })
  }
  
  render() {
    return(
      <Modal
        onClose={() => this.setState({modalOpen: false})}
        onOpen={() => this.setState({modalOpen: true})}
        open={this.state.modalOpen}
        trigger={<Button color="blue">Create New Album</Button>}
      >
        
        <Modal.Content>
          
          <Input
            name="albumName"
            label="album name"
            value={this.state.albumName}
            onChange={this.handleChange}
          />
          
          <Button
            disabled={this.state.selectedPhotos.length === 0}
            color={this.state.selectedPhotos.length > 0 ? "blue" : "grey"}
            floated='right'
            onClick={this.saveAlbum}
          >
            Save Album
          </Button>
          
          <Item.Group divided>
            {this.renderPhotoOptions()}
          </Item.Group>
        
        </Modal.Content>
      
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    username: state.username,
    userPhotos: state.photos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCreator)