import React from 'react'
import { Card } from 'semantic-ui-react'


function PhotoCard(props) {
  return(
    <Card
      image={props.src}
    />
  )
}

export default PhotoCard