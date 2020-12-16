import React from "react";
import { connect } from 'react-redux'
import { Stage, Layer, Image, Line, Rect, Text } from "react-konva"
import { triggerBase64Download } from 'react-base64-downloader'
import { Container, Button } from 'semantic-ui-react'

import TintMenu from './TintMenu'
import StickerMenu from './StickerMenu'
import Sticker from './Sticker'
import TextInput from './TextInput'



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
    bottomText: ""
  }
  
  componentDidMount() {
    this.loadImage()
    this.setState({topText: "top text", bottomText: "bottom text"})
  }
  
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  
  componentWillUnmount() {
    this.image.removeEventListener('load', this.loadImage);
  }
  
  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', () => {
      this.setState({
        image: this.image
      })
    })
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
      <div className="toolbar">
        <TintMenu setTint={this.setTint} />
        <StickerMenu setSticker={this.setSticker} />
        <Button onClick={ () => this.setState({ sticker: {...this.state.sticker, enabled: !this.state.sticker.enabled} }) }>
          {this.state.sticker.enabled ? "stickers!" : "no stickers :("}
        </Button>
        <Button onClick={ () => this.setState({ brush: {...this.state.brush, enabled: !this.state.brush.enabled} }) } >
          {this.state.brush.enabled ? "drawing!" : "not drawing"}
        </Button>
        <TextInput setText={this.setText} />
      </div>
      
      
      {/* CANVAS AREA */}
        <Stage
          ref={node => { this.stageRef = node}}
          width={640} 
          height={480}

          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          
          <Layer>
            <Image
              image={this.state.image}
              ref={node => {this.imageNode = node;}}
            />
            {/* tint */}
            <Rect
              x={0}
              y={0}
              width={this.state.image.width} 
              height={this.state.image.height}
              fill={this.state.tint}
              opacity={0.25}
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
        
        <div className="editor-footer">
          <Button onClick={this.download}>DOWNLOAD</Button>
          <Button onClick={this.saveToGallery}>SAVE TO GALLERY</Button>
          <Button onClick={this.props.retakePhoto}>RETAKE PICTURE</Button>
        </div>
        
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return { userId: state.userId }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoEditor)