import React from 'react';

import './index.scss';

function HeroBasic({ title, introduction, backgroundColor, image }) {
  const bgImageUrl = image?.url;

  return (
    <div
      className={`hero-basic ${backgroundColor ? backgroundColor : ''}`}
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="container">
        <h1>{title}</h1>
        <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />
      </div>
    </div>
  );
}

export default HeroBasic;
