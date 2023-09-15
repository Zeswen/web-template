import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

function Header({ children, className = '' }: Props) {
  return <h1 className={`text-xl ${className}`}>{children}</h1>;
}

export default Header;
