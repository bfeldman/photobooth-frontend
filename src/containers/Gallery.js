import React from 'react'
import { connect } from 'react-redux'

import PhotoCard from '../components/PhotoCard'
import { Card, Modal, Image } from 'semantic-ui-react'


class Gallery extends React.Component {
  state = {
    modalOpen: false,
    modalPhoto: null
  }
  
  componentDidMount() {
    
  }
  
  openModal = (photo) => {
    this.setState({
      modalPhoto: photo,
      modalOpen: true
    })
  }
  
  render() {
    const photoCards = this.props.photos.reverse().map(photo =>
    <PhotoCard 
      src={photo.base64_src}
      key={photo.id}
      onClick={() => this.openModal(photo)}
    />)    
    
    return(
      <div className="gallery">
        <h1>GALLERY</h1>
        <Card.Group itemsPerRow={2}>
          {photoCards}
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

const mapStateToProps = state => {
  return { photos: state.photos }
}

export default connect(mapStateToProps)(Gallery)