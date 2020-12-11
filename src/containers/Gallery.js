import React, { useState, useEffect } from 'react'
import PhotoCard from '../components/PhotoCard'

function Gallery(props) {
  const [user, setUser] = useState(null)
  
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => response.json())
      .then(data => {
        setUser(data.user)
      })
    } else {
      this.props.history.push("/login")
    }
  }, [])
  
  let photos
  let photoCards
  if (user !== null) {
    photos = user.photos
    photoCards = photos.map(photo => <PhotoCard src={photo.base64_src} key={photo.id} />)
  }
  
  
  return(
    <div className="gallery">
      <h1>GALLERY</h1>
      {photoCards}
    </div>
  )
}

export default Gallery