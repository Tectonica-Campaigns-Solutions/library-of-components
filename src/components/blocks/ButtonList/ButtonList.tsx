import React, {FC} from "react"
import Button from '../Button';

import './button-list-styles.css';

export interface ButtonProps {
  title: string;
  link: string;
  style?: string;
  label?: string;
}

interface Props {
  buttons: ButtonProps[]
}

const ButtonList:FC<Props> = ({ buttons = [] }) => {
  return (
    <div className="button-list">
      {buttons.map((button, index) => (
        <Button key={`button-${index}`} block={button} />
      ))}
    </div>
  );
};

export default ButtonList;