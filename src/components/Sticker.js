import React from 'react'
import { Image } from "react-konva"
import useImage from 'use-image'

const Sticker = (props) => {
  const [image] = useImage(props.sticker.image)
  return <Image
    image={image}
    x={props.sticker.points[0]}
    y={props.sticker.points[1]}
    draggable
  />
};


export default Sticker