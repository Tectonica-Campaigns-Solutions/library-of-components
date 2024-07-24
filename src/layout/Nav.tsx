import React, { useState } from 'react';
import CustomLink from '../components/utils/custom-link';
import MegaMenu from './mega-menu/mega-menu';
import SearchEngine from '../components/blocks/Search/SearchEngine';
import searchIcon from '../icons/icon-search.svg';

import './styles.scss';

// @ts-ignore
const LinkItem = ({ link, label, isButton, isSearchButton, setSearchEngineVisible }) => {
  return (
    <li className="nav-item">
      {isSearchButton == false && (
        <CustomLink to={link} className={isButton ? 'btn btn-primary' : ''}>
          {label}
        </CustomLink>
      )}

      {isSearchButton && (
        <CustomLink onClick={() => setSearchEngineVisible(true)} className={'btn btn-search'}>
          <img src={searchIcon} alt="Search icon" />
        </CustomLink>
      )}
    </li>
  );
};

// @ts-ignore
const DropdownItem = ({ link, label, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mouseEnter = () => setDropdownOpen(true);
  const mouseLeave = () => setDropdownOpen(false);

  return (
    <li className="dropdown nav-item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <CustomLink to={link} type="button" aria-label="Expand" aria-expanded="false" data-bs-toggle="dropdown">
        {label}
      </CustomLink>

      <ul className={`dropdown-menu ${dropdownOpen ? 'open' : null}`}>
        {children
          ?.sort((a, b) => a.position - b.position)
          .map((link) => (
            <li className="dropdown-item" key={link.id}>
              <CustomLink className="dropdown-link" to={link}>
                {link?.title}
              </CustomLink>
            </li>
          ))}
      </ul>
    </li>
  );
};

// @ts-ignore
const MegamenuItem = ({ link, label, location }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mouseEnter = () => setDropdownOpen(true);
  const mouseLeave = () => setDropdownOpen(false);

  return (
    <li className="nav-item position-relative" onMouseDown={mouseEnter} onMouseLeave={mouseLeave}>
      <CustomLink to={link} type="button" aria-label="Expand" aria-expanded="false" data-bs-toggle="dropdown">
        {label}
      </CustomLink>

      <MegaMenu open={dropdownOpen} link={link} pageSlug={location?.pathname} />
    </li>
  );
};

// @ts-ignore
export default function Nav({ navData, location, hideLinks = false }) {
  const navLinks = navData.nodes;
  const [expanded, setExpanded] = useState(false);
  const [searchEngineVisible, setSearchEngineVisible] = useState(false);

  const handleNavClick = () => setExpanded(!expanded);
  const isHome = location ? location?.pathname === '/' : false;

  const groupedLinks = navLinks.reduce(
    (result: any, item: any) => {
      if (item.icon && item.icon.url) {
        result.withIcon.push(item);
      } else {
        result.withoutIcon.push(item);
      }
      return result;
    },
    { withIcon: [], withoutIcon: [] }
  );

  return (
    <>
      <nav className={`custom-navbar navbar-expand-lg ${isHome ? 'home-nav' : ''} ${expanded ? 'expanded' : ''}`}>
        <CustomLink className="navbar-brand" to={'/'}>
          Logo
        </CustomLink>

        <button
          type="button"
          data-target="#navNav"
          aria-expanded="false"
          aria-controls="navNav"
          data-toggle="collapse"
          className="navbar-toggler"
          aria-label="Toggle navigation"
          onClick={() => handleNavClick()}
        >
          <span className={`${expanded ? 'open-toggle ' : ''} navbar-toggler-icon`} />
        </button>

        {!hideLinks && (
          <div className={`${expanded ? 'show' : ''} collapse navbar-collapse site-nav`} id="navNav">
            <ul className={`navbar-nav mr-auto`}>
              {groupedLinks?.withoutIcon?.map((link: any) => {
                if (link.megaMenu !== null) {
                  return (
                    <MegamenuItem
                      key={link.id}
                      link={link}
                      location={location}
                      label={link?.title}
                      // isButton={link?.isButton}
                    />
                  );
                } else if (link.treeChildren.length > 0) {
                  return <DropdownItem key={link.id} link={link} label={link?.title} children={link?.treeChildren} />;
                } else {
                  return (
                    <LinkItem
                      key={link.id}
                      link={link}
                      label={link?.title}
                      isButton={link?.isButton}
                      isSearchButton={link?.isSearchButton}
                      setSearchEngineVisible={setSearchEngineVisible}
                    />
                  );
                }
              })}

              {/* Final icons */}
              <div className="nav-actions">
                {groupedLinks?.withIcon?.map((link: any) => (
                  <CustomLink key={link.id} to={link}>
                    <img src={link.icon.url} alt="Link icon" />
                  </CustomLink>
                ))}
              </div>
            </ul>
          </div>
        )}

        <SearchEngine searchEngineVisible={searchEngineVisible} setSearchEngineVisible={setSearchEngineVisible} />
      </nav>
    </>
  );
}
