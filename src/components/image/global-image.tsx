import React, {FC} from 'react'
import { GatsbyImage } from 'gatsby-plugin-image';
import { Image } from '../types';

interface Props {
  image: Image
  props?: any
}

const GlobalImage:FC<Props> = ({ image, props }) =>{
  const altImage = image?.alt ? image.alt : props?.alt ? props.alt : 'image';

  if (image?.gatbyImageData) {
    return <GatsbyImage image={image.gatbyImageData} alt={altImage} {...props} />;
  } else {
    return <img src={image.url} alt={altImage} loading="lazy" height={'100%'} width={'100%'} />;
  }
}

export default GlobalImage