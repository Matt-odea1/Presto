const Video = ({ url, width, height, position, autoPlay, onClick }) => {
    const videoStyle = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      left: `${position?.x}%`,
      top: `${position?.y}%`,
      zIndex: 10,
      border: '1px solid grey',
    };
  
    return (
      <iframe
        src={`${url}${autoPlay ? '&autoplay=1' : ''}`}
        width={width}
        height={height}
        style={videoStyle}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onClick={onClick}
        title="Embedded Video"
      ></iframe>
    );
  };
  
  export default Video;