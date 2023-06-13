import React, { useState } from 'react';

const SekeletonPost = () => {
  const [sekeletonPost] = useState(Array.from({ length: 5 }));
  return (
    <>
      {sekeletonPost.map((item, index) => (
        <div key={index} className="post-item">
          <article className="post post-info">
            <div className="post-header">
              <div className="sekeleton sekeleton-user"></div>
            </div>
            <div className="post-body">
              <div className="post-body-left">
                <div className="post-content">
                  <div className="sekeleton sekeleton-title"></div>
                  <p className="sekeleton sekeleton-desc"></p>
                </div>
                <div className="post-footer">
                  <div className="sekeleton sekeleton-footer"></div>
                </div>
              </div>
              <div className="sekeleton sekeleton-image"></div>
            </div>
          </article>
        </div>
      ))}
    </>
  );
};

export default SekeletonPost;
