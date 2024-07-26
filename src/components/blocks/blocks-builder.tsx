import React from 'react';
import Divider from './Divider/Divider';
import SectionTitle from './SectionTitle/SectionTitle';
import {
  Accordion,
  Breadcrumbs,
  Button,
  ButtonList,
  Card,
  CardGrid,
  Carousel,
  Footer,
  HeroBasic,
  HeroHome,
  HubspotForm,
  ImageGallery,
  ListPaginated,
  NarrativeBlock,
  NarrativeBlockAdvanced,
  Notification,
  PeopleDetail,
  ShareButtons,
  Tabs,
} from 'tectonica-ui';
import FormExample from './form-example/FormExample';
import Header from '../../layout/Header';
import { StructuredText } from 'react-datocms/structured-text';

interface Block {
  __typename: string;
  id: string;
  title: string;
  link: string;
  items: { title: string | ''; text: string }[];
  test?: any; // Replace 'any' with the actual type of 'test'
  content: string; // Update the 'content' property to be optional
  hubspot: {
    id: string;
    formId: string;
    region: string;
    portalId: string;
  };
  ctas: any[];
  image: any;
}

interface BlocksBuilderProps {
  blocks: Block[];
  footer: any; // Replace 'any' with the actual type of 'footer'
  activeItem?: number;
}

export default function BlocksBuilder({ blocks, footer, activeItem = 0 }: BlocksBuilderProps) {
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
          case 'DatoCmsNarrativeBlockAdvanced':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <NarrativeBlockAdvanced block={block} />
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
                {/* @ts-ignore */}
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
                <Breadcrumbs currentPage={block.title} />
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
                <HeroBasic {...block} introduction="" />
              </div>
            );
          case 'DatoCmsHeroHome':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <HeroHome {...block} image={{ gatsbyImageData: { images: { fallback: { src: '' } } } }} />
              </div>
            );
          case 'DatoCmsSlider':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <Carousel
                  items={block.items}
                  renderItem={(item) => (
                    <div className="col-md-4" key={item.id}>
                      <Card card={item} />
                    </div>
                  )}
                  showDefaultActions={true}
                />
              </div>
            );
          case 'DatoCmsSocialShare':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <h2 className="section-title-block">{block.title}</h2>
                <ShareButtons />
              </div>
            );

          case 'DatoCmsImageGallery':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                {/* @ts-ignore */}
                <ImageGallery {...block} />
              </div>
            );

          case 'DatoCmsPeopleModal':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                {/* @ts-ignore */}
                <PeopleDetail {...block} eMail={block.email}>
                  {/* @ts-ignore */}
                  <StructuredText data={block.text} />
                </PeopleDetail>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
