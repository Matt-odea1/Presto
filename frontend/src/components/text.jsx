const Text = ({ content, width, height, fontSize, color, position, onClick }) => {
    const textStyle = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      left: `${position?.x}%`,
      top: `${position?.y}%`,
      fontSize: `${fontSize}px`,
      color: color,
      whiteSpace: 'pre-wrap',
      zIndex: 10,
      border: '1px solid grey',
      overflow: 'hidden',
    };
  
    return (
      <div style={textStyle} onClick={onClick}>
        {content}
      </div>
    );
  };
  
  export default Text;