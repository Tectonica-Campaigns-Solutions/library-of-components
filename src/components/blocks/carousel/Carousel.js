import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import CarouselActions from './CarouselActions';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './styles.scss';

const Carousel = ({ customRef, items = [], renderItem, showDefaultActions = false, ...rest }) => {
  const sliderRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const responsiveSettings = [
    { breakpoint: 1250, settings: { slidesToShow: 2 } },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        centerMode: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        dots: false,
        centerMode: false,
      },
    },
  ];

  return (
    <>
      <Slider
        ref={customRef || sliderRef}
        arrows={false}
        infinite={false}
        slidesToShow={2}
        className={'carousel'}
        responsive={responsiveSettings}
        {...rest}
      >
        {items.map((item, index) => renderItem(item, index))}
      </Slider>

      {((!customRef && showDefaultActions) || isMobile) && (
        <CarouselActions
          onPrevSlide={() => {
            if (customRef) {
              customRef.current?.slickPrev();
            } else {
              sliderRef.current?.slickPrev();
            }
          }}
          onNextSlide={() => {
            if (customRef) {
              customRef.current?.slickNext();
            } else {
              sliderRef.current?.slickNext();
            }
          }}
        />
      )}
    </>
  );
};

export default Carousel;
