import type { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

const Header: FC<Props> = ({ children, className = '' }) => (
  <h1 className={`text-xl ${className}`}>{children}</h1>
);

export default Header;
