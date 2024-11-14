import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, setData, useCustomNavigation } from '../components/Router';
import Sidebar from '../components/Sidebar';
import LogoutButton from '../components/Logout';
import '../styling/Slide.css';

import TextIcon from '../assets/text-icon.svg';
import ImageIcon from '../assets/img-icon.svg';
import VideoIcon from '../assets/video-icon.svg';
import CodeIcon from '../assets/code-icon.svg';

const Slide = ({ setLoggedIn }) => {
  const { id } = useParams();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { navigateToSlideDeck } = useCustomNavigation();

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
      // Create a new object for the data to be sent
      const updatedPresentation = {
        ...presentation, // Spread existing presentation data
        slides: presentation.slides.map((slide, index) => {
          // Update the slide content at the active index
          if (index === activeSlideIndex) {
            return {
              ...slide,
              content: presentation.slides[activeSlideIndex].content, // Only update the content of the active slide
            };
          }
          return slide; // Keep other slides unchanged
        }),
      };
  
      // Create the final data to update, preserving the rest of the data structure
      const updatedData = {
        store: {
          ...data.store,
          presentations: data.store.presentations.map((pres) => {
            // Find the presentation being edited and update it
            if (pres.id === presentation.id) {
              return updatedPresentation; // Replace only the updated presentation
            }
            return pres; // Keep other presentations unchanged
          }),
        },
      };
  
      // Send the updated data to the server using setData
      const result = await setData(updatedData);
      console.log('Data successfully updated:', result);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      {/* Top Bar */}
      <div className="topBar">
        <div className="leftSection">
          <LogoutButton setLoggedIn={setLoggedIn} /> {/* Ensure this works to log out and navigate */}
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
            <button className="topButton">Delete Presentation</button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="slideContainer">
        {/* Sidebar on the left */}
        <Sidebar
          slides={presentation.slides}
          activeSlideIndex={activeSlideIndex}
          setActiveSlide={setActiveSlideIndex}
          addNewSlide={handleAddSlide}
        />

        {/* Slide editing area on the right */}
        <div className="mainContent">
          <div className="slideEditor">
            {presentation.slides.length > 0 && (
              <div className="slideItem">
                <textarea
                  value={presentation.slides[activeSlideIndex].content}
                  onChange={(e) => handleSlideChange(activeSlideIndex, e.target.value)}
                  placeholder="Enter slide content"
                />
              </div>
            )}
          </div>
          <button onClick={handleSaveContent}>Save Presentation</button> {/* Save button to trigger the save */}
        </div>
      </div>
    </div>
  );
};

export default Slide;