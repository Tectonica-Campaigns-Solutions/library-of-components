import React, { useEffect, useRef, useState, RefObject } from 'react';
import Slider, { ResponsiveObject } from 'react-slick';
import CarouselActions from '../CarouselActions/CarouselActions';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './carousel-styles.scss';

interface CarouselProps {
  customRef?: RefObject<Slider>;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  showDefaultActions?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ customRef, items = [], renderItem, showDefaultActions = false, ...rest }) => {
  const sliderRef = useRef<Slider>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;
  const [page, setPage] = useState(slidesToShow);

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

  const responsiveSettings: ResponsiveObject[] = [
    { breakpoint: 1250, settings: { slidesToShow: 3 } },
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
        slidesToShow={slidesToShow}
        className={'carousel'}
        responsive={responsiveSettings}
        afterChange={(slide) => {
          setCurrentSlide(slide);
          setPage(slide + slidesToShow);
        }}
        {...rest}
      >
        {items.map((item, index) => renderItem(item, index))}
      </Slider>

      <div className='text-center mt-2'>
        <span>{page}</span> / {items.length}
      </div>

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
