import React, { useState } from 'react';
import accordionOpen from '../../../Icons/accordion_open.svg';
import accordionClose from '../../../Icons/accordion_close.svg';

import './styles.scss';

function Accordion({ block, defaultActive = 0 }) {
  const { items = [] } = block;
  const [activeItem, setActiveItem] = useState(defaultActive);

  if (items.length === 0) return null;

  return (
    <div className="accordion-block">
      {items.map((item, index) => (
        <div
          key={index}
          className={`item ${activeItem === index ? 'active' : ''}`}
          onClick={() => setActiveItem(index)}
        >
          <div className="accordion-title">
            <h3>{item.title}</h3>
            <img src={activeItem === index ? accordionClose : accordionOpen} alt="Accordion close/open icon" />
          </div>

          <div className="accordion-content" dangerouslySetInnerHTML={{ __html: item.text }}></div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
