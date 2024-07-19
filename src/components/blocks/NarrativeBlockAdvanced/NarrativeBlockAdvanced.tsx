import React, { useEffect, useState } from 'react';
import ButtonList, { ButtonProps } from '../ButtonList/ButtonList';
import { isArray } from '../../utils/array.utils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import './narrative-block-advanced.scss';

interface Image {
  id: string;
  url: string;
  alt: string;
  title: string;
}

interface EmbeddedForm {
  id: string;
  code: string;
}

interface NarrativeBlockProps {
  block: {
    title?: string;
    preTitle?: string;
    backgroundColor?: string;
    content?: string;
    ctas?: Array<{ title: string;
      link: string;
      style?: string;
      label?: string; }> | undefined ;
    images?: Image[];
    carrouselSettingsAutoloop?: boolean;
    carrouselSettingsArrows?: boolean;
    carrouselSettingsNavigation?: boolean;
    alignmentImage?: 'right' | 'left' | 'background';
    video?: string;
    embeddedForm?: EmbeddedForm;
    displayForm?: boolean;
  };
}

export const NarrativeBlockAdvanced: React.FC<NarrativeBlockProps> = ({ block }) => {
  const {
    title,
    preTitle,
    backgroundColor,
    content,
    ctas = [],
    images,
    carrouselSettingsAutoloop,
    carrouselSettingsArrows,
    carrouselSettingsNavigation,
    alignmentImage = 'right',
    video,
    embeddedForm,
    displayForm,
  } = block;

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
    { breakpoint: 1250, settings: { slidesToShow: 1 } },
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

  const buttonPropsArray: ButtonProps[] = ctas.map((cta) => ({ label: cta, title: '', link: '' })); // Convert ctas array to ButtonProps array

  return (
    <div className="narrative-block-component-advanced">
      <div
        className={`narrative-block-component ${alignmentImage === 'background' ? 'align-background' : ''}`}
        style={{ backgroundColor: backgroundColor }}
      >
        <div className={`row ${alignmentImage === 'left' ? 'flex-row-reverse' : ''}`}>
          <div className={`${alignmentImage === 'background' ? 'col-lg-12' : 'col-lg-7'}`}>
            {preTitle && <h3>{preTitle}</h3>}
            {title && <h2>{title}</h2>}

            {content && <div className="text" dangerouslySetInnerHTML={{ __html: content }} />}

            {isArray(ctas) && <ButtonList buttons={buttonPropsArray} />}
          </div>

          {images && (
            <div className={`${alignmentImage === 'background' ? 'background-image' : 'col-lg-5'}`}>
              <Slider
                arrows={carrouselSettingsArrows}
                infinite={true}
                autoplay={carrouselSettingsAutoloop}
                dots={carrouselSettingsNavigation}
                slidesToShow={1}
                className={'carousel'}
                responsive={responsiveSettings}
              >
                {images.map((image, index) => (
                  <img key={image.id} src={image.url} alt={image.alt} title={image.title} />
                ))}
              </Slider>
            </div>
          )}
        </div>
        {displayForm && embeddedForm && (
          <div
            key={embeddedForm.id}
            className="embedded-form"
            dangerouslySetInnerHTML={{ __html: embeddedForm.code }}
          />
        )}
      </div>
    </div>
  );
};

export default NarrativeBlockAdvanced;
