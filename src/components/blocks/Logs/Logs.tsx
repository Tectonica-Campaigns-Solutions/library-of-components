import React from 'react';
import './styles.scss';

const Logs = () => {
  return (
    <div className="logs-wrapper">
      <h3>Latest changes</h3>
      <ul>
        <li>
          <span className="date">August 27 2024</span>
          <p>- UI Style: Button fixes. Floating Share Page, Floating Button, Loading Button, Handler Button added.</p>
        </li>
        <li>
          <span className="date">August 26 2024</span>
          <p>- UI Style sprint: Advances in the basic styles of all components</p>
        </li>
        <li>
          <span className="date">August 19 2024</span>
          <p>
            - Dashboard UI Updates <br />
            - Codebase cleanup, removing duplicate components, leaving them only in the npm package. <br />
          </p>
        </li>
        <li>
          <span className="date">August 7 2024</span>
          <p>
            A component for displaying a parallax scrolling content. The component has a mobile version and all the
            content is customizable.
          </p>
        </li>
        <li>
          <span className="date">August 6 2024</span>
          <p>
            Updates to mapbox component <br />
            - support for geoserch <br />
          </p>
        </li>
        <li>
          <span className="date">July 31 2024</span>
          <p>
            Updates to sidebar menu component: <br />
            - support for collapsable sections <br />
            - support for subitems <br />
            - support for buttons <br />
            - feature to collapse sidebar <br />
          </p>
        </li>
        <li>
          <span className="date">July 31 2024</span>
          <p>
            A component for displaying a sidebar menu structure was created. The component is fully responsive and has a
            mobile version. Next step is to add support for adding buttons.
          </p>
        </li>
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
