import React from 'react';
import { Outlet } from 'react-router-dom';

const User = () => {
  return (
    <div className="page-user">
      <Outlet />
    </div>
  );
};

export default User;
