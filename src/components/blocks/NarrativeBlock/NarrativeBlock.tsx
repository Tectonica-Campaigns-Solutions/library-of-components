import React from 'react';
import CustomImage from '../../image/custom-image';
import ButtonList, { ButtonProps } from '../ButtonList/ButtonList'; // Import ButtonProps
import { isArray } from '../../utils/array.utils';
import { Image } from '../../types';

import './narrative-block-styles.scss';

interface NarrativeBlockProps {
  block: {
    title?: string;
    preTitle?: string;
    backgroundColor?: string;
    content?: string;
    ctas?: string[];
    image?: Image;
    imageMobile?: string;
    alignmentImage?: 'left' | 'right';
    video?: string;
  };
}

const NarrativeBlock: React.FC<NarrativeBlockProps> = ({ block }) => {
  const {
    title,
    preTitle,
    backgroundColor,
    content,
    ctas = [],
    image,
    imageMobile,
    alignmentImage = 'right',
    video,
  } = block;

  const buttonPropsArray: ButtonProps[] = ctas.map((cta) => ({ label: cta, title: '', link: '' })); // Convert ctas array to ButtonProps array

  return (
    <div className={`narrative-block-component ${backgroundColor ? backgroundColor : ''}`}>
      <div className={`row ${alignmentImage === 'left' ? 'flex-row-reverse' : ''}`}>
        <div className="col-lg-7">
          {preTitle && <h3>{preTitle}</h3>}
          {title && <h2>{title}</h2>}

          {content && <div className="text" dangerouslySetInnerHTML={{ __html: content }} />}

          {isArray(ctas) && <ButtonList buttons={buttonPropsArray} />} {/* Use the converted array */}
        </div>

        {image && (
          <div className={`col-lg-5`}>
            <CustomImage image={image} objectFit="cover"  />
          </div>
        )}
      </div>
    </div>
  );
};

export default NarrativeBlock;
