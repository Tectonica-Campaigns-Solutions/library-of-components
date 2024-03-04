import React from 'react';
import AppImage from '../../image/image';
import ButtonList from '../button/button-list';
import { isArray } from '../../../utils/array.utils';

import './index.scss';

const NarrativeBlock = ({ block }) => {
  const { title, preTitle, textContent, buttons = [], image, imageAlignment = 'right' } = block;

  return (
    <div className="narrative-block-component">
      <div className={`row ${imageAlignment === 'left' ? 'flex-row-reverse' : ''}`}>
        <div className="col-lg-6">
          {preTitle && <h3>{preTitle}</h3>}
          {title && <h2>{title}</h2>}

          {textContent && <div className="text" dangerouslySetInnerHTML={{ __html: textContent }} />}

          {isArray(buttons) && <ButtonList buttons={buttons} />}
        </div>

        {image && (
          <div className={`col-lg-6 `}>
            <AppImage image={image} objectFit="cover" />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default NarrativeBlock;
