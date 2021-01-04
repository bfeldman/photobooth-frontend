import React from 'react'
import { Header, Divider, Image, Segment } from 'semantic-ui-react'

import bpgrid from '../img/home/bp_grid.png'
import bpcam from '../img/home/bp_cam.png'
import bpgif from '../img/home/bp_gif.gif'

function Home() {
  return(
    <div style={{margin:"0 auto", width:"700px"}}>
      <Header
        style={{
          fontSize:"70px"
        }}
      >
        BOTO PHOOTH
      </Header>
          
          <Segment size="huge" color="teal" inverted style={{width:"500px", margin:"0 auto"}}>
            <Image src={bpgif} size="huge" style={{margin:"0 auto"}}/>
            <p>Boto Phooth is a web-based, kinda-fully-featured tool for taking, editing, and sharing webcam pictures.</p>
          </Segment>
          
          <Divider />
          
          <Segment size="huge" color="red" inverted style={{width:"500px", margin:"0 auto"}}>
            <Image src={bpgrid} size="medium" style={{margin:"0 auto"}}/>
            <p>Use the image editor to make your pic look really cool, then share it with your friends.</p>
          </Segment>
          
          <Divider />
          
          <Segment size="huge" color="blue" inverted style={{width:"500px", margin:"0 auto"}}>
            <Image src={bpcam} size="medium" style={{margin:"0 auto"}}/>
            <p>Head over to the studio to take a picture.</p>
          </Segment>

    </div>
  )
}

export default Home