import React from 'react';
import { Link } from 'gatsby';

import './index.scss';

const Button = ({ block }) => {
  const { label, to, isPrimaryStyle = false, external = false } = block;

  return (
    <Link className={`button-block  ${isPrimaryStyle ? 'btn-primary' : ''}`} to={to} target={external ? '_blank' : ''}>
      {label}
    </Link>
  );
};

export default Button;
