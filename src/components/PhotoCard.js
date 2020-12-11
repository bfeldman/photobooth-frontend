import React from 'react'

function PhotoCard(props) {
  return(
    <div className="photo-card">
      <img src={props.src} height="300" alt="cool dude" />
    </div>
  )
}

export default PhotoCard