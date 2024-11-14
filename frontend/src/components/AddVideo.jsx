import { useState } from 'react';
import '../styling/Create.css';

const AddVideo = ({ onClose, onSave }) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [videoUrl, setVideoUrl] = useState('');
  const [autoPlay, setAutoPlay] = useState(false);

  const handleAddVideo = () => {
    const newVideoElement = {
      type: 'video',
      position: { x: 0, y: 0 },
      size: { width: width, height: height },
      url: videoUrl,
      autoPlay: autoPlay,
      layer: 0,
    };
    onSave(newVideoElement);
    onClose();
  };

  return (
    <div>
      <button onClick={() => setWidth(560) && setHeight(315)}>Add Video</button>

      <div className="modalBackground">
        <div className="modalContent">
          <h2>Add Video Element</h2>
          <label>
            Video Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            Video Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min="0"
              max="100"
            />
          </label>
          <label>
            YouTube Video URL:
            Make sure this is an embed link!
            eg. https://www.youtube.com/embed/... 
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
            />
          </label>
          <label>
            Autoplay:
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(e) => setAutoPlay(e.target.checked)}
            />
          </label>
          <div className="modalActions">
            <button onClick={handleAddVideo}>Add Video</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;