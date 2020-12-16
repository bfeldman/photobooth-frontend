import React from 'react'
import { Input } from 'semantic-ui-react'

function TextInput(props) {
  
  return(
    <div>
      <Input
        placeholder="top text"
        onChange={(e, {value}) => props.setText("topText", value)}
      />
      <Input
        placeholder="bottom text"
        onChange={(e, {value}) => props.setText("bottomText", value)}
      />
    </div>
  )
}

export default TextInput