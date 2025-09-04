
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center h-20 px-6 bg-white border-b border-neutral-200">
      <div className="flex items-center">
        {/* Can add search or other header elements here */}
        <h1 className="text-2xl font-semibold text-neutral-800">Welcome Back!</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Branch: Main Store</span>
      </div>
    </header>
  );
};

export default Header;
