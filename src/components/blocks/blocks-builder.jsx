import React from 'react';
import NarrativeBlock from './narrative-block/narrative-block';
import Divider from './divider/divider';
import SectionTitle from './section-title/section-title';
import Accordion from './accordion/accordion';
import Button from './button/button';
import CardGrid from './card/card-grid';
import Tabs from './tabs/tabs';
import Header from '../../layout/Header';

export default function BlocksBuilder({ blocks, activeItem = 0 }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.__typename) {
          case 'DatoCmsNarrativeBlock':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <NarrativeBlock block={block} />
              </div>
            );
          case 'DatoCmsAcordion':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Accordion block={block} />
              </div>
            );
          case 'DatoCmsDivider':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Divider />
              </div>
            );
          case 'DatoCmsSectionTitle':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <SectionTitle block={block} />
              </div>
            );
          case 'DatoCmsCta':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Button block={block} />
              </div>
            );
          case 'DatoCmsCardGrid':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <CardGrid block={block} />
              </div>
            );
          case 'DatoCmsTab':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Tabs block={block} />
              </div>
            );
          case 'DatoCmsNavbar':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Header />
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
