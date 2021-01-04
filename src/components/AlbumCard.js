import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Modal } from 'semantic-ui-react'


function AlbumCard(props) {
  const [modalOpen, setModalOpen] = useState(false)
  
  const coverPhoto = props.userPhotos.find(photo => photo.id === props.album.photo_ids[0])
  
  const openModal = () => {
    setModalOpen(true)
  }
  
  const renderPhotoGrid = () => {
    const photoData = props.userPhotos.filter(photo => props.album.photo_ids.includes(photo.id))
    return photoData.map(photo =>
      <Card key={photo.id}><Image
        src={`${process.env.REACT_APP_BASE_URL}${photo.image_file}`}
        size="medium"
      /></Card>)
  }
  
  return(
    <Card onClick={openModal} color="blue">
      <Image src={`${process.env.REACT_APP_BASE_URL}${coverPhoto.image_file}`} />
      <Card.Content>
        <Card.Header content={props.album.name} />
      </Card.Content>
      
      <Modal
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        className="album-grid"
      >
        <Modal.Content>
          <h2>{props.album.name}</h2>
          <Card.Group itemsPerRow={3}>
            {renderPhotoGrid()}
          </Card.Group>
        </Modal.Content>
      </Modal>
      
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userPhotos: state.photos
  }
}

export default connect(mapStateToProps)(AlbumCard)