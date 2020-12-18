/* takes in the captured webcam image as a prop and loads it onto the canvas*/

import React from 'react'
import { Image } from "react-konva"
import useImage from 'use-image'

const Background = (props) => {
  const [image] = useImage(props.src)
  return <Image
    image={image}
    x={0}
    y={0}
  />
};


export default Background