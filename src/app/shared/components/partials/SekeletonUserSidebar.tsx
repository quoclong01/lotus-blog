import React from 'react';

const SekeletonUserSidebar = () => {
  return (
    <div className="author-sidebar">
      <div className="author-info">
        <div className="sekeleton sekeleton-author-sidebar-avatar"></div>
        <div className="sekeleton sekeleton-author-sidebar-name"></div>
        <p className="sekeleton sekeleton-author-sidebar-follower"></p>
      </div>
      <button className="sekeleton sekeleton-author-sidebar-btn"></button>
    </div>
  );
};

export default SekeletonUserSidebar;
