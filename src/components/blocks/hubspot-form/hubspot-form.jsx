import React from 'react';
import Hubspot from './hubspot';

import './index.scss';

const HubspotForm = ({ block }) => {
  const { title, description, hubspot } = block;

  return (
    <div className="hubspot-form-block">
      <div className="container">
        <div className={`form-block`}>
          <div className="form-container-content">
            <div className={`row`}>
              <div className={`${description ? 'col-lg-12' : 'col-lg-3'}`}>
                <h2>{title}</h2>
                {description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}
              </div>

              {/* Hubspot form */}
              <div className="col-lg">
                <Hubspot id={hubspot.id} formId={hubspot.formId} region={hubspot.region} portalId={hubspot.portalId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubspotForm;
