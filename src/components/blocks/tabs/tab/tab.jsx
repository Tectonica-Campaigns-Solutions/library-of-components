import React from 'react';
import ButtonList from '../../button/button-list';
import { isArray } from '../../../../utils/array.utils';

import './styles.scss';

function TabItem({ item }) {
  const { title, text, ctas } = item;

  return (
    <div className="tab-generic-content">
      <div className="row">
        <div className="col-lg-8 d-flex flex-column tab-information mt-md-5 mt-lg-0  order-0 order-md-1">
          <div className="flex-grow-1 mb-5 mb-lg-0">
            {title && <h2>{title}</h2>}
            {text && <div className="description" dangerouslySetInnerHTML={{ __html: text }} />}

            {isArray(ctas) && (
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
