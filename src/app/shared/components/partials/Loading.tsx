import React from 'react';

interface ILoadingProps {
  classType?: string
};

const Loading = ({ classType }: ILoadingProps) => {
  return (
    <div className={classType ? `loading-container ${classType}` : "loading-container"}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
