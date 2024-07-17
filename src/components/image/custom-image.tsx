import React, { FC } from 'react';
import GlobalImage from './global-image';

interface CustomImageProps {
  image: string | string[];
}

const CustomImage: React.FC<CustomImageProps> = ({ image, ...props }) => {
  return (
    <div className="image-wrapper">
      <GlobalImage image={Array.isArray(image) ? image[0] : image} {...props} />

      {Array.isArray(image) && image[0]?.title && (
        <div className="caption">
          {/* <img src={pictureBtn} alt="Caption icon" /> */}
          <span className="image-caption">{image[0].title}</span>
        </div>
      )}
    </div>
  );
};

export default CustomImage;
