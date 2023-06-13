import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../../assets/images';

const NotFound = () => {
  return (
    <div className="error">
      <Link to="/" className="error-logo">
        <img src={Image.Logo} alt="Lotus" />
      </Link>
      <h1 className="error-title">PAGE NOT FOUND</h1>
      <div className="error-image">
        <img src={Image.NotFound} alt="404 Not Found" />
      </div>
    </div>
  );
};

export default NotFound;
