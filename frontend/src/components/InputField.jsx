import React from 'react';

const InputField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error = '',
}) => {
  return (
    <div className="mb-8 relative group">
      {label && (
        <label
          htmlFor={id}
          className="block text-[10px] font-medium text-secondary uppercase tracking-[0.2em] mb-3"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full py-3 bg-transparent text-[14px] text-primary placeholder-border border-0 border-b outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${error
              ? 'border-primary'
              : 'border-border focus:border-primary'
            }`}
        />
        {/* Animated thin focus sweep line - pure black */}
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-focus-within:w-full" />
      </div>

      {error && (
        <p className="mt-3 text-[10px] text-primary tracking-widest uppercase">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;