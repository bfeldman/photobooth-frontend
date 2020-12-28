import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import AlbumCard from '../components/AlbumCard'


class Albums extends React.Component {
  
  renderAlbumCards = () => {
    const albumArray = this.props.userAlbums.sort((a, b) => b.id - a.id)
    return albumArray.map(album => {
      return <AlbumCard key={album.id} album={album} />
    })   
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
    userAlbums: state.albums
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)