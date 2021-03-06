import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Button, Modal, Header } from 'semantic-ui-react'

import { format } from 'timeago.js'


function PhotoCard(props) {
  const [modalOpen, setModalOpen] = useState(false)
  
  const deletePhoto = () => {
    setModalOpen(false)
    props.deletePhoto(props.photo.id)
  }
  
  return(
    <Card color="blue">
      {/* shows photo, timestamp, and comment count button. comment count button opens display modal in Gallery */}
      <Image src={`${process.env.REACT_APP_BASE_URL}${props.photo.image_file}`} />
      <Card.Meta>
        {format(props.photo.created_at, { relativeDate: Date.now()})}
      </Card.Meta>
      <Card.Content extra>
      <Button onClick={() => props.openModal(props.photo)}>
        <Icon name='comments outline' />
        {props.photo.comments.length}
      </Button>
      
      {/* delete button only renders if user on display is the same as the user who is logged in */}
      {props.currentUserId === props.posterId ? 
      <Modal
        basic
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        size='small'
        trigger={<Button color='red' icon='trash alternate'/>}
      >
        <Header icon>
          <Icon name='trash alternate' />
          Do You Really Want To Delete This Beautiful Photo?
        </Header>
        <Modal.Actions>
          <Button color='red' inverted onClick={() => setModalOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => deletePhoto()}>
            <Icon name='checkmark' /> Hell Yeah
          </Button>
        </Modal.Actions>
      </Modal>
      : null }
      
    </Card.Content>
    </Card>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    currentUserId: state.userId,
    posterId: ownProps.posterId
  };
} 

export default connect(mapStateToProps)(PhotoCard)