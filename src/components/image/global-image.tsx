import React, { FC } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface GlobalImageProps {
  image: IGatsbyImageData | string;
  alt?: string;
  [key: string]: any;
}

const GlobalImage: FC<GlobalImageProps> = ({ image, ...props }) => {
  const altImage = image?.alt ? image.alt : props.alt ? props.alt : 'image';

  if (image?.gatsbyImageData) {
    return <GatsbyImage image={image.gatsbyImageData} alt={altImage} {...props} />;
  } else if (typeof image === 'string') {
    return <img src={image} alt={altImage} loading="lazy" height={'100%'} width={'100%'} />;
  } else {
    return null; // Handle the case when image is neither IGatsbyImageData nor string
  }
};

export default GlobalImage;
