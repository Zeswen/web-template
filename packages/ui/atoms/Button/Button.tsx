'use client';

import type { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  type: HTMLButtonElement['type'];
};

const Button: FC<Props> = ({
  children,
  className = '',
  onClick,
  type = 'button',
}) => (
  <button
    type={type}
    className={`py-3 bg-purple-400 cursor-pointer ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
