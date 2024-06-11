import React from 'react';
import ButtonList from '../button/button-list';
import CustomLink from '../../utils/custom-link';
import CustomImage from '../../image/custom-image';
import Tags from '../tags/tags';

import './styles.scss';

const Card = ({ card }) => {
  const { title, introduction, image, cta = [], backgroundColor, tags = [] } = card;
  const hasLink = Array.isArray(cta) && cta.length > 0;

  const renderContent = () => {
    return (
      <>
        {image && (
          <div className="image">
            <CustomImage image={image} />
          </div>
        )}

        <div className="card-content">
          <div>
            {title && <h3>{title}</h3>}
            {introduction && <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
          </div>

          {hasLink && <ButtonList buttons={cta} />}

          {tags.length > 0 && 
            <Tags tags={tags} />
          }
        </div>
      </>
    );
  };

  if (hasLink) {
    return (
      <CustomLink to={cta[0]} className={`card ${backgroundColor ? backgroundColor : ''}`}>
        {renderContent()}
      </CustomLink>
    );
  }

  return <div className={`card ${backgroundColor ? backgroundColor : ''}`}>{renderContent()}</div>;
};

export default Card;
