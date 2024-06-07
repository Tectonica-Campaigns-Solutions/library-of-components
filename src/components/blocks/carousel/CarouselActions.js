import React from 'react';
import { ReactSVG } from 'react-svg';
import prevIcon from '../../../icons/carousel-prev.svg';
import nextIcon from '../../../icons/carousel-next.svg';

import './styles.scss';

const CarouselActions = ({ onPrevSlide, onNextSlide }) => {
  return (
    <div className="carousel-actions my-2 justify-content-center">
      <span onClick={onPrevSlide}>
        <ReactSVG src={prevIcon} />
      </span>
      <span onClick={onNextSlide}>
        <ReactSVG src={nextIcon} />
      </span>
    </div>
  );
};

export default CarouselActions;
