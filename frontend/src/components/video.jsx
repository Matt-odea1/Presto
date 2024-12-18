const Video = ({ url, width, height, position, autoPlay, layer, onClick }) => {
  const containerStyle = {
    position: "absolute",
    width: `${width}%`,
    height: `${height}%`,
    left: `${position?.x}%`,
    top: `${position?.y}%`,
    zIndex: layer+10,
    border: "3px solid black", // Clickable border
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const videoStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div style={containerStyle} onClick={onClick}>
      <iframe
        src={`${url}${autoPlay ? "&autoplay=1" : ""}`}
        style={videoStyle}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Embedded Video"
      ></iframe>
    </div>
  );
};

export default Video;
