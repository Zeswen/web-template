'use client';

import type { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button: FC<Props> = ({ children, className = '', onClick }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
