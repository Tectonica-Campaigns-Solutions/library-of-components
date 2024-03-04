import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const GlobalImage = ({ image, ...props }) => {
  const altImage = image?.alt ? image.alt : props.alt ? props.alt : 'image';

  if (image?.gatsbyImageData) {
    return <GatsbyImage image={image.gatsbyImageData} alt={altImage} {...props} />;
  } else if (image?.url) {
    return <img src={image.url} alt={altImage} loading="lazy" height={'100%'} width={'100%'} />;
  } else {
    return <img src={image} alt={altImage} loading="lazy" height={'100%'} width={'100%'} />;
  }
};

export default GlobalImage;
