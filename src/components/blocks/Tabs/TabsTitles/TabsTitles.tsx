import React from 'react';
import './tabs-titles-styles.scss';

interface TabTitlesProps {
  items: Array<{ titleTab?: string; name?: string; title?: string }>;
  activeTab: number;
  handleTab: (index: number) => void;
  classes: string;
}

export default function TabTitles({ items, activeTab, handleTab, classes }: TabTitlesProps) {
  return (
    <div className="row tab-titles">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${classes} mb-4 mb-lg-0 ${activeTab === index ? 'active' : ''}`}
          onClick={() => handleTab(index)}
        >
          {item.titleTab || item.name || item.title}
        </div>
      ))}
    </div>
  );
}
