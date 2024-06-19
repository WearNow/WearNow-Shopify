import React , { useState } from 'react'
import {
    CircleChevronRightIcon
  } from '@shopify/polaris-icons';
  import {
    CircleChevronLeftIcon
  } from '@shopify/polaris-icons';
  import {
    Icon
  } from "@shopify/polaris";

function SliderPopup({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };
  
    const goToPrevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };
  return (
    <div className="slider_pop_up">
      <div className="slides">
        {slides.map((slide, index) => (
          <div key={index} className={index === currentIndex ? 'slide active' : 'slide'}>
            {slide}
          </div>
        ))}
      </div>
        <button className="prev" onClick={goToPrevSlide}>
            <Icon
            source={CircleChevronLeftIcon}
            tone="base"
            />
        </button>
        <button className="next" onClick={goToNextSlide}>
            <Icon
                source={CircleChevronRightIcon}
                tone="base"
             />
        </button>
    </div>
  )
}

export default SliderPopup
