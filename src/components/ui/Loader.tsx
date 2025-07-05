import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
