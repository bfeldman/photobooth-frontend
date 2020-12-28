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
      <Card><Image
        src={photo.base64_src}
        key={photo.id}
        size="medium"
      /></Card>)
  }
  
  return(
    <Card onClick={openModal}>
      <Image src={coverPhoto.base64_src} />
      <Card.Content>
        {props.album.name}
      </Card.Content>
      
      <Modal
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        className="album-grid"
      >
        <h2>{props.album.name}</h2>
        <Card.Group itemsPerRow={3} divided={true}>
          {renderPhotoGrid()}
        </Card.Group>
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