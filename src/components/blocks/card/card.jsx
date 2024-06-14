import React from 'react';
import ButtonList from '../button/button-list';
import CustomLink from '../../utils/custom-link';
import { formatDate } from '../../../utils/date.utils';//src/utils/date.utils.js
import CustomImage from '../../image/custom-image';
import Tags from '../tags/tags';
import Button from '../button/button';

import './styles.scss';

const Card = ({ card }) => {
  const { title, introduction, image, cta, backgroundColor, tags = [], date, typeOfCard } = card;
  const hasLink = cta !== null;

  const renderContent = () => {
    return (
      <div className={typeOfCard}>
        {image && (
          <div className="image">
            <CustomImage image={image} />
          </div>
        )}

        <div className="card-content">
          {tags.length > 0 && <Tags tags={tags} />}
          
          {date !== null && (
            <div className="date">{formatDate(date)}</div>
          )}

          <div>
            {title && <h3>{title}</h3>}
            {introduction && (
              <div
                className="introduction"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>

          {cta && 
          <div className='mt-2'>
            <Button block={cta} />
          </div>
          }

        </div>
      </div>
    );
  };

  if (hasLink) {
    return (
      <CustomLink to={cta.link} className={`card ${backgroundColor ? backgroundColor : ''}`}>
        {renderContent()}
      </CustomLink>
    );
  }

  return <div className={`card ${backgroundColor ? backgroundColor : ''}`}>{renderContent()}</div>;
};

export default Card;
