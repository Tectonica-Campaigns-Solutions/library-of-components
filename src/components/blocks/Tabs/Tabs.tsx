import React, { useState } from 'react';
import TabItem from './Tab/Tab';
import TabTitles from './TabsTitles/TabsTitles';
import { isArray } from '../../utils/array.utils';

import './tabs-styles.scss';

interface Props {
  block: {
    items: any[];
  };
}

function Tabs({ block }: Props) {
  const { items } = block;
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTab = (val: number) => setActiveTab(val);

  return (
    <div className={`tabs`}>
      {isArray(items) && items.length > 1 && (
        <TabTitles items={items} classes="col-lg-4" activeTab={activeTab} handleTab={handleTab} />
      )}

      {isArray(items) &&
        items.map((item, index) =>
          index === activeTab ? <TabItem item={item} key={index} /> : null
        )}
    </div>
  );
}

export default Tabs;
