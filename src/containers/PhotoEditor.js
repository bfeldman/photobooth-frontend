import React from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Stage, Layer, Line, Rect, Text } from "react-konva"
import { triggerBase64Download } from 'react-base64-downloader'
import { Container, Button, Grid } from 'semantic-ui-react'

import Background from '../components/Background'
import TintMenu from '../components/TintMenu'
import StickerMenu from '../components/StickerMenu'
import Sticker from '../components/Sticker'
import TextInput from '../components/TextInput'



class PhotoEditor extends React.Component {
  
  state = {
    image: "",
    brush: {
      enabled: false,
      isDrawing: false
    },
    lines: [],
    tint: "",
    sticker: {
      image: "",
      enabled: false
    },
    plantedStickers: [],
    topText: "",
    bottomText: "",
    redirect: false
  }
  
  componentDidMount() {
    this.setState({topText: "top text", bottomText: "bottom text"})
  }
  
  handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition()
    if (this.state.brush.enabled) {
      this.setState({brush: {...this.state.brush, isDrawing: true}})
      this.setState({lines: [...this.state.lines, { points: [pos.x, pos.y] }]})
    }
    if (this.state.sticker.enabled && this.state.sticker.image !== "") {
      this.setState({plantedStickers: [...this.state.plantedStickers, { points: [pos.x, pos.y], image: this.state.sticker.image }]})
    }
  }
  
  handleMouseUp = () => {
    this.setState({brush: {...this.state.brush, isDrawing: false}})
  }
  
  handleMouseMove = (e) => {
    if (this.state.brush.enabled && this.state.brush.isDrawing) {
      const point = e.target.getStage().getPointerPosition();
      let lines = this.state.lines
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      this.setState({lines: lines})
    }
  }
  
  download = () => {
    const base64_img = this.stageRef.getStage().toDataURL()
    triggerBase64Download(base64_img, 'photobooth_img')
  }
  
  saveToGallery = () => {
    const base64_img = this.stageRef.getStage().toDataURL()
    const newPhoto = {
      user_id: this.props.userId,
      is_public: true,
      base64_src: base64_img
    }    
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/photos/`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newPhoto)
    })
    .then(response => response.json())
    .then(data => {
      this.props.dispatch({
        type: 'ADD_PHOTO',
        payload: {
          photo: data.photo
        }
      })
      this.setState({redirect: true})
    })
  }
  
  setTint = (tintColor) => {
    this.setState({tint: tintColor})
  }

  setSticker = (sticker) => {
    this.setState({sticker: {...this.state.sticker, image: sticker}})
  }
  
  setText = (position, text) => {
    this.setState({[position]: text})
  }
  
  toolToggle = (tool) => {
    if (tool === "sticker") {
      this.setState({
        sticker: {...this.state.sticker, enabled: !this.state.sticker.enabled},
        brush: {...this.state.brush, enabled: false}
        })
    } else if (tool === "brush") {
      this.setState({
        brush: {...this.state.brush, enabled: !this.state.brush.enabled},
        sticker: {...this.state.sticker, enabled: false}
        })
    }
  }

  render() {
    const lineComponents = this.state.lines.map((line, idx) => {
      return <Line
        key={idx}
        points={line.points}
        stroke="#df4b26"
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
      />
    })
    
    const stickerComponents = this.state.plantedStickers.map((sticker, idx) => {
      return <Sticker key={idx} sticker={sticker} />
    })
        
    return (
      <Container className="photo-editor">
      
      {/* TOOLBAR */}
        <Grid columns='equal' relaxed="very" container={true} centered={true} divided={true}>
          <Grid.Row>
            <Grid.Column>
              <TintMenu setTint={this.setTint} />
            </Grid.Column>
            <Grid.Column>
              <TextInput setText={this.setText} />
            </Grid.Column>
          </Grid.Row>
          
          <Grid.Row>
            <Grid.Column>
              <StickerMenu setSticker={this.setSticker} /><br />
              <Button
                onClick={() => this.toolToggle("sticker")}
              >
                STICKER TOOL: {this.state.sticker.enabled ? "ENABLED" : "DISABLED"}
                </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                onClick={() => this.toolToggle("brush")} >
                PAINTBRUSH: {this.state.brush.enabled ? "ENABLED" : "DISABLED"}
            </Button>
            </Grid.Column>
          </Grid.Row>
      
      
      {/* CANVAS AREA */}
        <Grid.Row>
          <Grid.Column>
            <Stage
              ref={node => { this.stageRef = node}}
              width={640} 
              height={480}
    
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
            >
              
              <Layer>
                
                <Background src={this.props.src} />
                {/* tint */}
                <Rect
                  x={0}
                  y={0}
                  width={640} 
                  height={480}
                  fill={this.state.tint}
                  opacity={0.2}
                />
              </Layer>
              
              <Layer>
                {stickerComponents}
              </Layer>
              
              <Layer>
                <Text
                  text={this.state.topText}
                  fontFamily="Impact"
                  fontSize={70}
                  stroke='black'
                  strokeWidth={3}
                  fill="white"
                  align="center"
                  x={240}
                  y={30}
                  draggable
                />
                <Text
                  text={this.state.bottomText}
                  fontFamily="Impact"
                  fontSize={70}
                  stroke='black'
                  strokeWidth={3}
                  fill="white"
                  align="center"
                  x={180}
                  y={380}
                  draggable
                />
              </Layer>
              
              <Layer>
                {lineComponents}
              </Layer>
              
            </Stage>
          </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
          <Grid.Column>
            <Button onClick={this.download}>DOWNLOAD</Button>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={this.saveToGallery}>SAVE TO GALLERY</Button>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={this.props.retakePhoto}>RETAKE PICTURE</Button>
          </Grid.Column>
        </Grid.Row>
        
        </Grid>
        
        {this.state.redirect ? <Redirect to={`/gallery/${this.props.username}`} /> : null }

      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    username: state.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoEditor)