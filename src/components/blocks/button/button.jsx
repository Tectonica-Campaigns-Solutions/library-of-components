import React from 'react';
import CustomLink from '../../utils/custom-link';

import './index.scss';

const Button = ({ block }) => {
  const { title, link, style } = block;

  return (
    <CustomLink className={`button-block  ${style ? style : ''}`} to={link}>
      {style === 'icon' ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </>
      ) : null}
      {title}
    </CustomLink>
  );
};

export default Button;
