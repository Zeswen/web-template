import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Header: React.FC<Props> = ({ children, className = '' }) => {
  return <h1 className={`text-xl ${className}`}>{children}</h1>;
};
