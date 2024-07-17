import React, { FC } from 'react';
import './tags-styles.scss';

interface Props {
  tags: Array<{ id: number; name: string }>;
}

const Tags: FC<Props> = ({ tags }) => {
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