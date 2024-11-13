import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../components/Router';
import '../styling/Slide.css';

const Slide = () => {
  const { id } = useParams();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="slideContainer">
      <h2>Editing: {presentation.name}</h2>
      <p>{presentation.description}</p>
      <div className="slides">
        {presentation.slides.map((slide, index) => (
          <div key={slide.id} className="slideItem">
            <textarea
              value={slide.content}
              onChange={(e) => handleSlideChange(index, e.target.value)}
              placeholder="Enter slide content"
            />
          </div>
        ))}
      </div>
      <button onClick={handleAddSlide}>Add New Slide</button>
    </div>
  );
};

export default Slide;