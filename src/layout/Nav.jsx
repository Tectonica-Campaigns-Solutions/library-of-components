import React, { useState } from 'react';
import CustomLink from '../components/utils/custom-link';

import './styles.scss';

const LinkItem = ({ link, label, isButton }) => {
  return (
    <li className="nav-item">
      <CustomLink to={link} className={isButton ? 'btn btn-primary' : ''}>
        {label}
      </CustomLink>
    </li>
  );
};

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

export default function Nav({ navData, location, hideLinks = false }) {
  const navLinks = navData.nodes;
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => setExpanded(!expanded);
  const isHome = location ? location?.pathname === '/' : false;

  const groupedLinks = navLinks.reduce(
    (result, item) => {
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
            {groupedLinks?.withoutIcon?.map((link) =>
              link.treeChildren.length === 0 ? (
                <LinkItem key={link.id} link={link} label={link?.title} isButton={link?.isButton} />
              ) : (
                <DropdownItem key={link.id} link={link} label={link?.title} children={link?.treeChildren} />
              )
            )}

            {/* Final icons */}
            <div className="nav-actions">
              {groupedLinks?.withIcon?.map((link) => (
                <CustomLink key={link.id} to={link}>
                  <img src={link.icon.url} alt="Link icon" />
                </CustomLink>
              ))}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
