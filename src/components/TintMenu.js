import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 1, text: 'Red', value: 'red' },
  { key: 2, text: 'Blue', value: 'blue' },
  { key: 3, text: 'Green', value: 'green' },
  { key: 4, text: 'Purple', value: 'purple' },
  { key: 5, text: 'Aquamarine', value: 'aquamarine' }
]

const TintMenu = (props) => (
  <Dropdown
    placeholder="Select tint..."
    clearable
    options={options}
    selection
    onChange={(e, {value}) => props.setTint(value)}
  />
)

export default TintMenu