import * as React from 'react';
import NarrativeBlock from '../components/narrative-block/narrative-block';

const IndexPage = () => {
  return (
    <main>
      <h1>Library of components</h1>
      <NarrativeBlock />
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
