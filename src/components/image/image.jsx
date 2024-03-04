import React from 'react';
import GlobalImage from './global-image';

const AppImage = ({ image, ...props }) => {
  return (
    <div className="image-wrapper">
      <GlobalImage image={Array.isArray(image) ? image[0] : image} {...props} />

      {image?.title && (
        <div className="caption">
          {/* <img src={pictureBtn} alt="Caption icon" /> */}
          <span className="image-caption">{image.title}</span>
        </div>
      )}
    </div>
  );
};

export default AppImage;
