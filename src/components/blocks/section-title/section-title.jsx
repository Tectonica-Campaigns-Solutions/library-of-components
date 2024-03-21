import React from 'react';
import './styles.scss';

const SectionTitle = ({ block }) => (
  <h2 id={block.id} className="section-title-block">
    {block.title}
  </h2>
);

export default SectionTitle;
