import React from 'react'
import { connect } from 'react-redux'
import { Card, Modal, Image } from 'semantic-ui-react'


class Albums extends React.Component {
  
  state = {
    modalOpen: false,
    modalAlbum: null,
  }
  
  componentDidMount() {
  }
  
  renderAlbumCards = () => {
    const albumArray = this.props.userAlbums.sort((a, b) => b.id - a.id)
    return albumArray.map(album =>
      <div className="album">
        <h3>{album.name}</h3>
        <div>{album.photo_ids.map(photo_id => <p>Pic ID:{photo_id}</p>)}</div>
      </div>
    )   
  }
  
  render() {
    return(
      <>
      <h1>Your Albums</h1>
      
      <div className="album-cards">
        
        <Card.Group itemsPerRow={3}>
          {this.renderAlbumCards()}
        </Card.Group>
        
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userPhotos: state.photos,
    userAlbums: state.albums
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)