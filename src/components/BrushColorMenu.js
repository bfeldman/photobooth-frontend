/* renders the dropdown menus for each tint option*/

import React from 'react'
import { Dropdown } from 'semantic-ui-react'

/* tint options array */
const options = [
  { key: 1, text: 'Red', value: 'red' },
  { key: 2, text: 'Blue', value: 'blue' },
  { key: 3, text: 'Green', value: 'green' },
  { key: 4, text: 'Purple', value: 'purple' },
  { key: 5, text: 'Aquamarine', value: 'aquamarine' }
]

const BrushColorMenu = (props) => (
  <Dropdown
    placeholder="Select brush color..."
    options={options}
    selection
    defaultValue="red"
    /* changes PhotoEditor tint state to whatever's selected */
    onChange={(e, {value}) => props.setBrushColor(value)}
  />
)

export default BrushColorMenu