/* renders the dropdown menus for each sticker option*/

import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import Catherine from '../img/cath.png'
import CryLaughing from '../img/cry-laughing.png'
import Smiley from '../img/smiley.png'
import Sparkles from '../img/sparkles.png'
import Spiderman from '../img/spiderman.png'

/* sticker options array */
const options = [
  { key: 1, text: 'Catherine', value: Catherine, image: {src: Catherine} },
  { key: 2, text: 'Cry-laughing', value: CryLaughing, image: {src: CryLaughing} },
  { key: 3, text: 'Smiley', value: Smiley, image: {src: Smiley} },
  { key: 4, text: 'Sparkles', value: Sparkles, image: {src: Sparkles} },
  { key: 5, text: 'Spider-man', value: Spiderman, image: {src: Spiderman} }
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