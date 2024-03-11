import React from 'react';
import ButtonList from '../button/button-list';
import CustomLink from '../../utils/custom-link';
import CustomImage from '../../image/custom-image';

import './styles.scss';

const Card = ({ card }) => {
  const { title, introduction, image, cta = [], backgroundColor } = card;
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
