import React from 'react';
import './styles.scss';

const Logs = () => {
  return (
    <div className="logs-wrapper">
      <h3>Latest changes</h3>
      <ul>
        <li>
          <span className="date">July 30 2024</span>
          <p>
            A component was created to display the latest releases that were added. Progress in the Mapbox component to
            support gecoder and autocompletion.
          </p>
        </li>
        <li>
          <span className="date">July 29 2024</span>
          <p>
            The components: Image Gallery, People Modal, Video Modal were created in the NPM library and the Mapbox
            Wrapper component was started.
          </p>
        </li>
        <li>
          <span className="date">July 26 2024</span>
          <p>
            All components have been migrated to the NPM library. This library has been installed in the current
            project.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Logs;
