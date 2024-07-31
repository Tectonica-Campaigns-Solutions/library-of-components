import React, { FC } from 'react';
import { useState } from 'react';
import './sidebar-wrapper-styles.scss';
import { Link } from 'gatsby';

interface SidebarWrapperProps {
  block: {
    title: string;
    bgColor: { hex: string };
    sections: [{ title: string; items: [{ label: string; link: { externalUrl: string; path: { slug: string } } }] }];
  };
}

const SidebarWrapper: FC<SidebarWrapperProps> = ({ block }) => {
  const { title, bgColor, sections } = block;
  const [toggleMobileSidebar, setToggleMobileSidebar] = useState(false);

  // console.log('toggler', toggleMobileSidebar);

  return (
    <section className="sidebar-wrapper">
      {!toggleMobileSidebar && (
      <div className="mobile-close">
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
        <div className="mobile-open">
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
            display: toggleMobileSidebar ? 'none' : 'grid',
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
                <h4>{section.title}</h4>
                <ul>
                  {section.items.map((item, index) => (
                    <li key={index}>
                      {item.link.path ? (
                        <Link to={item.link.path.slug}>{item.label}</Link>
                      ) : (
                        <a href={item.link.externalUrl} target="_blank">
                          {item.label}
                        </a>
                      )}
                    </li>
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
