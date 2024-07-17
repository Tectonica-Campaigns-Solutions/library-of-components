import React, { FC, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image'

import './accordion-styles.scss';

interface Block {
  items: { title: string, text: string }[] 
}

interface Props {
  block: Block;
  defaultActive?: number;
}

const Accordion: FC<Props> = ({ block, defaultActive = 0 }) => {
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
              {activeItem === index ? 
                <StaticImage
                    src="../../../icons/accordion_open.svg"
                    alt="Accordion open"
                    placeholder="blurred"
                    layout="fixed"
                    width={30}
                    height={31}
                /> 
                : 
                <StaticImage
                    src="../../../icons/accordion_close.svg"
                    alt="Accordion open"
                    placeholder="blurred"
                    layout="fixed"
                    width={30}
                    height={31}
                />}
            </div>

          <div className="accordion-content" dangerouslySetInnerHTML={{ __html: item.text }}></div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
