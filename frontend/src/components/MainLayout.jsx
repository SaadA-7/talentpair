import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;