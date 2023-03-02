import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const LoaderContainer = () => {
  return (
    <div className="bg-white h-screen w-screen text-center">
      <div className="py-20 w-fit mx-auto">
        <InfinitySpin width="200" color="rgb(59 130 246)" />
      </div>
    </div>
  );
};

export default LoaderContainer;
