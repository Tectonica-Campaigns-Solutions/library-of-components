import React from 'react';

import './index.scss';

function HomeHero({ title, introduction, image, mobileImage = null }) {
  const bgImageUrl = image?.gatsbyImageData?.images?.fallback?.src;

  const css = `
    @media (max-width: 767px) {
      .hero-home {
        background-image: url("${mobileImage?.gatsbyImageData?.images?.fallback?.src}");
        background-position: center;
      }
    }
  `;

  return (
    <div className="wrapper-hero" style={{ backgroundImage: `url(${bgImageUrl})` }}>
      <style scoped>{css}</style>

      <div className="hero-home">
        <div className="container">
          <div className="content">
            {title && <h1 dangerouslySetInnerHTML={{ __html: title }} />}
            {introduction && <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
