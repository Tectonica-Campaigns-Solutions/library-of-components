import React from 'react';
import NarrativeBlock from './narrative-block/narrative-block';
import Divider from './divider/divider';
import SectionTitle from './section-title/section-title';
import Accordion from './accordion/accordion';
import Button from './button/button';
import CardGrid from './card/card-grid';
import Tabs from './tabs/tabs';
import Header from '../../layout/Header';

export default function BlocksBuilder({ blocks }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__typename) {
          case 'DatoCmsNarrativeBlock':
            return <NarrativeBlock block={block} key={block.id} />;
          case 'DatoCmsAcordion':
            return <Accordion block={block} key={block.id} />;
          case 'DatoCmsDivider':
            return <Divider key={block.id} />;
          case 'DatoCmsSectionTitle':
            return <SectionTitle block={block} key={block.id} />;
          case 'DatoCmsCta':
            return <Button block={block} key={block.id} />;
          case 'DatoCmsCardGrid':
            return <CardGrid block={block} key={block.id} />;
          case 'DatoCmsTab':
            return <Tabs block={block} key={block.id} />;
          case 'DatoCmsNavbar':
            return <Header />;

          default:
            return null;
        }
      })}
    </>
  );
}
