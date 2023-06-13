import React from 'react';
import Image from '../../../../assets/images';

const Banner = () => {
  return (
    <section className="section section-banner">
      <div className="container">
        <div className="banner-inner">
          <div className="banner-content">
            <h2 className="banner-title">Stay curious.</h2>
            <p className="banner-desc">
              The latest updates, stories, on product management, engineering,
              design, culture and many more... from the Lotus team.
            </p>
          </div>
          <div className="banner-image">
            <img src={Image.Banner} alt="Stay curious" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
