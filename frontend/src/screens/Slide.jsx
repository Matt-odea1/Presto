import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData } from '../components/Router';
import Sidebar from '../components/Sidebar';
import LogoutButton from '../components/Logout';
import ChangeThumbnail from '../components/changeThumbnail';
import DeletePresentation from '../components/deletePresentation';
import AddText from '../components/text';
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
  const [showAddText, setShowAddText] = useState(false);

    // HANDLING KEY PRESSES
    useEffect(() => {
      const handleKeyPress = (event) => {
        if (presentation && !showDeletePopup && !showChangeThumbnail && !showAddText) {
          if (event.key === 'ArrowLeft') {
            setActiveSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          } else if (event.key === 'ArrowRight') {
            setActiveSlideIndex((prevIndex) => Math.min(prevIndex + 1, presentation.slides.length - 1));
          } else if (event.key === 'Delete' || event.key === 'Backspace') {
            handleDeleteSlide();
          }
        }
      };
  
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [presentation, activeSlideIndex, showDeletePopup, showChangeThumbnail, showAddText]);  


  // FETCH DATA
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


  // SAVE DATA
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

  // ADD NEW SLIDE
  const handleAddSlide = async () => {
    const newSlide = {
      id: Date.now(),
      backgroundStyle: {
        colour: '#ffffff', 
        img: undefined, 
      },
      textElements: [],
      imageElements: [],
      videoElements: [],
      codeElements: [],
    };
    setPresentation((prev) => {
      const updatedSlides = [...prev.slides, newSlide];
      const updatedPresentation = {
        ...prev,
        slides: updatedSlides,
      };
      savePresentationData(updatedPresentation);
      return updatedPresentation;
    });
  };
  

  // DELETE SLIDE
  const handleDeleteSlide = async () => {
    if (presentation && presentation.slides) {
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
    }
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

  // Ensure safe access to undefined or null properties
  const currentSlide = presentation?.slides?.[activeSlideIndex];
  const isFirstSlide = activeSlideIndex === 0;
  const isLastSlide = activeSlideIndex === presentation.slides.length - 1;

  return (
    <div className="content-container">
      {/* Top Bar */}
      <div className="topBar">
        <div className="leftSection">
          <div className='stack'>
            <LogoutButton setLoggedIn={setLoggedIn} />
            <button className="topButton" onClick={() => navigate('/dashboard')}>&nbsp;&nbsp;Back&nbsp;&nbsp;</button>
          </div>
        </div>
        <div className="centerSection">
          <img className="topIcon" src={TextIcon} alt="Text Icon" onClick={() => setShowAddText(true)}/>
          <img className="topIcon" src={ImageIcon} alt="Image Icon" />
          <img className="topIcon" src={VideoIcon} alt="Video Icon" />
          <img className="topIcon" src={CodeIcon} alt="Code Icon" />
        </div>
        <div className="rightSection">
          <h2 className="slideTitle">{presentation?.name || 'Loading...'}</h2>
          <img className="topIcon" src={presentation?.thumbnail || ''} alt="Thumbnail" />
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
          {/* Only render slide editor if there are slides */}
          {presentation.slides.length > 0 ? (
            <>
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

              {/* Render elements for the active slide */}
              <div className="slideContent">
                {presentation.slides[activeSlideIndex].elements?.map((element, index) => {
                  if (element.type === 'text') {
                    return <Text key={index} content={element.content} />;
                  }
                  return null;
                })}
              </div>
            </>
          ) : (
            <div className='SlideEditor'></div> // Blank template when no slides
          )}
        </div>
      </div>

      {/* Conditionally render modals */}
      {showDeletePopup && (
        <DeletePresentation presentationId={presentation.id} onCancel={() => setShowDeletePopup(false)} />
      )}

      {showAddText && (
        <AddText
          onClose={() => setShowAddText(false)}
          onSave={(textElement) => {
            const updatedSlides = [...presentation.slides];
            updatedSlides[activeSlideIndex] = {
              ...updatedSlides[activeSlideIndex],
              // Ensure textElements is always an array, default to an empty array if not present
              textElements: [
                ...(updatedSlides[activeSlideIndex].textElements || []), 
                textElement
              ],
            };

            // Now save the updated presentation with the new slides
            savePresentationData({ ...presentation, slides: updatedSlides });
          }}
        />
      )}

      {showChangeThumbnail && (
        <ChangeThumbnail onClose={() => setShowChangeThumbnail(false)} onSave={(file) => savePresentationData({ ...presentation, thumbnail: file })} />
      )}
    </div>
  );
};

export default Slide;