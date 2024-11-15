const Image = ({ src, width, height, position, altTag, layer, onClick }) => {
  const imageStyle = {
    position: "absolute",
    width: `${width}%`,
    height: `${height}%`,
    left: `${position?.x}%`,
    top: `${position?.y}%`,
    objectFit: "cover",
    zIndex: layer+10,
    border: "1px solid grey",
  };

  return <img src={src} alt={altTag} style={imageStyle} onClick={onClick} />;
};

export default Image;
