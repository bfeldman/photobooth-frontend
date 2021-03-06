import React from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Grid, Rail, Segment, Icon, Input } from 'semantic-ui-react'

import { Stage, Layer, Line, Rect, Text } from "react-konva"
import { triggerBase64Download } from 'react-base64-downloader'

import Background from '../components/Background'
import TintMenu from '../components/TintMenu'
import StickerMenu from '../components/StickerMenu'
import Sticker from '../components/Sticker'
import TextInput from '../components/TextInput'
import BrushColorMenu from '../components/BrushColorMenu'



class PhotoEditor extends React.Component {
  
  state = {
    image: "",
    brush: {
      enabled: false,
      isDrawing: false,
      color: "red"
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
    caption: "",
    redirect: false
  }
  
  componentDidMount() {
  }
  
  /* determines behavior based on what tool is selected */
  handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition()
    /* brush capture */
    if (this.state.brush.enabled) {
      /* isDrawing enables movement capture */
      this.setState({brush: {...this.state.brush, isDrawing: true}})
      /* creates a new line being drawn with each mousedown */
      this.setState({lines: [...this.state.lines, { points: [pos.x, pos.y], color: this.state.brush.color }]})
    }
    if (this.state.sticker.enabled && this.state.sticker.image !== "") {
      this.setState({plantedStickers: [...this.state.plantedStickers, { points: [pos.x, pos.y], image: this.state.sticker.image }]})
    }
  }
  
  handleMouseUp = () => {
    /* makes sure drawing is no longer enabled */
    this.setState({brush: {...this.state.brush, isDrawing: false}})
  }
  
  handleMouseMove = (e) => {
    if (this.state.brush.enabled && this.state.brush.isDrawing) {
      /* gets x,y coordinates from Konva */
      const point = e.target.getStage().getPointerPosition();
      /* adds new points to most recent line in the state array */
      let lines = this.state.lines
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      this.setState({lines: lines})
    }
  }
  
  /* file download function */
  download = () => {
    const base64_img = this.stageRef.getStage().toDataURL()
    triggerBase64Download(base64_img, 'photobooth_img')
  }
  
  /* saves new photo to backend */
  saveToGallery = () => {
    const base64_src = this.stageRef.getStage().toDataURL().split(',')[1]
    const newPhoto = {
      user_id: this.props.userId,
      is_public: true,
      base64_src: base64_src,
      caption: this.state.caption
    }
    const token = localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/photos/`, {
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
      /* update redux state */
      this.props.dispatch({
        type: 'ADD_PHOTO',
        payload: {
          photo: data.photo
        }
      })
      /* render redirect that takes user to their gallery */
      this.setState({redirect: true})
    })
  }
  
  /* changes color selected for tint in state */
  setTint = (tintColor) => {
    this.setState({tint: tintColor})
  }

  /* changes sticker selected in state */
  setSticker = (sticker) => {
    this.setState({sticker: {...this.state.sticker, image: sticker}})
  }
  
  /* handles changes to both top and bottom text inputs */
  setText = (position, text) => {
    this.setState({[position]: text})
  }
  
  /* handle change to caption input */
  setCaption = (caption) => {
    this.setState({caption: caption})
  }
  
  /* changes brush color selected in state */
  setBrushColor = (brushColor) => {
    this.setState({brush: {...this.state.brush, color: brushColor}})
  }
  
  /* undo function */
  undoBrushLine = () => {
    const linesArray = this.state.lines
    linesArray.length = linesArray.length - 1
    this.setState({lines: linesArray})
  }
  
  /* disables tool if the other is enabled, handles disabling of both */
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
    /* renders line components from state */
    const lineComponents = this.state.lines.map((line, idx) => {
      return <Line
        key={idx}
        points={line.points}
        stroke={line.color}
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
      />
    })
    
    /* renders stickers from state */
    const stickerComponents = this.state.plantedStickers.map((sticker, idx) => {
      return <Sticker key={idx} sticker={sticker} />
    })
        
    return (      
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            
            {/* TOOLBAR */}
              <Rail internal position='right' style={{paddingTop:"15px"}}>
                <Segment.Group raised>
                  <Segment color='red'>
                    <TintMenu setTint={this.setTint} />
                  </Segment>
                  
                  <Segment color='blue'>
                    <TextInput setText={this.setText} />
                  </Segment>
                  
                  <Segment color='orange'>
                    <StickerMenu setSticker={this.setSticker} /><br />
                    <Button
                      onClick={() => this.toolToggle("sticker")}
                      color={this.state.sticker.enabled ? "green" : null}
                      style={{marginTop: "5px"}}
                    >
                      STICKER TOOL: {this.state.sticker.enabled ? "ENABLED" : "DISABLED"}
                    </Button>
                  </Segment>
                
                  <Segment color='green'>
                    <BrushColorMenu setBrushColor={this.setBrushColor} />
                    <Button
                      onClick={() => this.toolToggle("brush")}
                      color={this.state.brush.enabled ? "green" : null}
                      style={{marginTop: "5px"}}
                    >
                      PAINTBRUSH: {this.state.brush.enabled ? "ENABLED" : "DISABLED"}
                    </Button>
                    {/* undo button */}
                    <Button
                      onClick={this.undoBrushLine}
                      label="Undo"
                      icon="undo"
                      style={{marginTop: "5px"}}
                    />
                  </Segment>
                  
                  <Segment color="black">
                    <Input
                      placeholder="caption"
                      onChange={(e, {value}) => this.setCaption(value)}
                    />
                  </Segment>
                </Segment.Group>
              </Rail>
      
      {/* CANVAS AREA */}
          <Segment style={{width:"670px", marginLeft: "30px"}} raised>
            <Stage
              ref={node => { this.stageRef = node}}
              width={640} 
              height={480}
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
            >
              
              <Layer>
                {/* WEBCAM CAPTURE */}
                <Background src={this.props.src} />
                {/* TINT */}
                <Rect
                  x={0}
                  y={0}
                  width={640} 
                  height={480}
                  fill={this.state.tint}
                  opacity={0.2}
                />
              </Layer>
              
              {/* STICKERS */}
              <Layer>
                {stickerComponents}
              </Layer>
              
              {/* MEME TEXT */}
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
              
              {/* DOODLE LINES */}
              <Layer>
                {lineComponents}
              </Layer>
              
            </Stage>
          </Segment>
          </Grid.Column>
        </Grid.Row>
        
        {/* FILE ACTIONS */}
        <Grid.Row>
          <Grid.Column>
            <Button onClick={this.download} icon labelPosition="left" color="black">
              <Icon name='download' />
              DOWNLOAD
            </Button>
          </Grid.Column>
          {this.props.loggedIn ?
            <Grid.Column>
              <Button onClick={this.saveToGallery} color="green" icon labelPosition="left">
                <Icon name='save' />
                SAVE TO GALLERY
              </Button>
            </Grid.Column>
          : null}
          <Grid.Column>
            <Button onClick={this.props.retakePhoto} icon labelPosition="left" color="black">
              <Icon name='camera' />
              RETAKE PICTURE
            </Button>
          </Grid.Column>
        </Grid.Row>
        {this.state.redirect ? <Redirect to={`/gallery/${this.props.username}`} /> : null }
        </Grid>
        
        
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    username: state.username,
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoEditor)