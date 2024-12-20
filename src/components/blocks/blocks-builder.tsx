import React, { useState } from 'react';
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
  FloatingButton,
  FloatingShareButtons,
  Footer,
  HandlerButton,
  Hero,
  HubspotForm,
  ImageGallery,
  ListPaginated,
  LoadingButton,
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
  SplashPage,
} from 'tectonica-ui';
import FormExample from './form-example/FormExample';
import Header from '../../layout/Header';
import { StructuredText } from 'react-datocms/structured-text';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  name: string;
  description: string;
  composedBy: string
}

interface BlocksBuilderProps {
  blocks: Block[];
  footer: any; // Replace 'any' with the actual type of 'footer'
  activeItem?: number;
  allVisible?: boolean;
}

export default function BlocksBuilder({ blocks, footer, activeItem = 0, allVisible = false }: BlocksBuilderProps) {

  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {blocks.map((block, index) => {
        allVisible ? activeItem = index : activeItem = activeItem; // For rendering all blocks at once in pages that are not the dashboard

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
                <Accordion block={block} variant="default" />

                <div style={{ margin: '5rem 0' }}>
                  <h3>Minimal variant:</h3>
                  <Accordion block={block} variant="minimal" />
                </div>
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
              <div key={block.id} className={`list-paginated ${activeItem === index ? 'show' : 'hide'}`}>
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
              <div key={block.id} className={`cta-grid ${activeItem === index ? 'show' : 'hide'}`}>
                <ButtonList buttons={block.test} />
                <div className="extra-buttons">
                  <LoadingButton variant="primary" />
                  <LoadingButton variant="secondary" />
                  <LoadingButton variant="outline" label="Downloading" />
                  <HandlerButton
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path
                          d="M5.625 5.625V12.375M5.625 5.625H12.375M5.625 5.625L13.5 13.5M5.625 30.375V23.625M5.625 30.375H12.375M5.625 30.375L13.5 22.5M30.375 5.625H23.625M30.375 5.625V12.375M30.375 5.625L22.5 13.5M30.375 30.375H23.625M30.375 30.375V23.625M30.375 30.375L22.5 22.5"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    onClick={() => alert('Button clicked')}
                  />
                  <HandlerButton
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path
                          d="M5.625 5.625V12.375M5.625 5.625H12.375M5.625 5.625L13.5 13.5M5.625 30.375V23.625M5.625 30.375H12.375M5.625 30.375L13.5 22.5M30.375 5.625H23.625M30.375 5.625V12.375M30.375 5.625L22.5 13.5M30.375 30.375H23.625M30.375 30.375V23.625M30.375 30.375L22.5 22.5"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    variant="large"
                    onClick={() => alert('Button clicked')}
                  />
                </div>
                <FloatingButton
                  block={{
                    title: 'Button',
                    link: 'https://www.google.com',
                  }}
                  position="bottom-center"
                />
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
              <div
                key={block.id}
                className={`${activeItem === index ? 'show' : 'hide'}`}
                style={{ backgroundColor: 'rgba(0,0,0,1)' }}
              >
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

                <div style={{ marginLeft: '150px', display: 'flex', alignItems: 'flex-start', gap: '30px' }}>
                  <div>
                    <FloatingShareButtons />
                  </div>

                  <div>
                    <FloatingShareButtons variant="bottom-two" />
                  </div>

                  <div>
                    <FloatingShareButtons variant="bottom-single" />
                  </div>
                </div>
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
          case 'DatoCmsSplashPage':

            return (
              <div key={block.id} className={`splash-page__wrap ${activeItem === index ? 'show' : 'hide'}`}>
                {/* @ts-ignore */}
                <SplashPage block={block} visible={true} />
              </div>
            );
          case 'DatoCmsComponentInfo':
            return (
              <div key={block.id} className={`componentInfo hide ${blocks[index+1].__typename}${blocks[index+1].id}`}>
                <h2>{block.name} {block.composedBy && <span>{block.composedBy}</span>}</h2>
                <button 
                  onClick={() => setIsVisible(!isVisible)}
                  className="flex items-center btn-link border-0 btn-toggler"
                >
                  {isVisible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span>{isVisible ? 'Hide Description' : 'Show Description'}</span>
                </button>
                {isVisible && (
                <div dangerouslySetInnerHTML={{ __html: block.description }} />
                )}
              </div>
           );

          default:
            return null;
        }
      })}
    </>
  );
}
