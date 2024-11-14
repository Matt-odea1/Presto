const Text = ({ content, width, height, fontSize, color, position }) => {
    const textStyle = {
      position: 'absolute', 
      width: `${width}px`,
      height: `${height}px`,
      left: `${position?.x}px`,
      top: `${position?.y}px`,
      fontSize: `${fontSize}px`,
      color: color,
      whiteSpace: 'pre-wrap',
      zIndex: 10,
      border: '1px solid grey',
      overflow: 'hidden',
    };
  
    return <div style={textStyle}>{content}</div>;
  };
  
  export default Text;