/* controlled inputs that change the Impact-font text on the photo */

import React from 'react'
import { Input } from 'semantic-ui-react'

function TextInput(props) {
  return(
    <div>
      <Input
        placeholder="top text"
        onChange={(e, {value}) => props.setText("topText", value)}
        style={{paddingBottom: "5px"}}
      /><br />
      <Input
        placeholder="bottom text"
        onChange={(e, {value}) => props.setText("bottomText", value)}
      />
    </div>
  )
}

export default TextInput