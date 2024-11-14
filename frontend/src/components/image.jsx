const Image = ({ src, width, height, position, altTag, onClick }) => {
    const imageStyle = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      left: `${position?.x}%`,
      top: `${position?.y}%`,
      objectFit: 'cover',
      zIndex: 10,
      border: '1px solid grey',
    };
  
    return (
      <img 
        src={src} 
        alt={altTag} 
        style={imageStyle} 
        onClick={onClick} 
      />
    );
  };
  
  export default Image;