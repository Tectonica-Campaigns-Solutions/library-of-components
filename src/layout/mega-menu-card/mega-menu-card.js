import React from 'react';
import CustomImage from '../../components/image/custom-image';
import CustomLink from '../../components/utils/custom-link';
import { pathToModel } from '../../utils/dato.utils';

import './index.scss';

const MegaMenuCard = ({ meta, title, image, description, slug, model }) => {
  const linkPath = pathToModel(model.apiKey, slug);

  return (
    <div className="mega-menu-card">
      {meta && <span className="meta">{meta}</span>}

      {title && (
        <CustomLink to={linkPath}>
          <h2>{title}</h2>
        </CustomLink>
      )}

      {image && (
        <div className="image">
          <CustomImage image={image} />
        </div>
      )}

      {description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  );
};

export default MegaMenuCard;
