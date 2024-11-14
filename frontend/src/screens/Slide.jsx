import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData } from '../components/Router';
import Sidebar from '../components/Sidebar';
import LogoutButton from '../components/Logout';
import ChangeThumbnail from '../components/changeThumbnail';
import DeletePresentation from '../components/deletePresentation';
import '../styling/Slide.css';

import TextIcon from '../assets/text-icon.svg';
import ImageIcon from '../assets/img-icon.svg';
import VideoIcon from '../assets/video-icon.svg';
import CodeIcon from '../assets/code-icon.svg';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';

const Slide = ({ setLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showChangeThumbnail, setShowChangeThumbnail] = useState(false);

  useEffect(() => {
    const fetchPresentationData = async () => {
      try {
        const data = await getData();
        const presentation = data.store.presentations.find(p => p.id === parseInt(id));
        setPresentation(presentation);
      } catch (error) {
        console.error('Error fetching presentation data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresentationData();
  }, [id]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        setActiveSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.key === 'ArrowRight') {
        setActiveSlideIndex((prevIndex) => Math.min(prevIndex + 1, presentation.slides.length - 1));
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        handleDeleteSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [presentation, activeSlideIndex]);

  const savePresentationData = async (updatedPresentation) => {
    try {
      const data = await getData();
      const updatedData = {
        ...data,
        store: {
          ...data.store,
          presentations: data.store.presentations.map((pres) => {
            if (pres.id === updatedPresentation.id) {
              return updatedPresentation;
            }
            return pres;
          }),
        },
      };
      await setData(updatedData);
    } catch (error) {
      console.error("Error updating presentation data:", error);
    }
  };

  const handleAddSlide = async () => {
    setPresentation((prev) => {
      const updatedSlides = [...prev.slides, { id: Date.now(), content: '' }];
      return { ...prev, slides: updatedSlides };
    });
    const updatedPresentation = {
      ...presentation,
      slides: [...presentation.slides, { id: Date.now(), content: '' }],
    };
    await savePresentationData(updatedPresentation);
  };

  const handleDeleteSlide = async () => {
    const updatedSlides = presentation.slides.filter((slide, index) => index !== activeSlideIndex);
    const updatedPresentation = {
      ...presentation,
      slides: updatedSlides,
    };
  
    if (activeSlideIndex === updatedSlides.length) {
      setActiveSlideIndex(updatedSlides.length - 1);
    } else {
      setActiveSlideIndex(Math.max(activeSlideIndex - 1, 0));
    }
    await savePresentationData(updatedPresentation);
    setPresentation(updatedPresentation);
  };

  const handlePreviousSlide = () => {
    setActiveSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prevIndex) => Math.min(prevIndex + 1, presentation.slides.length - 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isFirstSlide = activeSlideIndex === 0;
  const isLastSlide = activeSlideIndex === presentation.slides.length - 1;

  return (
    <div className="content-container">
      {/* Top Bar */}
      <div className="topBar">
        <div className="leftSection">
          <div className='stack'>
            <LogoutButton setLoggedIn={setLoggedIn} />
            <button className="topButton" onClick={() => navigate('/dashboard')}>&nbsp;&nbsp;Back&nbsp;&nbsp;</button> {/* Back button */}
          </div>
        </div>
        <div className="centerSection">
          <img className="topIcon" src={TextIcon} alt="Text Icon" />
          <img className="topIcon" src={ImageIcon} alt="Image Icon" />
          <img className="topIcon" src={VideoIcon} alt="Video Icon" />
          <img className="topIcon" src={CodeIcon} alt="Code Icon" />
        </div>
        <div className="rightSection">
          <h2 className="slideTitle">{presentation.name}</h2>
          <img className="topIcon" src={presentation.thumbnail} />
          <div className="stack">
            <button className="topButton" onClick={() => setShowChangeThumbnail(true)}>Change Thumbnail</button>
            <button className="topButton" onClick={() => setShowDeletePopup(true)}>Delete Presentation</button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="slideContainer">
        <Sidebar
          slides={presentation.slides}
          activeSlideIndex={activeSlideIndex}
          setActiveSlide={setActiveSlideIndex}
          addNewSlide={handleAddSlide}
        />

        <div className="mainContent">
          {/* Only show arrows if there are at least two slides */}
          {presentation.slides.length > 1 && (
            <div className='arrowDiv'>
              <img 
                className={`topIcon ${isFirstSlide ? 'disabled' : ''}`} 
                src={leftArrow} 
                alt="Prev Slide" 
                onClick={handlePreviousSlide} 
                disabled={isFirstSlide}
              />
              <img 
                className={`topIcon ${isLastSlide ? 'disabled' : ''}`} 
                src={rightArrow} 
                alt="Next Slide" 
                onClick={handleNextSlide} 
                disabled={isLastSlide}
              />
            </div>
          )}
          
          <div className="slideEditor">
            <div className="slideNumber">
              {presentation.slides.length === 1 ? '1' : activeSlideIndex + 1}
            </div>
          </div>
          <button className="deleteButton" onClick={handleDeleteSlide}>Delete Slide</button>
        </div>
      </div>

      {/* Conditionally render modals */}
      {showDeletePopup && (
        <DeletePresentation presentationId={presentation.id} onCancel={() => setShowDeletePopup(false)} />
      )}

      {showChangeThumbnail && (
        <ChangeThumbnail onClose={() => setShowChangeThumbnail(false)} onSave={(file) => savePresentationData({ ...presentation, thumbnail: file })} />
      )}
    </div>
  );
};

export default Slide;