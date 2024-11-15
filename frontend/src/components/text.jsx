const Text = ({
  content,
  width,
  height,
  fontSize,
  color,
  position,
  fontFamily = 'monospace',
  layer = 0,
  onClick,
}) => {
  const textStyle = {
    position: "absolute",
    width: `${width}%`,
    height: `${height}%`,
    left: `${position?.x}%`,
    top: `${position?.y}%`,
    fontSize: `${fontSize}em`,
    color: color,
    fontFamily: fontFamily,
    whiteSpace: "pre-wrap",
    zIndex: layer+10,
    border: "1px solid grey",
    overflow: "hidden",
  };

  return (
    <div style={textStyle} onClick={onClick}>
      {content}
    </div>
  );
};

export default Text;