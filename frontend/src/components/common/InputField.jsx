import React from 'react';

const InputField = ({ 
  label, 
  id, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-[13px] font-medium text-destructive mt-1.5">{error}</p>
      )}
    </div>
  );
};

export default InputField;