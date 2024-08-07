import React, { useState } from 'react';
import './notification-styles.scss';

interface NotificationProps {
  block: {
    content: string;
  };
}

const Notification: React.FC<NotificationProps> = ({ block }) => {
  const { content } = block;
  const [toggleTopMessage, setToggleTopMessage] = useState<boolean>(true);

  const handleToggleTopMessage = () => {
    // setToggleTopMessage((toggleMessage) => {
    //   sessionStorage.setItem('show_top_message', String(!toggleMessage));
    //   return !toggleMessage;
    // });
  };

  if (!toggleTopMessage) return null;

  return (
    <div className="notification-block" data-datocms-noindex>
      <div className="d-flex h-100 align-items-center justify-content-center">
        <span className="information">
          <span className="information-message" dangerouslySetInnerHTML={{ __html: content }} />
        </span>

        <button className="close-btn" onClick={handleToggleTopMessage} aria-label="Close message">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5 21C8.52135 21.0012 6.58681 20.4153 4.94124 19.3166C3.29567 18.2178 2.01304 16.6556 1.25568 14.8276C0.498319 12.9996 0.300276 10.9881 0.686614 9.04748C1.07295 7.1069 2.0263 5.32454 3.42601 3.926C5.30215 2.04985 7.84675 0.99585 10.5 0.99585C13.1533 0.99585 15.6979 2.04985 17.574 3.926C19.4502 5.80214 20.5042 8.34673 20.5042 11C20.5042 13.6533 19.4502 16.1979 17.574 18.074C16.6469 19.0052 15.5444 19.7434 14.3301 20.2456C13.1159 20.7479 11.814 21.0043 10.5 21ZM2.50001 11.172C2.52274 13.2862 3.38146 15.3054 4.88849 16.7883C6.39552 18.2712 8.4283 19.0972 10.5426 19.0859C12.6568 19.0745 14.6806 18.2267 16.1716 16.7276C17.6626 15.2286 18.4995 13.2003 18.4995 11.086C18.4995 8.97171 17.6626 6.9434 16.1716 5.44437C14.6806 3.94533 12.6568 3.09748 10.5426 3.08611C8.4283 3.07475 6.39552 3.9008 4.88849 5.38372C3.38146 6.86664 2.52274 8.88584 2.50001 11V11.172ZM7.90901 15L6.49901 13.59L9.09001 11L6.50001 8.41L7.91001 7L10.5 9.59L13.09 7L14.5 8.41L11.91 11L14.5 13.59L13.092 15L10.5 12.41L7.91001 15H7.90901Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
