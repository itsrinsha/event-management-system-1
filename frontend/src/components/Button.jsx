import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  fullWidth = false,
  size = 'md',
  icon = null,
}) => {
  const base =
    'group relative overflow-hidden inline-flex items-center justify-center gap-4 font-medium tracking-[0.2em] uppercase focus:outline-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]';

  const sizes = {
    sm: 'text-[10px] px-6 py-3',
    md: 'text-[11px] px-8 py-4',
    lg: 'text-[12px] px-10 py-5',
  };

  const variants = {
    primary:
      'bg-primary text-white border border-primary hover:bg-neutral-900',
    secondary:
      'bg-transparent text-primary border border-border hover:border-primary',
    ghost:
      'bg-transparent text-primary opacity-60 hover:opacity-100 hover:tracking-[0.25em]',
    danger:
      'bg-transparent text-primary border border-border hover:bg-neutral-50',
  };

  const sweepClass = variant === 'primary' ? 'sweep-overlay' : 'sweep-overlay-dark';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-30 pointer-events-none' : ''} ${className}`}
    >
      {/* Light Sweep Highlight Overlay */}
      {variant !== 'ghost' && <span className={sweepClass} />}

      {icon && <span className="relative z-10 flex-shrink-0 transition-transform duration-500 group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;