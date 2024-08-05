import React, { FC } from 'react';
import { useState } from 'react';
import './sidebar-wrapper-styles.scss';
import { Link } from 'gatsby';
import { Button } from 'tectonica-ui';
import { StaticImage } from 'gatsby-plugin-image'

export interface SidebarWrapperProps {
  block: {
    title: string;
    bgColor: { hex: string };
    collapsable: boolean;
    sections: [{ 
      title: string; 
      items: [
        { 
          __typename: string; 
          label: string; 
          link: { 
            id:string; 
            externalUrl: string; 
            path: { 
              slug: string,
              title: string
            } 
          }
          subitems: [
            {
              title: string; 
              externalUrl: string;
              path: { 
                slug: string,
              }
            }  
          ]
        }
      ]}
    ];
  };
}

const SidebarWrapper: FC<SidebarWrapperProps> = ({ block }) => {
  const { title, bgColor, sections, collapsable } = block;
  const [toggleMobileSidebar, setToggleMobileSidebar] = useState(false);

  const [collapsedSections, setCollapsedSections] = useState<number[]>([]);

  const handleSectionCollapse = (index: number) => {
    if (collapsedSections.includes(index)) {
      setCollapsedSections(collapsedSections.filter((item) => item !== index));
    } else {
      setCollapsedSections([...collapsedSections, index]);
    }
  };

  return (
    <section className="sidebar-wrapper">
      {!toggleMobileSidebar && (
        <div className={collapsable ? "mobile-close" : ""}>
          <button onClick={() => setToggleMobileSidebar(!toggleMobileSidebar)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
              <path
                d="M11.9585 11.9583L29.0418 29.0416M11.9585 29.0416L29.0418 11.9583"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      {toggleMobileSidebar && (
        <div className={collapsable ? "mobile-open" : ""}>
          <button onClick={() => setToggleMobileSidebar(!toggleMobileSidebar)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
              <path
                d="M20.5 10L20.5 31M10 20.5L31 20.5"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="sidebar-layout">
        <div
          className="sidebar-colunm"
          style={{
            backgroundColor: bgColor?.hex,
            display: toggleMobileSidebar ? "none" : "grid",
          }}
        >
          <div className="sidebar-content">
            {title ? (
              <div className="sidebar-header">
                <h3>{title}</h3>
              </div>
            ) : null}
            {sections.map((section, index) => (
              <div key={index} className="sidebar-section">
                { section.title && 
                <h4 onClick={() => handleSectionCollapse(index)}>
                    {collapsedSections.includes(index) ? 
                      <StaticImage
                        src="../../../icons/accordion_close.svg"
                        alt="Accordion open"
                        placeholder="blurred"
                        layout="fixed"
                        width={30}
                        height={31}
                        className='float-start'
                        />
                        : 
                      <StaticImage
                        src="../../../icons/accordion_open.svg"
                        alt="Accordion open"
                          placeholder="blurred"
                          layout="fixed"
                          width={30}
                          height={31}
                          className='float-start'
                      /> 
                    }
                    {section.title}
                  </h4>
                }
                  <ul style={{ display: collapsedSections.includes(index) ? "none" : "block" }}>
                  {section.items.map((item, index) => (
                    <>
                      {item.__typename === "DatoCmsCta" && (
                        <li key={index} className="my-2">
                          <Button block={item} />
                        </li>
                      )}
                      {item.__typename !== "DatoCmsLink" && (
                        <li key={index}>
                          {item.link?.path ? (
                            <Link to={item.link.path.slug}>{item.label}</Link>
                          ) : (
                            <a href={item.link?.externalUrl} target="_blank">
                              {item.label}
                            </a>
                          )}
                          {item.subitems && (
                            <ul className='subitems'>
                              {item.subitems.map((subitem, index) => (
                                <li key={index}>
                                  {subitem.path ? (
                                    <Link to={subitem.path.slug}>{subitem.title}</Link>
                                  ) : (
                                    <a href={subitem.externalUrl} target="_blank">
                                      {subitem.title}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      )}
                    </>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarWrapper;
