import React from 'react';
import ImageWrapper from '../../Image/ImageWrapper';
import Link from '../../Link/Link';
import { pathToModel } from '../../../../utils';

import './index.scss';

const MegaMenuCard = ({ meta, title, image, description, slug, model }) => {
  const linkPath = pathToModel(model.apiKey, slug);

  return (
    <div className="mega-menu-card">
      {meta && <span className="meta">{meta}</span>}

      {title && (
        <Link to={linkPath}>
          <h2>{title}</h2>
        </Link>
      )}

      {image && <ImageWrapper image={image} />}

      {description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  );
};

export default MegaMenuCard;
