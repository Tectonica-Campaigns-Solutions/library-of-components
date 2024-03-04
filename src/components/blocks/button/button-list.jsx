import React from 'react';
import Button from './button';

import './index.scss';

const ButtonList = ({ buttons = [] }) => {
  return (
    <div className="button-list">
      {buttons.map((button, index) => (
        <Button key={`button-${index}`} block={button} />
      ))}
    </div>
  );
};

export default ButtonList;
