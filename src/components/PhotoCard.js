import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Button, Modal, Header } from 'semantic-ui-react'


function PhotoCard(props) {
  const [modalOpen, setModalOpen] = useState(false)
  
  const deletePhoto = () => {
    setModalOpen(false)
    props.deletePhoto(props.photo.id)
  }
  
  return(
    <Card>
      <Image src={props.photo.base64_src} />
      <Card.Meta>
        {props.photo.created_at}
      </Card.Meta>
      <Card.Content extra>
      <Button onClick={() => props.openModal(props.photo)}>
        <Icon name='comments outline' />
        {props.photo.comments.length}
      </Button>
      
      {props.currentUserId === props.posterId ? 
      <Modal
        basic
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        size='small'
        trigger={<Button color='red'><Icon name='trash alternate'/></Button>}
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

function mapStateToProps(state) {
  return { currentUserId: state.userId };
} 

export default connect(mapStateToProps)(PhotoCard)