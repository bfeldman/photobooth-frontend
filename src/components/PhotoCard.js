import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'


function PhotoCard(props) {
  return(
    <Card>
      <Image src={props.photo.base64_src} />
      <Card.Meta>
        {props.photo.created_at}
      </Card.Meta>
      <Card.Content extra>
      <a onClick={() => props.openModal(props.photo)}>
        <Icon name='comments outline' />
        {props.photo.comments.length} Comments
      </a>
    </Card.Content>
    </Card>
  )
}

export default PhotoCard