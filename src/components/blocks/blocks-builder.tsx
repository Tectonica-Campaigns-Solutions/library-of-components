import React from 'react';
import Divider from './Divider/Divider';
import SectionTitle from './SectionTitle/SectionTitle';
import {
  Accordion,
  AudioPlayer,
  Breadcrumbs,
  Button,
  ButtonList,
  Card,
  CardGrid,
  Carousel,
  Footer,
  Hero,
  HubspotForm,
  ImageGallery,
  ListPaginated,
  MapboxPopup,
  MapboxWrapper,
  NarrativeBlock,
  NarrativeBlockAdvanced,
  Notification,
  ParallaxContentSection,
  PeopleDetail,
  ShareButtons,
  SidebarWrapper,
  Tabs,
  VideoModal,
} from 'tectonica-ui';
import FormExample from './form-example/FormExample';
import Header from '../../layout/Header';
import { StructuredText } from 'react-datocms/structured-text';
// import ParallaxContentSection from './ParallaxContentSection';

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
                {/* @ts-ignore */}
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
                <Footer
                  data={{
                    ...footer,
                    socialLinks: [
                      {
                        type: 'facebook',
                        url: 'https://www.facebook.com',
                      },
                      {
                        type: 'twitter',
                        url: 'https://www.twitter.com',
                      },
                      {
                        type: 'youtube',
                        url: 'https://www.youtube.com',
                      },
                      {
                        type: 'instagram',
                        url: 'https://www.instagram.com',
                      },
                    ],
                    // form: <div>Form here</div>,
                  }}
                />
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
                {/* @ts-ignore */}
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
                {/* @ts-ignore */}
                <Hero {...block} />
              </div>
            );
          case 'DatoCmsHeroHome':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                {/* @ts-ignore */}
                <Hero {...block} />
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
                  showItemsCount
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
          case 'DatoCmsVideoModal':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <VideoModal
                  // @ts-ignore
                  video={block.video}
                  // @ts-ignore
                  externalVideo={block.externalVideo}
                  // @ts-ignore
                  thumbnailImage={block.thumbnailImage}
                />
              </div>
            );

          case 'DatoCmsMapbox':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                <MapboxWrapper
                  initialViewport={{ latitude: 53.349805, longitude: -6.26031, zoom: 10 }}
                  mapStyle=""
                  mapboxAccessToken="pk.eyJ1IjoibWFydGluYWx2IiwiYSI6ImNscHR1YjdvZDBlY2sybHBnNTRwM2l4ZTEifQ.nn8C3qy8ULBkq6gdO3vlCg"
                  pins={[
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [-6.26031, 53.349805],
                      },
                      properties: {
                        title: 'Title',
                        address: 'Address 1',
                        date: '2020/10/25',
                        image: {
                          id: '1',
                          url: 'https://via.placeholder.com/150',
                        },
                      },
                    },
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [-6.36031, 53.349805],
                      },
                      properties: {
                        title: 'Title',
                        address: 'Address 2',
                        date: '2022/10/25',
                        image: {
                          id: '2',
                          url: 'https://via.placeholder.com/150',
                        },
                        tags: [
                          {
                            id: 1,
                            name: 'tag1',
                          },
                          {
                            id: 2,
                            name: 'tag2',
                          },
                        ],
                      },
                    },
                  ]}
                  renderMarker={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="54" viewBox="0 0 42 54" fill="none">
                      <path
                        d="M23.8546 52.0439L23.8555 52.0427C26.5327 48.7745 30.9302 43.1726 34.661 37.2691C36.5262 34.3175 38.2311 31.2807 39.4711 28.4153C40.7074 25.5586 41.5 22.8311 41.5 20.5099C41.5 9.44694 32.306 0.5 21 0.5C9.68979 0.5 0.5 9.447 0.5 20.5099C0.5 22.8304 1.28632 25.5574 2.5153 28.4143C3.74792 31.2797 5.44396 34.3166 7.30351 37.2685C11.0224 43.1718 15.4197 48.7736 18.1462 52.0449C19.6277 53.8412 22.3736 53.8409 23.8546 52.0439Z"
                        fill="#000"
                        stroke="black"
                      />
                    </svg>
                  )}
                  renderPopup={(item) => {
                    return (
                      <MapboxPopup
                        to={{ id: '1', externalUrl: 'https://www.google.com' }}
                        card={{
                          properties: {
                            title: item.title,
                            address: item.address,
                            date: item.date,
                            image: item.image,
                            tags: item.tags,
                          },
                        }}
                      />
                    );
                  }}
                  withGeocoder
                  navigationControlPosition="top-right"
                  renderNavigationControl={false}
                  className="app-map"
                  key={activeItem === index ? new Date().getTime() : null}
                />
              </div>
            );

          case 'DatoCmsSidebarWrapper':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                {/* @ts-ignore */}
                <SidebarWrapper block={block} />
              </div>
            );

          case 'DatoCmsAudioPlayer':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                {/* @ts-ignore */}
                <AudioPlayer {...block} />
              </div>
            );

          case 'DatoCmsParallaxContentSection':
            return (
              <div key={block.id} className={`${activeItem === index ? 'show' : 'hide'}`}>
                {/* @ts-ignore */}
                <ParallaxContentSection block={block} />
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
