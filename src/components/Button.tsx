import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  className = 'mt-8',
  disabled = false,
  href,
  target,
  rel,
  fullWidth = false,
  isLoading = false,
}) => {
  const baseStyles =
    'px-4 py-2 md:px-6 md:py-4 rounded-2xl font-bold text-sm uppercase md:text-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 flex items-center justify-center gap-2 active:translate-x-[5px] active:translate-y-[5px] active:shadow-none';

  const variantStyles = {
    primary: 'bg-accent text-2xl text-white uppercase  ',
    secondary:
      'text-ink-dark uppercase hover:bg-white hover:text-white shadow-[5px_5px_0_0_rgba(255,255,255,0.35)] hover:shadow-[2px_2px_0_0_rgba(255,255,255,0.35)] ',
    ghost:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 border-ink-dark   hover:translate-x-[3px] hover:translate-y-[3px]',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`;

  const content = isLoading ? (
    <>
      <svg
        className='animate-spin h-5 w-5'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
      {children}
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={combinedStyles}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combinedStyles}
    >
      {content}
    </button>
  );
};

export default Button;
