import '../styling/slide-sidebar.css';
import PlusIcon from '../assets/plus.svg';

const Sidebar = ({ slides, activeSlideIndex, setActiveSlide, addNewSlide }) => {
  return (
    <div className="sidebar">
      {/* Slide Previews */}
      <div className="slide-previews">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`slide-preview ${activeSlideIndex === index ? 'active' : ''}`}
          >
            <p className="slide-label">{index + 1}</p>
            {slide.thumbnail ? (
              <img src={slide.thumbnail} alt={`Slide ${index + 1}`} />
            ) : (
              <div className="placeholder" />
            )}
            <p className="thumbnail-text">{slide.title || `Slide ${index + 1}`}</p>
          </div>
        ))}
      </div>
      
      <div className="new-slide" onClick={addNewSlide}>
        <img className="plusicon" src={PlusIcon} alt="Add new slide" />
        <p>New slide</p>
      </div>
    </div>
  );
};

export default Sidebar;