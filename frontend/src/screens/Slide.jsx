import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData } from '../components/Router';
import Sidebar from '../components/Sidebar';
import LogoutButton from '../components/Logout';
import ChangeThumbnail from '../components/changeThumbnail';
import DeletePresentation from '../components/deletePresentation';
import EditPosition from '../components/editPosition';
import AddText from '../components/AddText';
import AddImage from '../components/AddImage';
import AddVideo from '../components/AddVideo';
import AddCode from '../components/AddCode';
import Text from '../components/text';
import Image from '../components/image';
import Video from '../components/video';
import Code from '../components/code';
import '../styling/Slide.css';

import TextIcon from '../assets/text-icon.svg';
import ImageIcon from '../assets/img-icon.svg';
import VideoIcon from '../assets/video-icon.svg';
import CodeIcon from '../assets/code-icon.svg';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';

const Slide = ({ setLoggedIn }) => {
  const { id, slideIndex } = useParams(); 
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(parseInt(slideIndex) || 0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showChangeThumbnail, setShowChangeThumbnail] = useState(false);
  const [showAddText, setShowAddText] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showAddCode, setShowAddCode] = useState(false);
  const [showEditPosition, setShowEditPosition] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  // HANDLE KEY PRESSES
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (presentation && !showDeletePopup && !showChangeThumbnail && !showAddText && !showEditPosition && !showAddImage && !showAddVideo && !showAddCode) {
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
  }, [presentation, activeSlideIndex, showDeletePopup, showChangeThumbnail, showAddText, showEditPosition, showAddImage, showAddVideo, showAddCode]);

  // HANDLE DOUBLE CLICK;
  const handleClick = (element) => {
    setClickCount((prev) => prev + 1);
    setTimeout(() => {
      if (clickCount === 1) {
        handleElementDoubleClick(element);
      }
      setClickCount(0);
    }, 500);
  };

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

  useEffect(() => {
    if (presentation && activeSlideIndex != 0) {
      navigate(`/presentation/${id}/slide/${activeSlideIndex}`);
    }
  }, [activeSlideIndex, id, navigate, presentation]);

  // SAVE DATA
  const savePresentationData = async (updatedPresentation) => {
    try {
      const data = await getData();
      const updatedData = {
        ...data,
        store: {
          ...data.store,
          presentations: data.store.presentations.map((pres) =>
            pres.id === updatedPresentation.id ? updatedPresentation : pres
          ),
        },
      };

      await setData(updatedData);
      setPresentation(updatedPresentation);
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
      codeElements: [], // Add codeElements to slide
    };
    const updatedPresentation = {
      ...presentation,
      slides: [...presentation.slides, newSlide],
    };

    try {
      await savePresentationData(updatedPresentation);
      setPresentation(updatedPresentation);
    } catch (error) {
      console.error("Error saving new slide:", error);
    }
  };

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

  const handleElementDoubleClick = (element) => {
    setCurrentElement(element);
    setShowEditPosition(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentSlide = presentation?.slides?.[activeSlideIndex];
  const isFirstSlide = activeSlideIndex === 0;
  const isLastSlide = activeSlideIndex === presentation.slides.length - 1;

  return (
    <div className="content-container">
      <div className="topBar">
        <div className="leftSection">
          <div className='stack'>
            <LogoutButton setLoggedIn={setLoggedIn} />
            <button className="topButton" onClick={() => navigate('/dashboard')}>&nbsp;&nbsp;Back&nbsp;&nbsp;</button>
          </div>
        </div>
        <div className="centerSection">
          <img className="topIcon" src={TextIcon} alt="Text Icon" onClick={() => setShowAddText(true)} />
          <img className="topIcon" src={ImageIcon} alt="Image Icon" onClick={() => setShowAddImage(true)} />
          <img className="topIcon" src={VideoIcon} alt="Video Icon" onClick={() => setShowAddVideo(true)} />
          <img className="topIcon" src={CodeIcon} alt="Code Icon" onClick={() => setShowAddCode(true)} />
        </div>
        <div className="rightSection">
          <h2 className="slideTitle">{presentation?.name || 'Loading...'}</h2>
          <img className="topIcon" src={presentation?.thumbnailPreview || ''} alt="Thumbnail" />
          <div className="stack">
            <button className="topButton" onClick={() => setShowChangeThumbnail(true)}>Change Thumbnail</button>
            <button className="topButton" onClick={() => setShowDeletePopup(true)}>Delete Presentation</button>
          </div>
        </div>
      </div>

      <div className="slideContainer">
        <Sidebar
          slides={presentation.slides}
          activeSlideIndex={activeSlideIndex}
          setActiveSlide={setActiveSlideIndex}
          addNewSlide={handleAddSlide}
        />

        <div className="mainContent">
          {presentation.slides.length > 0 ? (
            <>
              {presentation.slides.length > 1 && (
                <div className='arrowDiv'>
                  <img className={`topIcon ${isFirstSlide ? 'disabled' : ''}`} src={leftArrow} alt="Prev Slide" onClick={handlePreviousSlide} disabled={isFirstSlide} />
                  <img className={`topIcon ${isLastSlide ? 'disabled' : ''}`} src={rightArrow} alt="Next Slide" onClick={handleNextSlide} disabled={isLastSlide} />
                </div>
              )}

              <div className="slideEditor">
                <div className="slideNumber">
                  {presentation.slides.length === 1 ? '1' : activeSlideIndex + 1}
                </div>

                <div className="slideContent">
                  {currentSlide?.textElements?.map((element, index) => (
                    <Text
                      key={`text-${index}`}
                      width={element.size.width}
                      height={element.size.height}
                      content={element.content}
                      fontSize={element['font-size']}
                      color={element.colour}
                      position={element.position}
                      fontFamily={element.fontFamily}
                      layer={element.layer || 0} 
                      onClick={() => handleClick(element)}
                    />
                  ))}

                  {currentSlide?.imageElements?.map((element, index) => (
                    <Image
                      key={`image-${index}`}
                      src={element.file}
                      width={element.size.width}
                      height={element.size.height}
                      position={element.position}
                      altTag={element['alt-tag']}
                      layer={element.layer || 0}
                      onClick={() => handleClick(element)}
                    />
                  ))}

                  {currentSlide?.videoElements?.map((element, index) => (
                    <Video
                      key={`video-${index}`}
                      url={element.url}
                      width={element.size.width}
                      height={element.size.height}
                      position={element.position}
                      autoPlay={element.autoPlay}
                      layer={element.layer || 0}
                      onClick={() => handleClick(element)}
                    />
                  ))}

                  {currentSlide?.codeElements?.map((element, index) => (
                    <Code
                      key={`code-${index}`}
                      width={element.size.width}
                      height={element.size.height}
                      position={element.position}
                      code={element.code}
                      language={element.language}
                      fontFamily={element.fontFamily}
                      layer={element.layer || 0}
                      onClick={() => handleClick(element)}
                    />
                  ))}
                </div>
              </div>
              <div className='controls'>
                <button className="deleteButton" onClick={handleDeleteSlide}>Delete Slide</button>
                <button onClick={() => navigate(`/presentation/${id}/preview`)}>Presenter Mode</button>
                <button className="topButton" onClick={console.log("")}>Change Slide Background</button>
              </div>
            </>
          ) : (
            <div className='SlideEditor'></div>
          )}
        </div>
      </div>

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
              textElements: [
                ...(updatedSlides[activeSlideIndex].textElements || []),
                { ...textElement, layer: textElement.layer || 0 },
              ],
            };
            savePresentationData({ ...presentation, slides: updatedSlides });
          }}
        />
      )}

      {showAddImage && (
        <AddImage
          onClose={() => setShowAddImage(false)}
          onSave={(imageElement) => {
            const updatedSlides = [...presentation.slides];
            updatedSlides[activeSlideIndex] = {
              ...updatedSlides[activeSlideIndex],
              imageElements: [
                ...(updatedSlides[activeSlideIndex].imageElements || []),
                { ...imageElement, layer: imageElement.layer || 0 },
              ],
            };
            savePresentationData({ ...presentation, slides: updatedSlides });
          }}
        />
      )}

      {showAddVideo && (
        <AddVideo
          onClose={() => setShowAddVideo(false)}
          onSave={(videoElement) => {
            const updatedSlides = [...presentation.slides];
            updatedSlides[activeSlideIndex] = {
              ...updatedSlides[activeSlideIndex],
              videoElements: [
                ...(updatedSlides[activeSlideIndex].videoElements || []),
                { ...videoElement, layer: videoElement.layer || 0 },
              ],
            };
            savePresentationData({ ...presentation, slides: updatedSlides });
          }}
        />
      )}

      {showAddCode && (
        <AddCode
          onClose={() => setShowAddCode(false)}
          onSave={(codeElement) => {
            const updatedSlides = [...presentation.slides];
            updatedSlides[activeSlideIndex] = {
              ...updatedSlides[activeSlideIndex],
              codeElements: [
                ...(updatedSlides[activeSlideIndex].codeElements || []),
                { ...codeElement, layer: codeElement.layer || 0 },
              ],
            };
            savePresentationData({ ...presentation, slides: updatedSlides });
          }}
        />
      )}

      {showEditPosition && currentElement && (
        <EditPosition
          element={currentElement}
          onSavePosition={(updatedElement) => {
            const updatedSlides = [...presentation.slides];
            const slide = updatedSlides[activeSlideIndex];

            const elementTypeMap = {
              text: 'textElements',
              image: 'imageElements',
              video: 'videoElements',
              code: 'codeElements',
            };

            const elementArrayName = elementTypeMap[updatedElement.type];

            if (elementArrayName) {
              const updatedElements = slide[elementArrayName].map((el) =>
                el.id === updatedElement.id ? updatedElement : el
              );

              updatedSlides[activeSlideIndex] = {
                ...slide,
                [elementArrayName]: updatedElements,
              };

              savePresentationData({ ...presentation, slides: updatedSlides });
              setShowEditPosition(false);
            }
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