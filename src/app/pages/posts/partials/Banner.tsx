import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from '../../../../assets/images';

const Banner = () => {
  const { t } = useTranslation();
  
  return (
    <section className="section section-banner">
      <div className="container">
        <div className="banner-inner">
          <div className="banner-content">
            <h2 className="banner-title">{t('common.banner.title')}</h2>
            <p className="banner-desc">
              {t('common.banner.content')}
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
