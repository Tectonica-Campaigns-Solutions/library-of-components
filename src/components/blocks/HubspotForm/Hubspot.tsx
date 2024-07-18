import React, { useEffect } from 'react';

interface HubspotProps {
  id: string;
  formId: string;
  region: string;
  portalId: string;
}

const Hubspot: React.FC<HubspotProps> = ({ id, formId, region, portalId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.onload = () => {
      (window as any).hbspt.forms.create({
        region: region,
        portalId: portalId,
        formId: formId,
        target: `#hubspotForm-${id}`,
      });
    };
    script.onerror = (e) => console.error(e);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id, formId, region, portalId]);

  return <div id={`hubspotForm-${id}`} />;
};

export default Hubspot;
