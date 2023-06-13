import React from 'react';
import { Sidebar } from '../../posts/partials/Sidebar';
import SectionPost from './SectionPost';

const SectionContent = () => {
  return (
    <section className="section section-content">
      <div className="container">
        <div className="row">
          <div className="col-8">
            <SectionPost />
          </div>
          <div className="col-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContent;
