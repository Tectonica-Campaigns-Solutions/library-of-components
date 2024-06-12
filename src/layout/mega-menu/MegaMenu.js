import React, { useState } from 'react';
import { isArray } from '../../../../utils';
import MegaMenuCard from '../MegaMenuCard/MegaMenuCard';
import Link from '../../Link/Link';
import Cta from '../../Cta/Cta';
import dropdownActiveIcon from '../../../Icons/nav-dropdown-active.svg';

import './index.scss';

const MegaMenu = ({ link, pageSlug, isMobile = false }) => {
  const { links = [], megaMenu = null } = link;
  const megaMenuTabs = megaMenu?.tabs || [];

  const activeTabIndex = megaMenuTabs.findIndex(t => t.link.content.slug === pageSlug);
  const [megaMenuActiveTab, setMegaMenuActiveTab] = useState(activeTabIndex === -1 ? 0 : activeTabIndex);

  const megaMenuActiveContent = megaMenu ? megaMenu.tabs[megaMenuActiveTab] : null;
  const hasRelatedCard = megaMenuActiveContent?.highlightedContent ? true : false;

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

              {megaMenuActiveContent.link && <Cta cta={megaMenuActiveContent.link} isButton />}
            </div>

            {/* Secondary content */}
            <div className={hasRelatedCard ? 'col-lg-5' : 'col-lg-8'}>
              <div className="row gy-5">
                {/* Sub-nav items */}
                {megaMenuActiveContent.groupLink.map(gLink => (
                  <div className="col-lg-6 sub-nav-items" key={gLink.id}>
                    <h5>
                      <Link to={gLink.mainLink}>{gLink.title}</Link>
                    </h5>

                    {isArray(gLink.links) && (
                      <div className="links">
                        {gLink.links.map(link => (
                          <Link key={link.id} to={link}>
                            {link.label}
                          </Link>
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
                  image={megaMenuActiveContent.highlightedContent.image}
                  model={megaMenuActiveContent.highlightedContent.model}
                  title={megaMenuActiveContent.highlightedContent.title}
                  description={megaMenuActiveContent.highlightedContent.summary}
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
    <div className="mega-menu">
      {/* Tabs */}
      <div className="tabs">
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
                      <img alt="Mega menu dropdown icon" src={dropdownActiveIcon} style={{ paddingLeft: '.3rem' }} />
                    )}
                  </span>

                  {isMobile && megaMenuActiveTab === index && renderMegaMenuActiveContent()}
                </>
              ))
            : isArray(links)
            ? links.map(link => (
                <Link key={link.id} to={link} className={`${isLinkActive(link) ? 'active' : ''}`}>
                  {link.label}
                </Link>
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
