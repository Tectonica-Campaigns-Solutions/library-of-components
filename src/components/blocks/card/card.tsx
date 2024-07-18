import React, {FC} from 'react';

import CustomLink from "../CustomLink/CustomLink";
import { formatDate } from '../../utils/date.utils';//src/utils/date.utils.js
import CustomImage from '../../image/custom-image';
import Tags from '../Tags/Tags';
import Button from '../Button/Button';

import './card-styles.scss';

interface Card {
    title: string;
    introduction: string;
    image: any;
    cta: any;
    backgroundColor: string;
    tags: Array<{ id: number; name: string }>;
    date: string;
    typeOfCard: string;
    displayCta: boolean;
}

export interface CardProps {
  card: Card;
}

const Card: FC<CardProps> = ({ card }) => {
  const { title, introduction, image, cta, backgroundColor, tags = [], date, typeOfCard, displayCta } = card;
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

          <div className='card-data'>
            {title && <h3>{title}</h3>}
            {introduction && (
              <div
                className="introduction"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>

          {cta && displayCta && 
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
      <CustomLink to={cta.link} className={`card ${backgroundColor ? backgroundColor : '' } `}>
        {renderContent()}
      </CustomLink>
    );
  }

  return <div className={`card ${backgroundColor ? backgroundColor : ''} ${image ? 'has-image' : 'no-image' }`}>{renderContent()}</div>;
};

export default Card;
