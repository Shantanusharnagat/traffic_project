// ImageWithTextOverlay.js

import React from 'react';
import './About.css';

const ImageWithTextOverlay = () => {
  return (
    <div className="image-with-text-container">
      <img src="/images/flex_displaycurves.png" alt="" />
      <div className="text-overlay">
        <h1 className="large-text">We secure your loved ones</h1>
        
      </div>
    </div>
  );
};

export default ImageWithTextOverlay;
