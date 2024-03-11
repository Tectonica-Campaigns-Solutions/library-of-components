import React, { useState } from 'react';
import TabItem from './tab/tab';
import TabTitles from './tabs-titles/tabs-titles';
import { isArray } from '../../../utils/array.utils';

import './styles.scss';

function Tabs({ block }) {
  const { items } = block;
  const [activeTab, setActiveTab] = useState(0);

  const handleTab = (val) => setActiveTab(val);

  return (
    <div className={`tabs`}>
      {isArray(items) && items.length > 1 && (
        <TabTitles items={items} classes="col-lg-4" activeTab={activeTab} handleTab={handleTab} />
      )}

      {isArray(items) && items.map((item, index) => (index === activeTab ? <TabItem item={item} key={index} /> : ''))}
    </div>
  );
}

export default Tabs;
