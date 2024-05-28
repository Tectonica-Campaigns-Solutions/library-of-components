import React from 'react';
import Divider from './divider/divider';
import SectionTitle from './section-title/section-title';
import Accordion from './accordion/accordion';
import Button from './button/button';
import CardGrid from './card/card-grid';
import Tabs from './tabs/tabs';
import Header from '../../layout/Header';
import Breadcrumb from './breadcrumbs/breadcrumbs';
import Footer from '../../layout/footer/footer';
import ListPaginated from './pagination/list-paginated';
import FormExample from './form-example/FormExample';
import ButtonList from './button/button-list';
import Notification from './notification/notification';
import HubspotForm from './hubspot-form/hubspot-form';
import NarrativeBlock from './narrative-block/narrative-block';
// import { NarrativeBlock } from 'gatsby-components-library';
import HeroBasic from './hero-basic/HeroBasic';
import HomeHero from './hero-home/HeroHome';

export default function BlocksBuilder({ blocks, footer, activeItem = 0 }) {
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
          case 'DatoCmsBreadcrumb':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Breadcrumb currentPage={block.title} />
              </div>
            );
          case 'DatoCmsHeader':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Header />
              </div>
            );
          case 'DatoCmsFooter':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Footer data={footer} />
              </div>
            );
          case 'DatoCmsListPaginated':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <ListPaginated
                  list={[1, 2, 3, 4, 5, 6]}
                  customPageSize={3}
                  renderItem={(item, index) => (
                    <div
                      style={{
                        display: 'inline-block',
                        width: '250px',
                        height: '300px',
                        backgroundColor: index % 2 === 0 ? 'rgba(78, 78, 78, 0.9)' : 'rgba(24, 24, 27, 0.9)',
                        color: '#FFF',
                        padding: '20px',
                        marginRight: '1rem',
                      }}
                    >
                      Element {item}
                    </div>
                  )}
                />
              </div>
            );
          case 'DatoCmsForm':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <FormExample />
              </div>
            );
          case 'DatoCmsCtaGrid':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <ButtonList buttons={block.test} />
              </div>
            );
          case 'DatoCmsNotification':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Notification block={block} />
              </div>
            );
          case 'DatoCmsTextHubspotForm':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <HubspotForm block={block} />
              </div>
            );
          case 'DatoCmsHeroBasic':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <HeroBasic {...block} />
              </div>
            );
          case 'DatoCmsHeroHome':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <HomeHero {...block} />
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
