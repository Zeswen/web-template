'use client';

import type { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button: FC<Props> = ({ children, className = '', onClick }) => {
  return (
    <button
      className={`bg-purple-400 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
