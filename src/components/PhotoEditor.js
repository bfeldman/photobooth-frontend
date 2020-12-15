import React from "react";
import { connect } from 'react-redux'
import { Stage, Layer, Image, Line } from "react-konva";
import { triggerBase64Download } from 'react-base64-downloader';
import { Container, Button } from 'semantic-ui-react'


class PhotoEditor extends React.Component {
  
  state = {
    image: "",
    isDrawing: false,
    brushEnabled: false,
    lines: []
  }
  
  componentDidMount() {
    this.loadImage();
  }
  
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  
  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  
  handleLoad = () => {
    this.setState({
      image: this.image
    });
  };
  
  handleMouseDown = (e) => {
    this.setState({isDrawing: true})
    const pos = e.target.getStage().getPointerPosition()
    if (this.state.brushEnabled) {
    this.setState({lines: [...this.state.lines, { points: [pos.x, pos.y] }]})
    }
  }
  
  handleMouseUp = () => {
    this.setState({isDrawing: false})
  }
  
  handleMouseMove = (e) => {
    if (!this.state.isDrawing) {
      return;
    }
    if (this.state.brushEnabled) {
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
    console.log(this.props.userId)
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
    
    return (
      <Container className="photo-editor">
      
      <div className="toolbar">
        <Button onClick={() => this.setState({brushEnabled: !this.state.brushEnabled})}>
          {this.state.brushEnabled ? "drawing!" : "not drawing"}
        </Button>
        <Button onClick={this.download}>DOWNLOAD</Button>
        <Button onClick={this.saveToGallery}>SAVE TO GALLERY</Button>
        <Button onClick={this.props.retakePhoto}>RETAKE PICTURE</Button>
      </div>
      
        <Stage
          ref={node => { this.stageRef = node}}
          width={this.state.image.width} 
          height={this.state.image.height}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          <Layer>
            <Image
              image={this.state.image}
              ref={node => {this.imageNode = node;}}
            />
          </Layer>
          
          <Layer>
            {lineComponents}
          </Layer>
        
        </Stage>
      </Container>
    );
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