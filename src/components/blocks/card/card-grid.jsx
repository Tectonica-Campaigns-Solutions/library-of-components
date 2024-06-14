import React, { useState } from 'react';
import Card from './card';
//import Dropdown from '../inputs/dropdown/Dropdown';
import Filter from '../filter/filter';

import './styles.scss';

const CardGrid = ({ block }) => {
  const { title, items = [], withFilters = false } = block;

  const numColumns = items.length % 3 === 0 ? 3 : items.length % 2 === 0 ? 2 : 3;

  const [filteredItems, setFilteredItems] = useState(items);

  return (
    <section className="card-grid-block">
      {title && (
        <div className="header">
          <h3>{title}</h3>
        </div>
      )}

      {withFilters && (
        <Filter items={filteredItems} gridColumns={numColumns} />
      )}

      {/* Items */}
      
      {!withFilters && (<div className="content-tool">
        <div className="row gy-4">
          {filteredItems.map((item) => (
            <div className={`col-lg-${12 / numColumns}`} key={item.id}>
              <Card card={item} />
            </div>
          ))}
        </div>
      </div>)}
    </section>
  );
};

export default CardGrid;
