/* renders the dropdown menus for each sticker option*/

import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import Catherine from '../img/cath.png'

/* sticker options array */
const options = [
  { key: 1, text: 'Catherine', value: Catherine, image: {src: Catherine} }
]

const StickerMenu = (props) => (
  <Dropdown
    placeholder="Select sticker..."
    clearable
    options={options}
    selection
    /* changes PhotoEditor sticker state to whatever's selected */
    onChange={(e, {value}) => props.setSticker(value)}
  />
)

export default StickerMenu