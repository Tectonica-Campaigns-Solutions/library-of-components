import React from 'react';
import CustomImage from '../../image/custom-image';
import ButtonList from '../ButtonList/ButtonList';
import { isArray } from '../../../utils/array.utils';

import './index.scss';

const NarrativeBlock = ({ block }) => {
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

  return (
    <div className={`narrative-block-component ${backgroundColor ? backgroundColor : ''}`}>
      <div className={`row ${alignmentImage === 'left' ? 'flex-row-reverse' : ''}`}>
        <div className="col-lg-7">
          {preTitle && <h3>{preTitle}</h3>}
          {title && <h2>{title}</h2>}

          {content && <div className="text" dangerouslySetInnerHTML={{ __html: content }} />}

          {isArray(ctas) && <ButtonList buttons={ctas} />}
        </div>

        {image && (
          <div className={`col-lg-5`}>
            <CustomImage image={image} objectFit="cover" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NarrativeBlock;
