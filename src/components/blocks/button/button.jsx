import React from 'react';
import CustomLink from '../../utils/custom-link';

import './index.scss';

const Button = ({ block }) => {
  const { title, link, isButton = false } = block;

  return (
    <CustomLink className={`button-block  ${isButton ? 'btn-primary' : ''}`} to={link}>
      {title}
    </CustomLink>
  );
};

export default Button;
