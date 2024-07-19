import React from 'react';
import ButtonList from '../../ButtonList/ButtonList';
import { isArray } from '../../../utils/array.utils';

import './tab-styles.scss';

interface TabItemProps {
  item: {
    title?: string;
    text?: string;
    ctas?: Array<{ title: string;
      link: string;
      style?: string;
      label?: string; }> | undefined ;
  };
}

function TabItem({ item }: TabItemProps) {
  const { title, text, ctas = []} = item;

  return (
    <div className="tab-generic-content">
      <div className="row">
        <div className="col-lg-8 d-flex flex-column tab-information mt-md-5 mt-lg-0  order-0 order-md-1">
          <div className="flex-grow-1 mb-5 mb-lg-0">
            {title && <h2>{title}</h2>}
            {text && <div className="description" dangerouslySetInnerHTML={{ __html: text }} />}

            {isArray(ctas) && ctas.length > 0 && (
              <div className="mb-5">
                <ButtonList buttons={ctas} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabItem;
