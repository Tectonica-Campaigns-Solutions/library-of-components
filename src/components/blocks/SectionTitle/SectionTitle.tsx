import React from 'react';
import './section-title-styles.scss';

interface SectionTitleProps {
  block: {
    id: string;
    title: string;
  };
}

const SectionTitle: React.FC<SectionTitleProps> = ({ block }) => (
  <h2 id={block.id} className="section-title-block">
    {block.title}
  </h2>
);

export default SectionTitle;
