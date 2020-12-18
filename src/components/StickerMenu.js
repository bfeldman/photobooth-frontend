import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import Catherine from '../img/cath.png'

const options = [
  { key: 1, text: 'Catherine', value: Catherine, image: {src: Catherine} }
]

const StickerMenu = (props) => (
  <Dropdown
    placeholder="Select sticker..."
    clearable
    options={options}
    selection
    onChange={(e, {value}) => props.setSticker(value)}
  />
)

export default StickerMenu