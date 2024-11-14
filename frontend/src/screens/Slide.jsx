import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, setData, useCustomNavigation } from '../components/Router';
import Sidebar from '../components/Sidebar';
import LogoutButton from '../components/Logout';
import DeletePresentation from '../components/deletePresentation';
import '../styling/Slide.css';

import TextIcon from '../assets/text-icon.svg';
import ImageIcon from '../assets/img-icon.svg';
import VideoIcon from '../assets/video-icon.svg';
import CodeIcon from '../assets/code-icon.svg';

const Slide = ({ setLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);


  useEffect(() => {
    const fetchPresentationData = async () => {
      try {
        const data = await getData(); // Fetch the data using getData
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

  const handleAddSlide = () => {
    setPresentation((prev) => {
      const updatedSlides = [...prev.slides, { id: Date.now(), content: '' }];
      return { ...prev, slides: updatedSlides };
    });
  };

  const handleSlideChange = (index, content) => {
    setPresentation((prev) => {
      const updatedSlides = [...prev.slides];
      updatedSlides[index].content = content;
      return { ...prev, slides: updatedSlides };
    });
  };

  const handleSaveContent = async () => {
    try {
      const data = await getData();
      const updatedPresentation = {
        ...presentation,
        slides: presentation.slides.map((slide, index) => {
          if (index === activeSlideIndex) {
            return {
              ...slide,
              content: presentation.slides[activeSlideIndex].content,
            };
          }
          return slide;
        }),
      };

      const updatedData = {
        store: {
          ...data.store,
          presentations: data.store.presentations.map((pres) => {
            if (pres.id === presentation.id) {
              return updatedPresentation;
            }
            return pres;
          }),
        },
      };

      const result = await setData(updatedData);
      console.log('Data successfully updated:', result);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleDeletePresentation = () => {
    setShowDeletePopup(true); // Show delete popup when clicked
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false); // Hide popup without deleting
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      {/* Top Bar */}
      <div className="topBar">
        <div className="leftSection">
          <div className='stack'>
            <LogoutButton setLoggedIn={setLoggedIn} />
            <button className="topButton" onClick={handleBackToDashboard}>Back</button> {/* Back button */}
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
          <div className="stack">
            <button className="topButton">Change Thumbnail</button>
            <button className="topButton" onClick={handleDeletePresentation}>Delete Presentation</button>
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
          <div className="slideEditor">
          </div>
        </div>
      </div>

      {/* Conditionally render DeletePresentation component */}
      {showDeletePopup && (
        <DeletePresentation
          presentationId={presentation.id}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Slide;