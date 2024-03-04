import React from 'react';
import NarrativeBlock from './narrative-block/narrative-block';

export default function BlocksBuilder({ blocks }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.__typename) {
          case 'DatoCmsNarrativeBlock':
            return <NarrativeBlock block={block} key={block.id} />;

          default:
            return null;
        }
      })}
    </>
  );
}
