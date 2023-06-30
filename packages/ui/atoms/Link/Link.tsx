'use client';

import { forwardRef, type ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ children, href, className = '', onClick }, ref) => {
    return (
      <a
        ref={ref}
        className={`text-blue-400 underline cursor-pointer ${className}`}
        href={href}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
);
