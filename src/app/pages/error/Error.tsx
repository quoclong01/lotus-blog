import React from 'react';
import { Outlet } from 'react-router-dom';

const Error = () => {
  return (
    <main className="page-error">
      <Outlet />
    </main>
  );
};

export default Error;
