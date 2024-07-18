import React, { FC, MouseEventHandler } from 'react';
import { ReactSVG } from 'react-svg';
import { StaticImage } from 'gatsby-plugin-image'
// import prevIcon from '../../../icons/carousel-prev.svg';
// import nextIcon from '../../../icons/carousel-next.svg';

import './carousel-styles.scss';

export interface CarouselActionsProps {
  onPrevSlide: MouseEventHandler;
  onNextSlide: MouseEventHandler;
}

const CarouselActions: FC<CarouselActionsProps> = ({ onPrevSlide, onNextSlide }) => {
  return (
    <div className="carousel-actions my-2 justify-content-center">
      <span onClick={onPrevSlide}>
        {/* <ReactSVG src={prevIcon} /> */}
        <StaticImage
                    src="../../../icons/carousel-prev.svg"
                    alt="Accordion open"
                    placeholder="blurred"
                    layout="fixed"
                    width={88}
                    height={88}
                /> 
      </span>
      <span onClick={onNextSlide}>
        {/* <ReactSVG src={nextIcon} /> */}
        <StaticImage
                    src="../../../icons/carousel-next.svg"
                    alt="Accordion open"
                    placeholder="blurred"
                    layout="fixed"
                    width={88}
                    height={88}
                /> 
      </span>
    </div>
  );
};

export default CarouselActions;
