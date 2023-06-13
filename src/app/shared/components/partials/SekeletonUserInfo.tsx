import React from 'react';

const SekeletonUserInfo = () => {
  return (
    <div className="author-info-content">
      <div className="author-avatar">
        <div className="sekeleton sekeleton-author-avatar"></div>
      </div>
      <div className="author-info">
        <div className="sekeleton sekeleton-author-name"></div>
        <div className="sekeleton sekeleton-author-list"></div>
      </div>
    </div>
  );
};

export default SekeletonUserInfo;
