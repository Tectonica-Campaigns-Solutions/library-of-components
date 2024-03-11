import React from 'react';
import Card from './card';

import './styles.scss';

const CardGrid = ({ block }) => {
  const { title, items = [] } = block;

  const numColumns = items.length % 3 === 0 ? 3 : items.length % 2 === 0 ? 2 : 3;

  return (
    <section className="card-grid-block">
      {title && (
        <div className="header">
          <h3>{title}</h3>
        </div>
      )}

      {/* Items */}
      <div className="content-tool">
        <div className="row gy-4">
          {items.map((item) => (
            <div className={`col-lg-${12 / numColumns}`} key={item.id}>
              <Card card={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
