import React from 'react';
import './styles.scss';

const Tags = ({ tags }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag.id} className="tag">
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default Tags;