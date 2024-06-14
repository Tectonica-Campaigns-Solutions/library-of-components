import React, { useState } from 'react';
import { isArray } from '../../utils/array.utils';
import MegaMenuCard from '../mega-menu-card/mega-menu-card';
// import Link from '../../Link/Link';
import CustomLink from '../../components/utils/custom-link';
import Button  from '../../components/blocks/button/button';
import iconDropdown from '../../icons/icon-dropdown.svg';

import './styles.scss';

const MegaMenu = ({ link, pageSlug, isMobile = false, open = false }) => {
  const { links = [], megaMenu = null } = link;
  const megaMenuTabs = megaMenu?.tabs || [];

  const activeTabIndex = megaMenuTabs.findIndex(t => t.link?.content.slug === pageSlug);
  const [megaMenuActiveTab, setMegaMenuActiveTab] = useState(activeTabIndex === -1 ? 0 : activeTabIndex);

  const megaMenuActiveContent = megaMenu ? megaMenu.tabs[megaMenuActiveTab] : null;
  const hasRelatedCard = megaMenuActiveContent?.highlightedContent ? true : false;

  console.log('highlightedContent', megaMenuActiveContent, hasRelatedCard);

  const handleOnClickTabItem = newIndex => {
    if (megaMenuTabs) {
      setMegaMenuActiveTab(newIndex);
    }
  };

  const renderMegaMenuActiveContent = () =>
    !!megaMenu &&
    megaMenuActiveContent && (
      <div className="main-content">
        <div className="container">
          <div className="row">
            {/* Primary content */}
            <div className="col-lg-4 primary-item">
              <h4>{megaMenuActiveContent.title}</h4>
              <div className="description" dangerouslySetInnerHTML={{ __html: megaMenuActiveContent.description }} />

              {megaMenuActiveContent.link && <Button link={megaMenuActiveContent.link} title={megaMenuActiveContent.title} isButton />}
            </div>

            {/* Secondary content */}
            <div className={hasRelatedCard ? 'col-lg-5' : 'col-lg-8'}>
              <div className="row gy-5">
                {/* Sub-nav items */}
                {megaMenuActiveContent.groupLinks.map(gLink => (
                  <div className="col-lg-6 sub-nav-items" key={gLink.id}>
                    <h5>
                      <CustomLink to={gLink.mainLink}>{gLink.title}</CustomLink>
                    </h5>

                    {isArray(gLink.links) && (
                      <div className="links">
                        {gLink.links.map(link => (
                          <CustomLink key={link.id} to={link}>
                            {link.label}
                          </CustomLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Related card if needed */}
            {hasRelatedCard && (
              <div className="col-lg-3">
                <MegaMenuCard
                  meta={megaMenuActiveContent.labelHighlight || ''}
                  slug={megaMenuActiveContent.highlightedContent.slug}
                  image={megaMenuActiveContent.highlightedContent.mainImage}
                  model={megaMenuActiveContent.highlightedContent.model}
                  title={megaMenuActiveContent.highlightedContent.title}
                  description={megaMenuActiveContent.highlightedContent.introduction}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );

  const isLinkActive = link => {
    return link.content.slug === pageSlug;
  };

  return (
    <div className={`mega-menu ${open ? 'open' : 'close'}`}>
      {/* Tabs */}
      <div className="tabs d-none">
        <div className="container tabs-items">
          {isArray(megaMenuTabs)
            ? megaMenuTabs.map((megaLink, index) => (
                <>
                  <span
                    key={index}
                    onClick={() => handleOnClickTabItem(index)}
                    className={`tab-custom-item ${megaMenuActiveTab === index ? 'active' : ''}`}
                  >
                    {megaLink.title}
                    {megaMenuActiveTab === index && (
                      <img alt="Mega menu dropdown icon" src={iconDropdown} style={{ paddingLeft: '.3rem' }} />
                    )}
                  </span>

                  {isMobile && megaMenuActiveTab === index && renderMegaMenuActiveContent()}
                </>
              ))
            : isArray(links)
            ? links.map(link => (
                <CustomLink key={link.id} to={link} className={`${isLinkActive(link) ? 'active' : ''}`}>
                  {link.label}
                </CustomLink>
              ))
            : null}
        </div>
      </div>

      {/* Tab selected content */}
      {!isMobile && renderMegaMenuActiveContent()}
    </div>
  );
};

export default MegaMenu;
