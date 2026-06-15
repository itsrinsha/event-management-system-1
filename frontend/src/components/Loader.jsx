import React from 'react';

const Loader = ({ size = 'md', label = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-[1px]',
    md: 'w-5 h-5 border-[1px]',
    lg: 'w-6 h-6 border-[1px]',
    xl: 'w-8 h-8 border-[1.5px]',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div 
        className={`loader-ring ${sizes[size]}`} 
        style={{ borderRadius: '50%' }}
      />
      {label && (
        <p className="text-[10px] font-semibold text-secondary tracking-widest uppercase">{label}</p>
      )}
    </div>
  );
};

export default Loader;