/* renders the dropdown menus for each tint option*/

import React from 'react'
import { Dropdown } from 'semantic-ui-react'

/* tint options array */
const options = [
  { key: 1, text: 'Red', value: 'red' },
  { key: 2, text: 'Orange', value: 'orange' },
  { key: 3, text: 'Yellow', value: 'yellow' },
  { key: 4, text: 'Green', value: 'green' },
  { key: 5, text: 'Blue', value: 'blue' },
  { key: 6, text: 'Purple', value: 'purple' },
  { key: 7, text: 'Aquamarine', value: 'aquamarine' }
]

const TintMenu = (props) => (
  <Dropdown
    placeholder="Select tint..."
    clearable
    options={options}
    selection
    /* changes PhotoEditor tint state to whatever's selected */
    onChange={(e, {value}) => props.setTint(value)}
  />
)

export default TintMenu