import * as React from 'react';
import NarrativeBlock from '../components/blocks/narrative-block/narrative-block';
import Dashboard from '../layout/dashboard/dashboard';
import Button from '../components/blocks/button/button';

const IndexPage = () => {
  const hardcodedSidebarLinks = [
    {
      label: 'Dashboard',
      to: '/',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-home align-text-bottom"
          ariaHidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
    },
    {
      label: 'Component one',
      to: '/',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="feather feather-layers align-text-bottom"
          ariaHidden="true"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
    },
  ];

  const narrativeHardcodedBlock = {
    title: 'Narrative block title',
    preTitle: 'pre title here...',
    textContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat nunc eu sapien tristique facilisis. Integer faucibus tempor purus, sagittis pulvinar eros vehicula id.',
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg',
    imageAlignment: 'left',
  };

  const buttonHardcodedBlock = {
    label: 'View more items',
    to: '/',
    isPrimaryStyle: false,
  };

  return (
    <Dashboard pageTitle="Homepage" sidebarLinks={hardcodedSidebarLinks}>
      <h2>Narrative block example</h2>
      <NarrativeBlock block={narrativeHardcodedBlock} />
      <NarrativeBlock
        block={{
          ...narrativeHardcodedBlock,
          imageAlignment: 'right',
          preTitle: null,
          buttons: [
            {
              label: 'Button one',
              to: '/',
            },
            {
              label: 'View more',
              to: '/',
              isPrimaryStyle: true,
            },
          ],
        }}
      />
      <hr />

      <h2>Button block example</h2>
      <Button block={buttonHardcodedBlock} />
    </Dashboard>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
