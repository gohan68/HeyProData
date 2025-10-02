import React from 'react';

const ProgressBar = ({ progress }) => {
  // Calculate width based on progress (0-100)
  const progressWidth = (progress / 100) * 750;

  return (
    <div className="flex justify-center w-full mt-8">
      <div 
        className="relative bg-white border-2 border-gray-200"
        style={{
          width: '750px',
          height: '20px',
          borderRadius: '41px'
        }}
      >
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-500 ease-out"
          style={{
            width: `${progressWidth}px`,
            borderRadius: '10px',
            background: 'linear-gradient(90deg, #FA6E80 0%, #6A89BE 43.84%, #85AAB7 65.76%, #31A7AC 109.6%)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;