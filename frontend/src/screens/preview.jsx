import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../components/Router";
import Text from "../components/text";
import Image from "../components/image";
import Video from "../components/video";
import Code from "../components/code";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import "../styling/Slide.css";

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const fetchPresentationData = async () => {
      try {
        const data = await getData();
        const presentation = data.store.presentations.find(
          (p) => p.id === parseInt(id)
        );
        setPresentation(presentation);
      } catch (error) {
        console.error("Error fetching presentation data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPresentationData();
  }, [id]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (presentation) {
        if (event.key === "ArrowLeft") {
          setActiveSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (event.key === "ArrowRight") {
          setActiveSlideIndex((prevIndex) =>
            Math.min(prevIndex + 1, presentation.slides.length - 1)
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [presentation, activeSlideIndex]);

  useEffect(() => {
    if (presentation && activeSlideIndex != 0) {
      navigate(`/presentation/${id}/preview/${activeSlideIndex}`);
    }
  }, [activeSlideIndex, id, navigate, presentation]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleBackToEditing = () => {
    navigate(`/presentation/${id}`);
  };

  const handlePreviousSlide = () => {
    setActiveSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, presentation.slides.length - 1)
    );
  };

  const currentSlide = presentation?.slides?.[activeSlideIndex];
  const isFirstSlide = activeSlideIndex === 0;
  const isLastSlide = activeSlideIndex === presentation.slides.length - 1;

  return (
    <div className="mainContent">
      {presentation.slides.length > 0 ? (
        <>
          {presentation.slides.length > 1 && (
            <div className="arrowDiv">
              <img
                className={`topIcon ${isFirstSlide ? "disabled" : ""}`}
                src={leftArrow}
                alt="Prev Slide"
                onClick={handlePreviousSlide}
                disabled={isFirstSlide}
              />
              <img
                className={`topIcon ${isLastSlide ? "disabled" : ""}`}
                src={rightArrow}
                alt="Next Slide"
                onClick={handleNextSlide}
                disabled={isLastSlide}
              />
            </div>
          )}

          <div className="previewSlideViewer">
            <div className="slideNumber">
              {presentation.slides.length === 1 ? "1" : activeSlideIndex + 1}
            </div>
            <button className='topButton' onClick={handleBackToEditing}>Back to Editing</button>


            <div className="slideContent">
              {currentSlide?.textElements?.map((element, index) => (
                <Text
                  key={`text-${index}`}
                  width={element.size.width}
                  height={element.size.height}
                  content={element.content}
                  fontSize={element["font-size"]}
                  color={element.colour}
                  position={element.position}
                  fontFamily={element.fontFamily}
                  layer={element.layer || 0} 
                />
              ))}

              {currentSlide?.imageElements?.map((element, index) => (
                <Image
                  key={`image-${index}`}
                  src={element.file}
                  width={element.size.width}
                  height={element.size.height}
                  position={element.position}
                  altTag={element["alt-tag"]}
                  layer={element.layer || 0}
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
                />
              ))}
            </div>
          </div>

          <div className="controls">
            
          </div>
        </>
      ) : (
        <div className="SlideEditor"></div>
      )}
    </div>
  );
};

export default Preview;
