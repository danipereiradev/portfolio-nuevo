import React from 'react';
import { useLocation } from 'react-router-dom';
import { isAdsLandingPath } from '../config/contact';
import { newTabProps } from '../utils/linkTarget';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
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
  const { pathname } = useLocation();
  const landingNewTab =
    href && !target && isAdsLandingPath(pathname) ? newTabProps(href) : {};
  const linkTarget = target ?? landingNewTab.target;
  const linkRel = rel ?? landingNewTab.rel;
  const baseStyles =
    'box-border mx-auto inline-flex items-center justify-center w-[var(--button-width)] max-w-full min-h-[3.5rem] px-6 py-4 rounded-lg font-extrabold text-base md:text-lg uppercase text-center leading-tight whitespace-normal transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed gap-2';

  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    secondary:
      'bg-transparent text-white border-2 border-white hover:bg-white hover:text-ink-dark',
    ghost: 'bg-surface-muted text-ink-dark hover:bg-ink-light',
    outline:
      'bg-transparent text-ink-dark border-2 border-ink-dark hover:bg-ink-dark hover:text-white',
  };

  const widthStyles = fullWidth ? 'mx-auto' : '';

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
        target={linkTarget}
        rel={linkRel}
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
