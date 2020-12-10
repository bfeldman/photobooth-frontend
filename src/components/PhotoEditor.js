import React from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import { triggerBase64Download } from 'react-base64-downloader';

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
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      this.setState({lines: lines})
    }
  }
  
  download = () => {
    const base64 = this.stageRef.getStage().toDataURL()
    triggerBase64Download(base64, 'photobooth_img')
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
      <div className="photo-editor">
        <button onClick={() => this.setState({brushEnabled: !this.state.brushEnabled})}>
        {this.state.brushEnabled ? "drawing!" : "not drawing"}
      </button>
      <button onClick={this.download}>DOWNLOAD</button>
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
              ref={node => {
                this.imageNode = node;
              }}
            />
          </Layer>
          
          <Layer>
            {lineComponents}
          </Layer>
        
        </Stage>
      </div>
    );
  }
}

export default PhotoEditor