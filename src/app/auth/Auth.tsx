import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="page-auth">
      <Outlet />
    </div>
  );
};

export default Auth;
