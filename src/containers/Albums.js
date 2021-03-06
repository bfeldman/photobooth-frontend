import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import AlbumCard from '../components/AlbumCard'
import AlbumCreator from '../components/AlbumCreator'


class Albums extends React.Component {
  
  renderAlbumCards = () => {
    const albumArray = this.props.userAlbums.sort((a, b) => b.id - a.id)
    return albumArray.map(album => {
      return <AlbumCard key={album.id} album={album} />
    })   
  }
  
  render() {
    return(
      <div>
        <h1>Your Albums</h1>
        <AlbumCreator />
        <div className="album-cards">
          {this.props.userAlbums.length > 0 ?
            <Card.Group itemsPerRow={3}>
              {this.renderAlbumCards()}
            </Card.Group>
          : <p>No albums yet!</p>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userAlbums: state.albums
  }
}

export default connect(mapStateToProps)(Albums)