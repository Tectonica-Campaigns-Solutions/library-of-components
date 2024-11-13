import React, { useState } from 'react';

import './index.scss';

const Sidebar = ({ links = [], activeItem, setActiveItem }) => {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <nav className={`app-sidebar d-md-block bg-light sidebar collapse ${isSidebarVisible ? 'show' : ''}`}>
      <div className="pt-4 sidebar-fixed">
        <ul className="app-nav">

          <span 
            className="wrapper-label mb-0 pb-0"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setActiveItem(-1);
              toggleSidebar();
              document.querySelector('.componentInfo').classList.add('hide');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" style={{ verticalAlign: 'sub', marginRight: '0.25rem' }}>
              <path d="M11.25 11.75L11.291 11.73C11.4192 11.6659 11.5631 11.64 11.7057 11.6552C11.8482 11.6703 11.9834 11.7261 12.0952 11.8157C12.2071 11.9054 12.2909 12.0252 12.3368 12.161C12.3826 12.2968 12.3886 12.4429 12.354 12.582L11.646 15.418C11.6111 15.5572 11.6169 15.7034 11.6627 15.8394C11.7084 15.9754 11.7922 16.0954 11.9041 16.1852C12.016 16.275 12.1513 16.3308 12.294 16.346C12.4367 16.3612 12.5807 16.3352 12.709 16.271L12.75 16.25M21 12.5C21 13.6819 20.7672 14.8522 20.3149 15.9442C19.8626 17.0361 19.1997 18.0282 18.364 18.864C17.5282 19.6997 16.5361 20.3626 15.4442 20.8149C14.3522 21.2672 13.1819 21.5 12 21.5C10.8181 21.5 9.64778 21.2672 8.55585 20.8149C7.46392 20.3626 6.47177 19.6997 5.63604 18.864C4.80031 18.0282 4.13738 17.0361 3.68508 15.9442C3.23279 14.8522 3 13.6819 3 12.5C3 10.1131 3.94821 7.82387 5.63604 6.13604C7.32387 4.44821 9.61305 3.5 12 3.5C14.3869 3.5 16.6761 4.44821 18.364 6.13604C20.0518 7.82387 21 10.1131 21 12.5ZM12 8.75H12.008V8.758H12V8.75Z" stroke="#262626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> 
            Latest Updates
          </span>
          <hr className='mb-0' />

          {links.map((link, index) => {
            if (!link) {
              return null;
            }

            if (link.wrapper) {
              return <span className="wrapper-label">{link.label}</span>;
            }

            return (
              <li
                className={`nav-item ${activeItem === index ? 'active' : ''}`}
                key={`${link.to}-${index}`}
                onClick={() => { 
                  setActiveItem(index); 
                  toggleSidebar(); 
                  document.querySelectorAll('.componentInfo').forEach((el) => el.classList.add('hide'));
                  if (link.type !== null)
                    document.querySelector(`.${link.type}${link.id}`)?.classList.remove('hide'); 
                }} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 12.9786L7.97967 14.999L10 17.0191L12.0202 14.999L10 12.9786ZM6.9695 13.9888C6.41162 14.5467 6.41162 15.4512 6.9695 16.009L8.98983 18.0293C9.54772 18.5873 10.4522 18.5873 11.0102 18.0293L13.0303 16.009C13.5883 15.4511 13.5883 14.5466 13.0303 13.9888L10.404 11.3625C10.1809 11.1393 9.81903 11.1393 9.59593 11.3625L6.9695 13.9888Z" fill="#262626"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9783 10.0002L14.9987 12.0206L17.019 10.0002L14.9987 7.97992L12.9783 10.0002ZM11.362 9.59622C11.1389 9.8194 11.1389 10.1812 11.362 10.4043L13.9884 13.0307C14.5463 13.5886 15.4507 13.5886 16.0087 13.0307L18.029 11.0103C18.5869 10.4525 18.5869 9.54792 18.029 8.99002L16.0087 6.96968C15.4508 6.4118 14.5463 6.4118 13.9884 6.96968L11.362 9.59622Z" fill="#262626"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2.98084L7.97967 5.00118L10 7.02151L12.0202 5.00118L10 2.98084ZM6.9695 3.99099C6.41162 4.54888 6.41162 5.45343 6.9695 6.01133L9.59583 8.63766C9.81902 8.86084 10.1808 8.86084 10.404 8.63766L13.0303 6.01133C13.5882 5.45344 13.5882 4.54889 13.0303 3.99099L11.0101 1.97066C10.4522 1.41278 9.5477 1.41278 8.9898 1.97066L6.9695 3.99099Z" fill="#262626"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00116 7.97988L2.981 10L5.00116 12.0204L7.0215 10L5.00116 7.97988ZM1.97083 8.99003C1.41288 9.54792 1.41288 10.4524 1.97083 11.0102L3.991 13.0305C4.54888 13.5884 5.45343 13.5884 6.01133 13.0305L8.63766 10.4042C8.86085 10.181 8.86085 9.81917 8.63766 9.59607L6.01133 6.96973C5.45345 6.41178 4.54896 6.41178 3.991 6.96973L1.97083 8.99003Z" fill="#262626"/>
                </svg>
                {link.label}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
